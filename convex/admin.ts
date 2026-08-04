import { ConvexError, v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { authComponent, createAuth } from "./auth"
import { getAdmin, getMailOperator, writeAudit } from "./lib/admin"

const role = v.union(
  v.literal("administrator"),
  v.literal("editor"),
  v.literal("mail_manager")
)
const adminStatus = v.union(v.literal("active"), v.literal("suspended"))
export const getAccessState = query({
  args: {},
  returns: v.object({
    signedIn: v.boolean(),
    bootstrapAvailable: v.boolean(),
    admin: v.union(
      v.null(),
      v.object({
        name: v.string(),
        email: v.string(),
        role,
      })
    ),
  }),
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    const existingAdmins = await ctx.db
      .query("adminUsers")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .take(1)
    if (!user) {
      return {
        signedIn: false,
        bootstrapAvailable: existingAdmins.length === 0,
        admin: null,
      }
    }
    const admin = await ctx.db
      .query("adminUsers")
      .withIndex("by_auth_user_id", (q) => q.eq("authUserId", user._id))
      .unique()
    return {
      signedIn: true,
      bootstrapAvailable: existingAdmins.length === 0,
      admin:
        admin && admin.status === "active"
          ? { name: admin.name, email: admin.email, role: admin.role }
          : null,
    }
  },
})

export const bootstrapFirstAdmin = mutation({
  args: {},
  returns: v.boolean(),
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    const existingAdmins = await ctx.db
      .query("adminUsers")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .take(1)
    if (existingAdmins.length > 0) {
      throw new ConvexError("The initial administrator has already been created.")
    }
    const now = Date.now()
    await ctx.db.insert("adminUsers", {
      authUserId: user._id,
      email: user.email,
      name: user.name,
      role: "administrator",
      status: "active",
      createdAt: now,
      updatedAt: now,
    })
    return true
  },
})

export const listTeamMembers = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("adminUsers"),
      name: v.string(),
      email: v.string(),
      role,
      status: adminStatus,
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const members = await ctx.db
      .query("adminUsers")
      .withIndex("by_email")
      .take(100)
    return members.map((member) => ({
      _id: member._id,
      name: member.name,
      email: member.email,
      role: member.role,
      status: member.status,
      createdAt: member.createdAt,
    }))
  },
})

export const provisionTeamMember = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role,
  },
  returns: v.id("adminUsers"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    if (actor?.admin.role !== "administrator") {
      throw new ConvexError("Only administrators can create team accounts.")
    }
    const name = args.name.trim()
    const email = args.email.trim().toLowerCase()
    if (name.length < 2 || !email.includes("@")) {
      throw new ConvexError("Enter a valid name and email address.")
    }
    if (args.password.length < 10) {
      throw new ConvexError("Temporary passwords must contain at least 10 characters.")
    }
    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique()
    if (existing) {
      throw new ConvexError("This email already has a team account.")
    }

    const auth = createAuth(ctx, { allowSignUp: true })
    let authUserId: string
    try {
      const result = await auth.api.signUpEmail({
        body: { name, email, password: args.password },
      })
      authUserId = result.user.id
    } catch (error) {
      throw new ConvexError(
        error instanceof Error
          ? error.message
          : "The authentication account could not be created."
      )
    }

    const now = Date.now()
    const id = await ctx.db.insert("adminUsers", {
      authUserId,
      name,
      email,
      role: args.role,
      status: "active",
      createdAt: now,
      updatedAt: now,
    })
    await writeAudit(ctx, actor, {
      action: "create",
      entityType: "adminUser",
      entityId: id,
      summary: `Created ${args.role} account for ${email}`,
    })
    return id
  },
})

export const setTeamMemberStatus = mutation({
  args: { id: v.id("adminUsers"), status: adminStatus },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    if (actor?.admin.role !== "administrator") {
      throw new ConvexError("Only administrators can change account access.")
    }
    const target = await ctx.db.get(args.id)
    if (!target) throw new ConvexError("Team account not found.")
    if (target._id === actor.admin._id && args.status === "suspended") {
      throw new ConvexError("You cannot suspend your own account.")
    }
    if (
      target.role === "administrator" &&
      target.status === "active" &&
      args.status === "suspended"
    ) {
      const active = await ctx.db
        .query("adminUsers")
        .withIndex("by_status", (q) => q.eq("status", "active"))
        .take(100)
      if (active.filter((member) => member.role === "administrator").length <= 1) {
        throw new ConvexError("At least one active administrator is required.")
      }
    }
    await ctx.db.patch(args.id, { status: args.status, updatedAt: Date.now() })
    await writeAudit(ctx, actor, {
      action: "update",
      entityType: "adminUser",
      entityId: args.id,
      summary: `${args.status === "active" ? "Activated" : "Suspended"} ${target.email}`,
    })
    return null
  },
})

export const getDashboard = query({
  args: {},
  returns: v.object({
    content: v.number(),
    submissions: v.number(),
    donations: v.number(),
    assets: v.number(),
    recentSubmissions: v.array(
      v.object({
        _id: v.id("submissions"),
        type: v.string(),
        name: v.string(),
        email: v.string(),
        status: v.string(),
        createdAt: v.number(),
      })
    ),
  }),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const [content, submissions, donations, assets, recentSubmissions] =
      await Promise.all([
        ctx.db.query("cmsEntries").withIndex("by_category_and_order").take(500),
        ctx.db
          .query("submissions")
          .withIndex("by_status_and_created_at")
          .take(500),
        ctx.db
          .query("donations")
          .withIndex("by_status_and_created_at")
          .take(500),
        ctx.db
          .query("assets")
          .withIndex("by_category_and_status")
          .take(500),
        ctx.db
          .query("submissions")
          .withIndex("by_status_and_created_at")
          .order("desc")
          .take(6),
      ])
    return {
      content: content.length,
      submissions: submissions.length,
      donations: donations.length,
      assets: assets.length,
      recentSubmissions: recentSubmissions.map((item) => ({
        _id: item._id,
        type: item.type,
        name: `${item.firstName} ${item.lastName}`.trim(),
        email: item.email,
        status: item.status,
        createdAt: item.createdAt,
      })),
    }
  },
})

export const listSubmissions = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("submissions"),
      type: v.string(),
      firstName: v.string(),
      lastName: v.string(),
      email: v.string(),
      phone: v.string(),
      organization: v.string(),
      subject: v.string(),
      message: v.string(),
      status: v.string(),
      adminNote: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    await getMailOperator(ctx)
    const rows = await ctx.db
      .query("submissions")
      .withIndex("by_status_and_created_at")
      .order("desc")
      .take(200)
    return rows.map((item) => ({
      _id: item._id,
      type: item.type,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phone: item.phone,
      organization: item.organization,
      subject: item.subject,
      message: item.message,
      status: item.status,
      adminNote: item.adminNote,
      createdAt: item.createdAt,
    }))
  },
})

export const updateSubmission = mutation({
  args: {
    id: v.id("submissions"),
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("archived")
    ),
    adminNote: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getMailOperator(ctx)
    await ctx.db.patch(args.id, {
      status: args.status,
      adminNote: args.adminNote.trim(),
      updatedAt: Date.now(),
    })
    await writeAudit(ctx, actor, {
      action: "update",
      entityType: "submission",
      entityId: args.id,
      summary: `Submission marked ${args.status}`,
    })
    return null
  },
})

export const listDonations = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("donations"),
      reference: v.string(),
      donorName: v.string(),
      donorEmail: v.string(),
      amountCents: v.number(),
      currency: v.string(),
      status: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const rows = await ctx.db
      .query("donations")
      .withIndex("by_status_and_created_at")
      .order("desc")
      .take(200)
    return rows.map((item) => ({
      _id: item._id,
      reference: item.reference,
      donorName: item.donorName,
      donorEmail: item.donorEmail,
      amountCents: item.amountCents,
      currency: item.currency,
      status: item.status,
      createdAt: item.createdAt,
    }))
  },
})

export const listAuditEvents = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("auditEvents"),
      actorEmail: v.string(),
      action: v.string(),
      entityType: v.string(),
      summary: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const rows = await ctx.db
      .query("auditEvents")
      .withIndex("by_created_at")
      .order("desc")
      .take(100)
    return rows.map((item) => ({
      _id: item._id,
      actorEmail: item.actorEmail,
      action: item.action,
      entityType: item.entityType,
      summary: item.summary,
      createdAt: item.createdAt,
    }))
  },
})

export const changeAdminRole = mutation({
  args: { id: v.id("adminUsers"), role },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    if (actor?.admin.role !== "administrator") {
      throw new ConvexError("Only administrators can change roles.")
    }
    const target = await ctx.db.get(args.id)
    if (!target) throw new ConvexError("Team account not found.")
    if (target.role === "administrator" && args.role === "editor") {
      const active = await ctx.db
        .query("adminUsers")
        .withIndex("by_status", (q) => q.eq("status", "active"))
        .take(100)
      if (active.filter((member) => member.role === "administrator").length <= 1) {
        throw new ConvexError("At least one active administrator is required.")
      }
    }
    await ctx.db.patch(args.id, { role: args.role, updatedAt: Date.now() })
    await writeAudit(ctx, actor, {
      action: "update",
      entityType: "adminUser",
      entityId: args.id,
      summary: `Changed ${target.email} to ${args.role}`,
    })
    return null
  },
})

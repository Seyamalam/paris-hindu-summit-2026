import { v } from "convex/values"

import { mutation } from "./_generated/server"

const submissionType = v.union(
  v.literal("registration"),
  v.literal("support"),
  v.literal("contact"),
  v.literal("sponsorship"),
  v.literal("volunteer"),
  v.literal("media")
)

export const submit = mutation({
  args: {
    type: submissionType,
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    organization: v.string(),
    attendingAs: v.string(),
    subject: v.string(),
    message: v.string(),
    consent: v.boolean(),
    website: v.string(),
  },
  returns: v.object({ accepted: v.boolean(), reference: v.string() }),
  handler: async (ctx, args) => {
    const reference = `PHS-${Date.now().toString(36).toUpperCase()}`
    if (args.website) return { accepted: true, reference }

    const email = args.email.trim().toLowerCase()
    if (!email.includes("@") || args.firstName.trim().length < 2) {
      return { accepted: false, reference }
    }
    if (!args.consent) return { accepted: false, reference }

    const now = Date.now()
    const recent = await ctx.db
      .query("submissions")
      .withIndex("by_email_and_created_at", (q) => q.eq("email", email))
      .order("desc")
      .first()
    if (recent && now - recent.createdAt < 60_000) {
      return { accepted: false, reference }
    }
    await ctx.db.insert("submissions", {
      type: args.type,
      firstName: args.firstName.trim().slice(0, 120),
      lastName: args.lastName.trim().slice(0, 120),
      email: email.slice(0, 240),
      phone: args.phone.trim().slice(0, 80),
      organization: args.organization.trim().slice(0, 200),
      attendingAs: args.attendingAs.trim().slice(0, 120),
      subject: args.subject.trim().slice(0, 200),
      message: args.message.trim().slice(0, 5000),
      consent: args.consent,
      status: "new",
      adminNote: "",
      createdAt: now,
      updatedAt: now,
    })
    return { accepted: true, reference }
  },
})

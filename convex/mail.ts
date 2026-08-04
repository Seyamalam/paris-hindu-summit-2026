import { v } from "convex/values"

import { internalMutation, mutation, query } from "./_generated/server"
import { getMailOperator, writeAudit } from "./lib/admin"

const attachment = v.object({
  fileName: v.string(),
  mimeType: v.string(),
  byteSize: v.number(),
  contentId: v.optional(v.string()),
})

const messageSummary = v.object({
  _id: v.id("mailMessages"),
  _creationTime: v.number(),
  direction: v.union(v.literal("incoming"), v.literal("outgoing")),
  messageId: v.string(),
  inReplyTo: v.optional(v.string()),
  references: v.optional(v.string()),
  fromAddress: v.string(),
  fromName: v.string(),
  toAddresses: v.array(v.string()),
  ccAddresses: v.array(v.string()),
  bccAddresses: v.optional(v.array(v.string())),
  subject: v.string(),
  textBody: v.string(),
  htmlBody: v.string(),
  deliveryStatus: v.union(
    v.literal("received"),
    v.literal("queued"),
    v.literal("sent"),
    v.literal("failed")
  ),
  isRead: v.boolean(),
  sentByEmail: v.optional(v.string()),
  providerResponse: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
  attachments: v.array(attachment),
})

export const canAccess = query({
  args: {},
  returns: v.object({ allowed: v.boolean(), email: v.string() }),
  handler: async (ctx) => {
    const actor = await getMailOperator(ctx)
    return { allowed: true, email: actor.admin.email }
  },
})

export const listMessages = query({
  args: {},
  returns: v.array(messageSummary),
  handler: async (ctx) => {
    await getMailOperator(ctx)
    const messages = await ctx.db
      .query("mailMessages")
      .withIndex("by_created_at")
      .order("desc")
      .take(250)

    return await Promise.all(
      messages.map(async (message) => {
        const attachments = await ctx.db
          .query("mailAttachments")
          .withIndex("by_message_id", (q) => q.eq("messageId", message._id))
          .take(50)
        return {
          ...message,
          attachments: attachments.map(({ fileName, mimeType, byteSize, contentId }) => ({
            fileName,
            mimeType,
            byteSize,
            contentId,
          })),
        }
      })
    )
  },
})

export const dailyAllowance = query({
  args: {},
  returns: v.object({
    limit: v.number(),
    used: v.number(),
    remaining: v.number(),
    resetsAt: v.number(),
  }),
  handler: async (ctx) => {
    await getMailOperator(ctx)
    const now = new Date()
    const start = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    const resetsAt = start + 24 * 60 * 60 * 1000
    const messages = await ctx.db
      .query("mailMessages")
      .withIndex("by_direction_and_created_at", (q) =>
        q.eq("direction", "outgoing").gte("createdAt", start)
      )
      .collect()
    const used = messages.reduce(
      (total, message) => total + message.toAddresses.length + message.ccAddresses.length + (message.bccAddresses?.length ?? 0),
      0
    )
    const limit = 300
    return { limit, used, remaining: Math.max(0, limit - used), resetsAt }
  },
})

export const markRead = mutation({
  args: { id: v.id("mailMessages") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await getMailOperator(ctx)
    const message = await ctx.db.get(args.id)
    if (message && !message.isRead) {
      await ctx.db.patch(args.id, { isRead: true, updatedAt: Date.now() })
    }
    return null
  },
})

export const deleteMessage = mutation({
  args: { id: v.id("mailMessages") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getMailOperator(ctx)
    const message = await ctx.db.get(args.id)
    if (!message) return null
    const attachments = await ctx.db
      .query("mailAttachments")
      .withIndex("by_message_id", (q) => q.eq("messageId", args.id))
      .collect()
    for (const item of attachments) await ctx.db.delete(item._id)
    await ctx.db.delete(args.id)
    await writeAudit(ctx, actor, {
      action: "delete",
      entityType: "mailMessage",
      entityId: args.id,
      summary: `Deleted mail history: ${message.subject}`,
    })
    return null
  },
})

export const listContacts = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("mailContacts"),
    _creationTime: v.number(),
    name: v.string(),
    email: v.string(),
    organization: v.string(),
    notes: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })),
  handler: async (ctx) => {
    await getMailOperator(ctx)
    return await ctx.db.query("mailContacts").withIndex("by_updated_at").order("desc").take(500)
  },
})

export const saveContact = mutation({
  args: {
    id: v.optional(v.id("mailContacts")),
    name: v.string(),
    email: v.string(),
    organization: v.string(),
    notes: v.string(),
  },
  returns: v.id("mailContacts"),
  handler: async (ctx, args) => {
    const actor = await getMailOperator(ctx)
    const email = args.email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid contact email.")
    const duplicate = await ctx.db.query("mailContacts").withIndex("by_email", (q) => q.eq("email", email)).unique()
    if (duplicate && duplicate._id !== args.id) throw new Error("That email is already saved.")
    const now = Date.now()
    const values = {
      name: args.name.trim().slice(0, 120),
      email,
      organization: args.organization.trim().slice(0, 160),
      notes: args.notes.trim().slice(0, 1000),
      updatedAt: now,
    }
    const id = args.id
      ? (await ctx.db.patch(args.id, values), args.id)
      : await ctx.db.insert("mailContacts", { ...values, createdAt: now })
    await writeAudit(ctx, actor, {
      action: args.id ? "update" : "create",
      entityType: "mailContact",
      entityId: id,
      summary: `${args.id ? "Updated" : "Saved"} mail contact ${email}`,
    })
    return id
  },
})

export const removeContact = mutation({
  args: { id: v.id("mailContacts") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getMailOperator(ctx)
    const contact = await ctx.db.get(args.id)
    if (!contact) return null
    await ctx.db.delete(args.id)
    await writeAudit(ctx, actor, {
      action: "delete",
      entityType: "mailContact",
      entityId: args.id,
      summary: `Deleted mail contact ${contact.email}`,
    })
    return null
  },
})

export const recordSent = mutation({
  args: {
    messageId: v.string(),
    inReplyTo: v.optional(v.string()),
    references: v.optional(v.string()),
    toAddresses: v.array(v.string()),
    ccAddresses: v.array(v.string()),
    bccAddresses: v.array(v.string()),
    subject: v.string(),
    textBody: v.string(),
    providerResponse: v.optional(v.string()),
    attachments: v.array(attachment),
  },
  returns: v.id("mailMessages"),
  handler: async (ctx, args) => {
    const actor = await getMailOperator(ctx)
    const now = Date.now()
    const id = await ctx.db.insert("mailMessages", {
      direction: "outgoing",
      messageId: args.messageId,
      inReplyTo: args.inReplyTo,
      references: args.references,
      fromAddress: "info@parishindusummit.org",
      fromName: "Paris Hindu Summit 2026",
      toAddresses: args.toAddresses,
      ccAddresses: args.ccAddresses,
      bccAddresses: args.bccAddresses,
      subject: args.subject,
      textBody: args.textBody,
      htmlBody: "",
      // An SMTP 250 response only confirms that the provider accepted the
      // message. It does not confirm delivery to the recipient's mailbox.
      deliveryStatus: "queued",
      isRead: true,
      sentByEmail: actor.admin.email,
      providerResponse: args.providerResponse,
      createdAt: now,
      updatedAt: now,
    })
    for (const item of args.attachments) {
      await ctx.db.insert("mailAttachments", {
        messageId: id,
        ...item,
        createdAt: now,
      })
    }
    await writeAudit(ctx, actor, {
      action: "send",
      entityType: "mailMessage",
      entityId: id,
      summary: `Queued email to ${args.toAddresses.join(", ")}`,
    })
    return id
  },
})

export const ingestIncoming = internalMutation({
  args: {
    messageId: v.string(),
    inReplyTo: v.optional(v.string()),
    references: v.optional(v.string()),
    fromAddress: v.string(),
    fromName: v.string(),
    toAddresses: v.array(v.string()),
    ccAddresses: v.array(v.string()),
    subject: v.string(),
    textBody: v.string(),
    htmlBody: v.string(),
    attachments: v.array(attachment),
    receivedAt: v.number(),
  },
  returns: v.object({ id: v.id("mailMessages"), duplicate: v.boolean() }),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("mailMessages")
      .withIndex("by_message_id", (q) => q.eq("messageId", args.messageId))
      .unique()
    if (existing) return { id: existing._id, duplicate: true }

    const now = Date.now()
    const id = await ctx.db.insert("mailMessages", {
      direction: "incoming",
      messageId: args.messageId,
      inReplyTo: args.inReplyTo,
      references: args.references,
      fromAddress: args.fromAddress,
      fromName: args.fromName,
      toAddresses: args.toAddresses,
      ccAddresses: args.ccAddresses,
      subject: args.subject,
      textBody: args.textBody,
      htmlBody: args.htmlBody,
      deliveryStatus: "received",
      isRead: false,
      createdAt: args.receivedAt,
      updatedAt: now,
    })
    for (const item of args.attachments) {
      await ctx.db.insert("mailAttachments", {
        messageId: id,
        ...item,
        createdAt: now,
      })
    }
    return { id, duplicate: false }
  },
})

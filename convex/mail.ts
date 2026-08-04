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
      (total, message) => total + message.toAddresses.length + message.ccAddresses.length,
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

export const recordSent = mutation({
  args: {
    messageId: v.string(),
    inReplyTo: v.optional(v.string()),
    references: v.optional(v.string()),
    toAddresses: v.array(v.string()),
    ccAddresses: v.array(v.string()),
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

import { v } from "convex/values"

import { internalMutation, internalQuery, mutation, query } from "./_generated/server"
import { getAdmin, writeAudit } from "./lib/admin"

const tierFields = {
  slug: v.string(),
  label: v.string(),
  amountCents: v.optional(v.number()),
  description: v.string(),
  stripePriceId: v.optional(v.string()),
  customAmount: v.boolean(),
  order: v.number(),
  status: v.union(v.literal("draft"), v.literal("published")),
}

export const listTiers = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("donationTiers"),
      slug: v.string(),
      label: v.string(),
      amountCents: v.union(v.number(), v.null()),
      description: v.string(),
      customAmount: v.boolean(),
      order: v.number(),
    })
  ),
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("donationTiers")
      .withIndex("by_status_and_order", (q) => q.eq("status", "published"))
      .take(20)
    return rows.map((item) => ({
      _id: item._id,
      slug: item.slug,
      label: item.label,
      amountCents: item.amountCents ?? null,
      description: item.description,
      customAmount: item.customAmount,
      order: item.order,
    }))
  },
})

export const listTiersForAdmin = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("donationTiers"),
      ...tierFields,
    })
  ),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const rows = await ctx.db
      .query("donationTiers")
      .withIndex("by_status_and_order")
      .take(50)
    return rows.map((item) => ({
      _id: item._id,
      slug: item.slug,
      label: item.label,
      amountCents: item.amountCents,
      description: item.description,
      stripePriceId: item.stripePriceId,
      customAmount: item.customAmount,
      order: item.order,
      status: item.status,
    }))
  },
})

export const saveTier = mutation({
  args: { id: v.optional(v.id("donationTiers")), ...tierFields },
  returns: v.id("donationTiers"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const { id, ...fields } = args
    const value = { ...fields, updatedAt: Date.now() }
    const entityId = id
      ? (await ctx.db.patch(id, value), id)
      : await ctx.db.insert("donationTiers", value)
    await writeAudit(ctx, actor, {
      action: id ? "update" : "create",
      entityType: "donationTier",
      entityId,
      summary: `Saved ${fields.label}`,
    })
    return entityId
  },
})

export const getTierForCheckout = internalQuery({
  args: { id: v.id("donationTiers") },
  returns: v.union(
    v.null(),
    v.object({
      label: v.string(),
      amountCents: v.union(v.number(), v.null()),
      description: v.string(),
      customAmount: v.boolean(),
      stripePriceId: v.union(v.string(), v.null()),
    })
  ),
  handler: async (ctx, args) => {
    const tier = await ctx.db.get(args.id)
    if (!tier || tier.status !== "published") return null
    return {
      label: tier.label,
      amountCents: tier.amountCents ?? null,
      description: tier.description,
      customAmount: tier.customAmount,
      stripePriceId: tier.stripePriceId ?? null,
    }
  },
})

export const recordCheckout = internalMutation({
  args: {
    reference: v.string(),
    donorName: v.string(),
    donorEmail: v.string(),
    amountCents: v.number(),
    status: v.union(v.literal("demo"), v.literal("pending")),
    stripeSessionId: v.optional(v.string()),
  },
  returns: v.id("donations"),
  handler: async (ctx, args) => {
    const now = Date.now()
    return await ctx.db.insert("donations", {
      ...args,
      currency: "eur",
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const applyStripeEvent = internalMutation({
  args: {
    stripeSessionId: v.string(),
    status: v.union(
      v.literal("paid"),
      v.literal("failed"),
      v.literal("expired")
    ),
    stripePaymentIntentId: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const donation = await ctx.db
      .query("donations")
      .withIndex("by_stripe_session_id", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .unique()
    if (!donation) return null
    await ctx.db.patch(donation._id, {
      status: args.status,
      stripePaymentIntentId: args.stripePaymentIntentId,
      updatedAt: Date.now(),
    })
    return null
  },
})

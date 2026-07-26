import Stripe from "stripe"
import { ConvexError, v } from "convex/values"

import { internal } from "./_generated/api"
import { action } from "./_generated/server"

export const createCheckout = action({
  args: {
    tierId: v.id("donationTiers"),
    customAmountCents: v.optional(v.number()),
    donorName: v.string(),
    donorEmail: v.string(),
  },
  returns: v.object({
    mode: v.union(v.literal("stripe"), v.literal("demo")),
    url: v.union(v.string(), v.null()),
    reference: v.string(),
  }),
  handler: async (ctx, args) => {
    const tier = await ctx.runQuery(internal.donations.getTierForCheckout, {
      id: args.tierId,
    })
    if (!tier) throw new ConvexError("Donation tier is unavailable.")
    const amountCents = tier.customAmount
      ? args.customAmountCents
      : tier.amountCents
    if (!amountCents || amountCents < 500 || amountCents > 100_000_00) {
      throw new ConvexError("Donation amount must be between €5 and €100,000.")
    }

    const reference = `DON-${Date.now().toString(36).toUpperCase()}`
    const secret = process.env.STRIPE_SECRET_KEY
    if (!secret) {
      await ctx.runMutation(internal.donations.recordCheckout, {
        reference,
        donorName: args.donorName.trim(),
        donorEmail: args.donorEmail.trim().toLowerCase(),
        amountCents,
        status: "demo",
      })
      return { mode: "demo" as const, url: null, reference }
    }

    const stripe = new Stripe(secret, {
      httpClient: Stripe.createFetchHttpClient(),
    })
    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000"
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: args.donorEmail.trim().toLowerCase() || undefined,
      client_reference_id: reference,
      success_url: `${siteUrl}/donate?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate?status=cancelled`,
      metadata: { reference },
      line_items: tier.stripePriceId
        ? [{ price: tier.stripePriceId, quantity: 1 }]
        : [
            {
              quantity: 1,
              price_data: {
                currency: "eur",
                unit_amount: amountCents,
                product_data: {
                  name: tier.label,
                  description: tier.description,
                },
              },
            },
          ],
    })
    await ctx.runMutation(internal.donations.recordCheckout, {
      reference,
      donorName: args.donorName.trim(),
      donorEmail: args.donorEmail.trim().toLowerCase(),
      amountCents,
      status: "pending",
      stripeSessionId: session.id,
    })
    return { mode: "stripe" as const, url: session.url, reference }
  },
})

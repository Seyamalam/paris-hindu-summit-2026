import Stripe from "stripe"
import { httpRouter } from "convex/server"

import { internal } from "./_generated/api"
import { httpAction } from "./_generated/server"
import { authComponent, createAuth } from "./auth"

const http = httpRouter()
authComponent.registerRoutes(http, createAuth)

http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const secret = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const signature = request.headers.get("stripe-signature")
    if (!secret || !webhookSecret || !signature) {
      return new Response("Stripe is not configured.", { status: 503 })
    }

    const rawBody = await request.text()
    const stripe = new Stripe(secret, {
      httpClient: Stripe.createFetchHttpClient(),
    })

    try {
      const event = await stripe.webhooks.constructEventAsync(
        rawBody,
        signature,
        webhookSecret
      )
      if (
        event.type === "checkout.session.completed" ||
        event.type === "checkout.session.expired"
      ) {
        const session = event.data.object
        await ctx.runMutation(internal.donations.applyStripeEvent, {
          stripeSessionId: session.id,
          status:
            event.type === "checkout.session.completed" ? "paid" : "expired",
          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : undefined,
        })
      }
      return new Response("ok", { status: 200 })
    } catch {
      return new Response("Invalid Stripe signature.", { status: 400 })
    }
  }),
})

export default http

import Stripe from "stripe"
import { httpRouter } from "convex/server"

import { internal } from "./_generated/api"
import { httpAction } from "./_generated/server"
import { authComponent, createAuth } from "./auth"

const http = httpRouter()
authComponent.registerRoutes(http, createAuth)

function stringValue(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.slice(0, maxLength) : ""
}

function stringList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").slice(0, 50)
    : []
}

http.route({
  path: "/mail/inbound",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const expectedSecret = process.env.MAIL_INGEST_SECRET
    const suppliedSecret = request.headers.get("x-mail-ingest-secret")
    if (!expectedSecret || suppliedSecret !== expectedSecret) {
      return new Response("Unauthorized", { status: 401 })
    }

    let value: unknown
    try {
      value = await request.json()
    } catch {
      return new Response("Invalid JSON", { status: 400 })
    }
    if (!value || typeof value !== "object") {
      return new Response("Invalid payload", { status: 400 })
    }
    const body = value as Record<string, unknown>
    const rawAttachments = Array.isArray(body.attachments) ? body.attachments : []
    const attachments = rawAttachments.slice(0, 50).flatMap((item) => {
      if (!item || typeof item !== "object") return []
      const candidate = item as Record<string, unknown>
      return [{
        fileName: stringValue(candidate.fileName, 500) || "attachment",
        mimeType: stringValue(candidate.mimeType, 200) || "application/octet-stream",
        byteSize:
          typeof candidate.byteSize === "number" && Number.isFinite(candidate.byteSize)
            ? Math.max(0, candidate.byteSize)
            : 0,
        contentId: stringValue(candidate.contentId, 500) || undefined,
      }]
    })
    const messageId = stringValue(body.messageId, 1000)
    const fromAddress = stringValue(body.fromAddress, 500)
    if (!messageId || !fromAddress) {
      return new Response("messageId and fromAddress are required", { status: 400 })
    }

    const result = await ctx.runMutation(internal.mail.ingestIncoming, {
      messageId,
      inReplyTo: stringValue(body.inReplyTo, 1000) || undefined,
      references: stringValue(body.references, 4000) || undefined,
      fromAddress,
      fromName: stringValue(body.fromName, 500),
      toAddresses: stringList(body.toAddresses),
      ccAddresses: stringList(body.ccAddresses),
      subject: stringValue(body.subject, 2000) || "(no subject)",
      textBody: stringValue(body.textBody, 300_000),
      htmlBody: stringValue(body.htmlBody, 300_000),
      attachments,
      receivedAt:
        typeof body.receivedAt === "number" && Number.isFinite(body.receivedAt)
          ? body.receivedAt
          : Date.now(),
    })
    return Response.json(result)
  }),
})

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

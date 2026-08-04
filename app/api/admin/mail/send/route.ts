import nodemailer from "nodemailer"

import { api } from "@/convex/_generated/api"
import { fetchAuthMutation, fetchAuthQuery } from "@/lib/auth-server"

type SendBody = {
  to?: unknown
  cc?: unknown
  subject?: unknown
  text?: unknown
  inReplyTo?: unknown
  references?: unknown
}

function addresses(value: unknown) {
  if (typeof value !== "string") return []
  return value
    .split(/[;,]/)
    .map((address) => address.trim().toLowerCase())
    .filter((address, index, items) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) && items.indexOf(address) === index
    )
    .slice(0, 25)
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function POST(request: Request) {
  try {
    await fetchAuthQuery(api.mail.canAccess, {})
  } catch {
    return Response.json({ error: "Mail desk access is required." }, { status: 403 })
  }

  let body: SendBody
  try {
    body = (await request.json()) as SendBody
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 })
  }

  const to = addresses(body.to)
  const cc = addresses(body.cc)
  const subject = text(body.subject, 998)
  const messageText = text(body.text, 200_000)
  const inReplyTo = text(body.inReplyTo, 1000) || undefined
  const references = text(body.references, 4000) || undefined
  if (to.length === 0 || !subject || !messageText) {
    return Response.json(
      { error: "Add at least one valid recipient, a subject, and a message." },
      { status: 400 }
    )
  }

  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const port = Number(process.env.SMTP_PORT || "587")
  const fromAddress = process.env.MAIL_FROM_ADDRESS || "info@parishindusummit.org"
  if (!host || !user || !pass || !Number.isFinite(port)) {
    return Response.json({ error: "Outbound mail is not configured." }, { status: 503 })
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      requireTLS: port === 587,
    })
    const info = await transporter.sendMail({
      from: { name: "Paris Hindu Summit 2026", address: fromAddress },
      to,
      cc,
      replyTo: fromAddress,
      subject,
      text: messageText,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;white-space:pre-wrap">${escapeHtml(messageText)}</div>`,
      inReplyTo,
      references,
    })
    await fetchAuthMutation(api.mail.recordSent, {
      messageId: info.messageId,
      inReplyTo,
      references,
      toAddresses: to,
      ccAddresses: cc,
      subject,
      textBody: messageText,
      providerResponse: info.response,
    })
    return Response.json({ ok: true, messageId: info.messageId })
  } catch (error) {
    console.error("Outbound mail failed", error instanceof Error ? error.message : "Unknown error")
    return Response.json(
      { error: "The message could not be sent. Check the outbound mail configuration." },
      { status: 502 }
    )
  }
}

import nodemailer from "nodemailer"

import { api } from "@/convex/_generated/api"
import { fetchAuthMutation, fetchAuthQuery } from "@/lib/auth-server"

type SendBody = {
  to?: unknown
  cc?: unknown
  bcc?: unknown
  subject?: unknown
  text?: unknown
  inReplyTo?: unknown
  references?: unknown
  mode?: unknown
  consentConfirmed?: unknown
  attachments?: unknown
}

type MailAttachment = {
  fileName: string
  mimeType: string
  byteSize: number
  contentBase64: string
}

function addresses(value: unknown, limit = 25) {
  if (typeof value !== "string") return []
  return value
    .split(/[;,\s]+/)
    .map((address) => address.trim().toLowerCase())
    .filter((address, index, items) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address) && items.indexOf(address) === index
    )
    .slice(0, limit)
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

function attachments(value: unknown): MailAttachment[] {
  if (!Array.isArray(value)) return []
  const allowedExtensions = new Set(["pdf", "doc", "docx", "jpg", "jpeg", "png"])
  const parsed = value.slice(0, 5).flatMap((item) => {
    if (!item || typeof item !== "object") return []
    const record = item as Record<string, unknown>
    const fileName = text(record.fileName, 180).replace(/[\\/]/g, "-")
    const mimeType = text(record.mimeType, 120) || "application/octet-stream"
    const contentBase64 = typeof record.contentBase64 === "string" ? record.contentBase64 : ""
    const byteSize = Buffer.byteLength(contentBase64, "base64")
    if (!fileName || !contentBase64 || byteSize < 1) return []
    if (!allowedExtensions.has(fileName.split(".").pop()?.toLowerCase() ?? "")) {
      throw new Error("Attachments must be PDF, DOC, DOCX, JPEG, or PNG files.")
    }
    return [{ fileName, mimeType, byteSize, contentBase64 }]
  })
  if (parsed.reduce((total, item) => total + item.byteSize, 0) > 3_000_000) {
    throw new Error("Attachments must total 3 MB or less.")
  }
  return parsed
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

  const mode = body.mode === "bulk" ? "bulk" : "single"
  const to = addresses(body.to, mode === "bulk" ? 300 : 25)
  const cc = addresses(body.cc)
  const bcc = addresses(body.bcc)
  const subject = text(body.subject, 998)
  const messageText = text(body.text, 200_000)
  const inReplyTo = text(body.inReplyTo, 1000) || undefined
  const references = text(body.references, 4000) || undefined
  let messageAttachments: MailAttachment[]
  try {
    messageAttachments = attachments(body.attachments)
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Invalid attachments." }, { status: 400 })
  }
  if (to.length === 0 || !subject || !messageText) {
    return Response.json(
      { error: "Add at least one valid recipient, a subject, and a message." },
      { status: 400 }
    )
  }
  if (mode === "bulk" && (cc.length > 0 || bcc.length > 0 || to.length < 2)) {
    return Response.json({ error: "Bulk dispatches need at least two recipients and use their own private recipient list." }, { status: 400 })
  }
  if (mode === "bulk" && body.consentConfirmed !== true) {
    return Response.json({ error: "Confirm that every campaign recipient consented to receive email." }, { status: 400 })
  }

  const allowance = await fetchAuthQuery(api.mail.dailyAllowance, {})
  const requestedRecipients = to.length + cc.length + bcc.length
  if (requestedRecipients > allowance.remaining) {
    return Response.json(
      { error: `This dispatch needs ${requestedRecipients} recipients, but only ${allowance.remaining} remain today.` },
      { status: 429 }
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

  const messageId = `<${crypto.randomUUID()}@parishindusummit.org>`
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      requireTLS: port === 587,
    })
    const info = await transporter.sendMail({
      messageId,
      from: { name: "Paris Hindu Summit 2026", address: fromAddress },
      ...(mode === "bulk"
        ? { to: "undisclosed-recipients:;", bcc: to }
        : { to, cc, bcc }),
      replyTo: fromAddress,
      subject,
      text: messageText,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;white-space:pre-wrap">${escapeHtml(messageText)}</div>`,
      inReplyTo,
      references,
      attachments: messageAttachments.map((item) => ({
        filename: item.fileName,
        content: Buffer.from(item.contentBase64, "base64"),
        contentType: item.mimeType,
      })),
    })
    await fetchAuthMutation(api.mail.recordSent, {
      messageId: info.messageId,
      inReplyTo,
      references,
      toAddresses: to,
      ccAddresses: cc,
      bccAddresses: bcc,
      subject,
      textBody: messageText,
      providerResponse: info.response,
      attachments: messageAttachments.map(({ fileName, mimeType, byteSize }) => ({
        fileName,
        mimeType,
        byteSize,
      })),
    })
    return Response.json({ ok: true, messageId: info.messageId, status: "queued", recipientCount: requestedRecipients })
  } catch (error) {
    const details = error && typeof error === "object" ? error as { message?: string; response?: string; code?: string } : {}
    const providerMessage = text(details.response || details.message, 500) || "The delivery provider did not accept the message."
    console.error("Outbound mail failed", providerMessage)
    await fetchAuthMutation(api.mail.recordFailed, {
      messageId,
      inReplyTo,
      references,
      toAddresses: to,
      ccAddresses: cc,
      bccAddresses: bcc,
      subject,
      textBody: messageText,
      providerResponse: providerMessage,
      attachments: messageAttachments.map(({ fileName, mimeType, byteSize }) => ({ fileName, mimeType, byteSize })),
    }).catch((recordError) => console.error("Could not record failed mail", recordError))
    return Response.json(
      { error: `Message failed: ${providerMessage}`, code: details.code || "SMTP_REJECTED" },
      { status: 502 }
    )
  }
}

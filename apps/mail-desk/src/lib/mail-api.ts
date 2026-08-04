import { authClient } from "@/lib/auth-client"
import { SITE_URL } from "@/lib/config"

export type OutboundAttachment = {
  fileName: string
  mimeType: string
  byteSize: number
  contentBase64: string
}

export async function sendMail(body: Record<string, unknown>) {
  const cookie = (authClient as typeof authClient & { getCookie(): string }).getCookie()
  const response = await fetch(`${SITE_URL}/api/admin/mail/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify(body),
  })
  const result = (await response.json().catch(() => ({}))) as { error?: string; status?: string }
  if (!response.ok) throw new Error(result.error || "The message could not be sent.")
  return result
}

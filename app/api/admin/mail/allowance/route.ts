import { api } from "@/convex/_generated/api"
import { fetchAuthQuery } from "@/lib/auth-server"

type BrevoPlan = {
  credits?: unknown
  creditsType?: unknown
  type?: unknown
}

export const dynamic = "force-dynamic"

export async function GET() {
  let local
  try {
    local = await fetchAuthQuery(api.mail.dailyAllowance, {})
  } catch {
    return Response.json({ error: "Mail desk access is required." }, { status: 403 })
  }

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return Response.json({ ...local, providerRemaining: null, source: "local" })
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/account", {
      headers: { accept: "application/json", "api-key": apiKey },
      cache: "no-store",
    })
    if (!response.ok) throw new Error(`Brevo returned ${response.status}`)
    const account = (await response.json()) as { plan?: BrevoPlan[] }
    const emailPlan = account.plan?.find((plan) =>
      plan.creditsType === "sendLimit" && plan.type !== "sms"
    )
    const providerRemaining = Number(emailPlan?.credits)
    if (!Number.isFinite(providerRemaining)) throw new Error("Brevo did not return email credits")

    return Response.json({
      ...local,
      remaining: Math.min(local.remaining, Math.max(0, providerRemaining)),
      providerRemaining: Math.max(0, providerRemaining),
      source: "brevo",
    })
  } catch {
    return Response.json({ ...local, providerRemaining: null, source: "local" })
  }
}

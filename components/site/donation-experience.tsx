"use client"

import { useAction, useQuery } from "convex/react"
import { CheckCircle2Icon, HeartHandshakeIcon, Loader2Icon, LockKeyholeIcon } from "lucide-react"
import { FormEvent, useState } from "react"

import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Reveal } from "@/components/site/reveal"

export function DonationExperience() {
  const tiers = useQuery(api.donations.listTiers)
  const settings = useQuery(api.settings.get)
  const checkout = useAction(api.stripe.createCheckout)
  const [selected, setSelected] = useState<Id<"donationTiers"> | null>(null)
  const [custom, setCustom] = useState("75")
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<{ reference:string; demo:boolean } | null>(null)
  const tier = tiers?.find((item) => item._id === selected)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected || !tier) return
    const form = new FormData(event.currentTarget)
    setBusy(true)
    try {
      const response = await checkout({
        tierId: selected,
        customAmountCents: tier.customAmount ? Math.round(Number(custom) * 100) : undefined,
        donorName: String(form.get("name")),
        donorEmail: String(form.get("email")),
      })
      if (response.mode === "stripe" && response.url) window.location.assign(response.url)
      else setResult({ reference:response.reference, demo:true })
    } finally { setBusy(false) }
  }

  return (
    <section className="donation-desk section-shell">
      <Reveal className="donation-heading">
        <p className="kicker">{settings?.donationEyebrow ?? "Choose a contribution"}</p>
        <h2>{settings?.donationTitle ?? "Turn solidarity into practical capacity."}</h2>
        <p>{settings?.donationBody ?? "Support documentation, international participation, translation, media work and the continuing rights network after Paris."}</p>
      </Reveal>
      {settings?.donationsEnabled === false ? (
        <Alert className="donation-result">
          <LockKeyholeIcon />
          <AlertTitle>Contribution desk coming soon</AlertTitle>
          <AlertDescription>
            The organisers are preparing this pathway. No contribution can be
            recorded while donations are disabled in Global Site Settings.
          </AlertDescription>
        </Alert>
      ) : (
        <>
      <div className="donation-tier-grid">
        {tiers?.map((item, index) => (
          <Reveal key={item._id} delay={index * 70}>
            <button className="donation-tier" data-active={selected === item._id} onClick={() => setSelected(item._id)}>
              <span>0{index + 1}</span>
              <HeartHandshakeIcon />
              <h3>{item.label}</h3>
              <b>{item.customAmount ? "Your amount" : `€${(item.amountCents ?? 0) / 100}`}</b>
              <p>{item.description}</p>
            </button>
          </Reveal>
        ))}
      </div>
      <Reveal className="checkout-demo">
        <div>
          <p className="kicker">Secure contribution desk</p>
          <h2>{selected ? "Record your intention to contribute." : "Select a level to begin."}</h2>
          <p>Online payments are not yet open. For now, this form securely records your contribution intention without taking payment.</p>
          <div className="payment-readiness"><span><CheckCircle2Icon /> Secure record</span><span><CheckCircle2Icon /> Email reference</span><span><LockKeyholeIcon /> No charge today</span></div>
        </div>
        <form onSubmit={submit}>
          {tier?.customAmount && <label><span>Amount in euros</span><Input type="number" min="5" max="100000" value={custom} onChange={(event) => setCustom(event.target.value)} /></label>}
          <label><span>Name</span><Input name="name" required /></label>
          <label><span>Email for receipt</span><Input name="email" type="email" required /></label>
          <Button disabled={!selected || busy} type="submit">{busy && <Loader2Icon className="animate-spin" />} Continue to payment</Button>
          <small>No payment is taken through this form.</small>
        </form>
      </Reveal>
      {result && <Alert className="donation-result"><CheckCircle2Icon /><AlertTitle>Contribution intention recorded</AlertTitle><AlertDescription>Reference {result.reference}. Keep this reference for your records; no payment was taken.</AlertDescription></Alert>}
        </>
      )}
    </section>
  )
}

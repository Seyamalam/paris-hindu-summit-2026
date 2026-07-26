import type { Metadata } from "next"

import { PageHero } from "@/components/site/page-hero"
import { Reveal } from "@/components/site/reveal"
import { SupportForm } from "@/components/site/support-form"

export const metadata: Metadata = { title: "Support & contact" }

export default function SupportPage() {
  return <>
    <PageHero eyebrow="A human route in" title="Ask. Offer. Connect." intro="One public desk for practical support, partnership, volunteering, media enquiries and conversations with the summit team." />
    <section className="support-desk section-shell">
      <Reveal className="support-intro"><p className="kicker">Contact pathways</p><h2>Choose the conversation. We will route it.</h2><p>Every submission receives a reference and arrives in the protected admin inbox, where organisers can assign a status and retain an internal note.</p></Reveal>
      <Reveal delay={120}><SupportForm /></Reveal>
    </section>
  </>
}

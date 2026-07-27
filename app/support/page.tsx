import type { Metadata } from "next"

import { ManagedPageHero } from "@/components/site/managed-page-hero"
import { ManagedText } from "@/components/site/managed-editorial"
import { Reveal } from "@/components/site/reveal"
import { SupportForm } from "@/components/site/support-form"

export const metadata: Metadata = { title: "Support & contact" }

export default function SupportPage() {
  return <>
    <ManagedPageHero slug="support" eyebrow="A human route in" title="Ask. Offer. Connect." intro="One public desk for practical support, partnership, volunteering, media enquiries and conversations with the summit team." />
    <section className="support-desk section-shell">
      <Reveal className="support-intro"><p className="kicker"><ManagedText slug="support-intro" field="eyebrow" fallback="Contact pathways" /></p><h2><ManagedText slug="support-intro" field="title" fallback="Choose the conversation. We will route it." /></h2><p><ManagedText slug="support-intro" field="summary" fallback="Every submission receives a reference and arrives in the protected admin inbox, where organisers can assign a status and retain an internal note." /></p></Reveal>
      <Reveal delay={120}><SupportForm /></Reveal>
    </section>
  </>
}

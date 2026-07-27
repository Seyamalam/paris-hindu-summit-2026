import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ManagedText } from "@/components/site/managed-editorial"
import { ManagedSpeakers } from "@/components/site/managed-forum-content"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export default function SpeakersPage() {
  return (
    <>
      <ManagedPageHero
        slug="speakers"
        eyebrow="Speakers and contributors"
        title="Voices carrying evidence into the room."
        intro="The confirmed and proposed contributors below represent the summit’s legal, geopolitical, community, cultural, and documentation work."
      />
      <ManagedSpeakers />
      <section className="nomination-cta section-shell">
        <p className="kicker"><ManagedText slug="speakers-nomination" field="eyebrow" fallback="Programme participation" /></p>
        <h2><ManagedText slug="speakers-nomination" field="title" fallback="Bring verified experience, research, or institutional responsibility to Paris." /></h2>
        <Button nativeButton={false} render={<Link href="/participate#contact" />}><ManagedText slug="speakers-nomination" field="linkLabel" fallback="Contact the programme team" /> <ArrowUpRightIcon data-icon="inline-end" /></Button>
      </section>
    </>
  )
}

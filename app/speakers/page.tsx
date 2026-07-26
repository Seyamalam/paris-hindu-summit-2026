import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/site/page-hero"
import { speakers } from "@/lib/content"

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        eyebrow="Speakers and contributors"
        title="Voices carrying evidence into the room."
        intro="The confirmed and proposed contributors below represent the summit’s legal, geopolitical, community, cultural, and documentation work."
      />
      <section className="speaker-list section-shell">
        {speakers.map((speaker, index) => (
          <article key={speaker.name}>
            <span className="speaker-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="speaker-portrait"><Image src={speaker.image} alt={speaker.name} fill sizes="(max-width: 720px) 100vw, 32vw" /></div>
            <div>
              <p className="kicker">{speaker.country}</p>
              <h2>{speaker.name}</h2>
              <h3>{speaker.role}</h3>
              <p>{speaker.bio}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="nomination-cta section-shell">
        <p className="kicker">Programme participation</p>
        <h2>Bring verified experience, research, or institutional responsibility to Paris.</h2>
        <Button nativeButton={false} render={<Link href="/participate#contact" />}>Contact the programme team <ArrowUpRightIcon data-icon="inline-end" /></Button>
      </section>
    </>
  )
}

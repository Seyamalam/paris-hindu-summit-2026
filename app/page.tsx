import Image from "next/image"
import Link from "next/link"
import {
  ArrowRightIcon,
  AudioLinesIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PlayIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/site/countdown"
import { HeroClothBadge } from "@/components/site/hero-cloth-badge"
import { PaymentDialog } from "@/components/site/payment-dialog"
import { event, evidence, speakers } from "@/lib/content"

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image
          src="/images/testimony-stage.png"
          alt="An empty wooden chair and microphone beneath a theatre spotlight"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="home-hero-content">
          <p className="kicker">{event.dates} · Paris, France</p>
          <HeroClothBadge />
          <h1>When testimony enters the room, silence ends.</h1>
          <p className="hero-lead">{event.theme}</p>
          <div className="hero-actions">
            <Button nativeButton={false} size="lg" render={<Link href="/participate" />}>
              Attend in Paris <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button nativeButton={false} size="lg" variant="outline" render={<Link href="/media#film" />}>
              <PlayIcon data-icon="inline-start" /> Watch the opening film
            </Button>
          </div>
          <div className="hero-meta">
            <span><CalendarDaysIcon /> {event.dates}</span>
            <span><MapPinIcon /> {event.venue}, Drancy</span>
          </div>
        </div>
      </section>

      <section className="opening-line">
        <p className="kicker">A community long unheard</p>
        <AudioLinesIcon aria-hidden="true" />
        <p>Two days to listen, understand, organise, and act.</p>
      </section>

      <section className="split-intro section-shell">
        <div>
          <p className="kicker">Why Paris · Why now</p>
          <h2>Justice delayed for half a century cannot be denied indefinitely.</h2>
        </div>
        <div className="body-copy">
          <p>Since Bangladesh’s founding, Hindu communities have faced repeated cycles of dispossession, displacement, discrimination, and violence. Their testimony has too often remained fragmented or confined to local reporting.</p>
          <p>This summit unites survivors, researchers, rights defenders, policymakers, diplomats, and diaspora organisations around verified evidence and commitments capable of lasting beyond a single event.</p>
          <Button nativeButton={false} variant="link" render={<Link href="/about" />}>Read why the forum exists <ArrowRightIcon data-icon="inline-end" /></Button>
        </div>
      </section>

      <section className="evidence-band">
        <div className="section-heading compact">
          <p className="kicker">Bangladesh · the record</p>
          <h2>Numbers that should stop the room.</h2>
        </div>
        <div className="evidence-grid">
          {evidence.map((item) => (
            <article key={item.value}>
              <b>{item.value}</b>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
        <p className="source-note">Statistics reproduced from the supplied summit concept note; final publication should include approved source links and methodology.</p>
      </section>

      <section className="section-shell programme-preview" id="programme-preview">
        <div className="section-heading">
          <p className="kicker">Conference programme</p>
          <h2>Understand. Engage. Inspire.<br />Collaborate. Commit. Conclude.</h2>
          <Button nativeButton={false} variant="outline" render={<Link href="/programme" />}>Explore both days <ArrowRightIcon data-icon="inline-end" /></Button>
        </div>
        <div className="day-preview">
          <article>
            <span>Day 01</span>
            <div>
              <h3>Evidence enters the public record.</h3>
              <p>Opening film, keynote, historical context, testimony, legal protection, and the seven-point charter.</p>
            </div>
          </article>
          <article>
            <span>Day 02</span>
            <div>
              <h3>Evidence becomes commitment.</h3>
              <p>Policy roundtable, international cooperation, the Paris Declaration, and the Agni Sakshi pledge.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="speaker-preview section-shell">
        <div className="section-heading compact">
          <p className="kicker">Voices in the room</p>
          <h2>People carrying evidence into action.</h2>
        </div>
        <div className="speaker-preview-grid">
          {speakers.slice(0, 3).map((speaker) => (
            <article key={speaker.name}>
              <div><Image src={speaker.image} alt={speaker.name} fill sizes="(max-width: 720px) 100vw, 33vw" /></div>
              <p>{speaker.country}</p><h3>{speaker.name}</h3><span>{speaker.role}</span>
            </article>
          ))}
        </div>
        <Button nativeButton={false} variant="outline" render={<Link href="/speakers" />}>Meet the speakers <ArrowRightIcon data-icon="inline-end" /></Button>
      </section>

      <section className="countdown-section section-shell">
        <div>
          <p className="kicker">The room opens in</p>
          <h2>{event.dates}<br />Paris, France</h2>
          <p>{event.address}</p>
        </div>
        <Countdown />
      </section>

      <section className="home-support">
        <Image src="/images/paris-night.png" alt="Paris at night beside the River Seine" fill sizes="100vw" />
        <div>
          <p className="kicker">Stand with the summit</p>
          <h2>Help testimony travel further than the room.</h2>
          <p>Support documentation, international participation, media work, legal advocacy, and the standing network after Paris.</p>
          <PaymentDialog />
        </div>
      </section>
    </>
  )
}

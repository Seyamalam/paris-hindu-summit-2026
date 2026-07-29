"use client"

import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { useEditorialRecord } from "@/components/site/managed-editorial"

export function HomeInfoBar() {
  const settings = useQuery(api.settings.get)
  const labels = useEditorialRecord("home-info-labels", {
    title:"Venue",
    summary:"Format",
    body:"Delegates",
    secondaryText:"Languages",
  })
  const facts = [
    [labels.title, settings?.venue ?? "Salle des Princes"],
    [labels.summary, settings?.format ?? "Two-day international summit"],
    [labels.body, settings?.delegateInfo ?? "International delegates"],
    [labels.secondaryText, settings?.languages ?? "English · French · Bengali"],
  ]
  return <section className="home-info-bar">{facts.map(([label,value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</section>
}

export function EvidenceStats() {
  const entries = useQuery(api.cms.listPublished, { category: "sectionCopy" })
  const stats = (entries ?? []).filter(
    (entry) =>
      entry.slug.startsWith("home-evidence-") &&
      entry.slug !== "home-evidence-heading"
  )

  return (
    <div className="evidence-grid">
      {stats.map((entry) => (
        <article key={entry._id}>
          <b>{entry.title}</b>
          {entry.summary && <p>{entry.summary}</p>}
        </article>
      ))}
    </div>
  )
}

export function FeaturedSpeakers() {
  const managedSpeakers = useQuery(api.cms.listPublished, { category: "speaker" })
  const heading = useEditorialRecord("home-speakers-heading", {
    eyebrow:"Voices in the room",
    title:"People carrying evidence into action.",
    linkLabel:"Meet the speakers",
    linkUrl:"/speakers",
  })
  const available = managedSpeakers ?? []
  const featured = available.filter((speaker) => speaker.featured)
  const speakers = (featured.length > 0 ? featured : available)
    .slice(0, 3)
    .map((speaker) => ({
          key: speaker._id,
          name: speaker.title,
          country: speaker.country,
          role: speaker.role || speaker.summary,
          image: speaker.imageUrl,
        }))

  return (
    <section className="speaker-preview section-shell">
      <div className="section-heading compact">
        <p className="kicker">{heading.eyebrow}</p>
        <h2>{heading.title}</h2>
      </div>
      <div className="speaker-preview-grid">
        {speakers.map((speaker) => (
          <article key={speaker.key}>
            <div>
              {speaker.image ? (
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
              ) : (
                <span aria-hidden="true">{speaker.name.charAt(0)}</span>
              )}
            </div>
            <p>{speaker.country}</p>
            <h3>{speaker.name}</h3>
            <span>{speaker.role}</span>
          </article>
        ))}
      </div>
      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href={heading.linkUrl || "/speakers"} />}
      >
        {heading.linkLabel} <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </section>
  )
}

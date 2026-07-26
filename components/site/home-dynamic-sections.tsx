"use client"

import { useQuery } from "convex/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { api } from "@/convex/_generated/api"
import { speakers as fallbackSpeakers } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Reveal } from "@/components/site/reveal"

const chartConfig = { value: { label: "Value", color: "var(--assembly-red)" } } satisfies ChartConfig

export function HomeInfoBar() {
  const settings = useQuery(api.settings.get)
  const facts = [
    ["Venue", settings?.venue ?? "Salle des Princes"],
    ["Format", settings?.format ?? "Two-day international summit"],
    ["Delegates", settings?.delegateInfo ?? "International delegates"],
    ["Languages", settings?.languages ?? "English · French · Bengali"],
  ]
  return <section className="home-info-bar">{facts.map(([label,value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</section>
}

export function WhyAndChallenges() {
  const why = useQuery(api.cms.listPublished, { category: "why" })
  const challenges = useQuery(api.cms.listPublished, { category: "challenge" })
  return <>
    <section className="why-record section-shell">
      <div className="section-heading compact"><p className="kicker">Why this summit</p><h2>Understand the record. Build protection.</h2></div>
      <div className="why-record-grid">{why?.map((item,index) => <Reveal key={item._id} delay={index*80}><article><span>0{index+1}</span><p className="kicker">{item.eyebrow}</p><h3>{item.title}</h3><p>{item.summary}</p></article></Reveal>)}</div>
    </section>
    <section className="challenge-record">
      <div className="section-heading compact"><p className="kicker">The challenges</p><h2>What the declaration must confront.</h2></div>
      <div className="challenge-record-grid">{challenges?.map((item,index) => <Reveal key={item._id} delay={index*80}><article><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.summary}</p></article></Reveal>)}</div>
    </section>
  </>
}

export function EvidenceCharts() {
  const series = useQuery(api.charts.listPublished)
  return <section className="evidence-charts section-shell">
    {series?.map((chart,index) => <Reveal key={chart._id} delay={index*100}><article>
      <header><p className="kicker">{chart.eyebrow}</p><h2>{chart.title}</h2><p>{chart.description}</p></header>
      <ChartContainer config={chartConfig} className="evidence-chart-canvas">
        <BarChart accessibilityLayer data={chart.points} margin={{ left:0,right:8 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={36} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" fill="var(--color-value)" radius={0} />
        </BarChart>
      </ChartContainer>
      <table><caption className="sr-only">{chart.title}</caption><thead><tr><th>Period</th><th>Context</th><th>Value ({chart.unit})</th></tr></thead><tbody>{chart.points.map((point) => <tr key={point._id}><td>{point.label}</td><td>{point.sublabel}</td><td>{point.value}</td></tr>)}</tbody></table>
      <small>{chart.sourceLabel}</small>
    </article></Reveal>)}
  </section>
}

export function FeaturedSpeakers() {
  const managedSpeakers = useQuery(api.cms.listPublished, { category: "speaker" })
  const featured = managedSpeakers
    ?.filter((speaker) => speaker.featured)
    .slice(0, 3)
  const speakers =
    featured && featured.length > 0
      ? featured.map((speaker) => ({
          key: speaker._id,
          name: speaker.title,
          country: speaker.country,
          role: speaker.role || speaker.summary,
          image: speaker.imageUrl,
        }))
      : fallbackSpeakers.slice(0, 3).map((speaker) => ({
          key: speaker.name,
          name: speaker.name,
          country: speaker.country,
          role: speaker.role,
          image: speaker.image,
        }))

  return (
    <section className="speaker-preview section-shell">
      <div className="section-heading compact">
        <p className="kicker">Voices in the room</p>
        <h2>People carrying evidence into action.</h2>
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
        render={<Link href="/speakers" />}
      >
        Meet the speakers <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </section>
  )
}

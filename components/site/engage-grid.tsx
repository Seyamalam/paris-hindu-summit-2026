"use client"

import { useQuery } from "convex/react"
import { ArrowUpRightIcon } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { ContentListSkeleton } from "@/components/site/content-list-skeleton"
import { Reveal } from "@/components/site/reveal"

export function EngageGrid() {
  const entries = useQuery(api.cms.listPublished, { category:"engage" })
  if (entries === undefined) {
    return <section className="engage-grid section-shell"><ContentListSkeleton /></section>
  }
  return <section className="engage-grid section-shell">
    {entries.map((entry,index) => <Reveal key={entry._id} delay={index * 90}><article><span>{String(index + 1).padStart(2,"0")}</span><p className="kicker">{entry.eyebrow}</p><h2>{entry.title}</h2>{(entry.summary || entry.body) && <p>{entry.summary || entry.body}</p>}{entry.linkUrl && <a href={entry.linkUrl}>{entry.linkLabel || "Explore"} <ArrowUpRightIcon /></a>}</article></Reveal>)}
  </section>
}

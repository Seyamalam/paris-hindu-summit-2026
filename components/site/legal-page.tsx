"use client"

import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"

export function LegalPage({ slug }: { slug: string }) {
  const entries = useQuery(api.cms.listPublished, { category: "legal" })
  const entry = entries?.find((item) => item.slug === slug)
  if (!entry) return <section className="legal-copy section-shell"><p>This legal page is currently unavailable.</p></section>
  return <section className="legal-copy section-shell"><p className="kicker">{entry.eyebrow}</p><h1>{entry.title}</h1><p className="legal-lead">{entry.summary}</p>{entry.body.split("\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<aside>This is a working draft and requires organiser/legal approval before public launch.</aside></section>
}

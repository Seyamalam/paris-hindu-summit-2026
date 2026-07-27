"use client"

import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { PageHero } from "@/components/site/page-hero"

export function ManagedPageHero({
  slug,
  eyebrow,
  title,
  intro,
  image,
}: {
  slug:string
  eyebrow:string
  title:string
  intro:string
  image?:string
}) {
  const entries = useQuery(api.cms.listPublished, { category:"pageCopy" })
  const page = entries?.find((entry) => entry.slug === slug)

  return (
    <PageHero
      eyebrow={page?.eyebrow || eyebrow}
      title={page?.title || title}
      intro={page?.summary || intro}
      image={image}
    />
  )
}

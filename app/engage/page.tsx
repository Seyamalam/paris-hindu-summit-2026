import type { Metadata } from "next"

import { EngageGrid } from "@/components/site/engage-grid"
import { PageHero } from "@/components/site/page-hero"

export const metadata: Metadata = { title: "Engage" }

export default function EngagePage() {
  return <><PageHero eyebrow="Ways into the work" title="Attend. Support. Carry it forward." intro="The assembly is a room, a record and a network. Choose how you want to take part before, during or after Paris." /><EngageGrid /></>
}

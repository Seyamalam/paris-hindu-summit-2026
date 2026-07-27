import type { Metadata } from "next"

import { EngageGrid } from "@/components/site/engage-grid"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = { title: "Engage" }

export default function EngagePage() {
  return <><ManagedPageHero slug="engage" eyebrow="Ways into the work" title="Attend. Support. Carry it forward." intro="The assembly is a room, a record and a network. Choose how you want to take part before, during or after Paris." /><EngageGrid /></>
}

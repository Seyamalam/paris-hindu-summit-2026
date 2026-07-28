import type { Metadata } from "next"

import { EngageGrid } from "@/components/site/engage-grid"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = { title: "Attend and Support" }

export default function EngagePage() {
  return <><ManagedPageHero slug="engage" eyebrow="Attend and support" title="There is more than one way to enter the work" intro="Register as a victim, delegate, researcher or presenter, general audience member, or accredited member of the media." /><EngageGrid /></>
}

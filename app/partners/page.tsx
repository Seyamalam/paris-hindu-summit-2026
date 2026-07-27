import type { Metadata } from "next"

import { PartnerWall } from "@/components/site/institutional-sections"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = { title: "Partners" }
export default function PartnersPage() { return <><ManagedPageHero slug="partners" eyebrow="Institutional constellation" title="Standing in the record." intro="Partners and sponsors remain visible in an ordered institutional wall—grouped by the kind of commitment they make." /><PartnerWall /></> }

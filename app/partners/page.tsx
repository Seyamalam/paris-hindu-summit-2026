import type { Metadata } from "next"

import { PartnerWall } from "@/components/site/institutional-sections"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = {
  title: "Organizer and Partners",
  description:"BHRJ leads the Paris Hindu Summit 2026 with support from its partners and sponsors.",
}

export default function PartnersPage() {
  return <>
    <ManagedPageHero
      slug="partners"
      eyebrow="Organizer and supporting network"
      title="Led by BHRJ. Strengthened by partners."
      intro="The Bureau of Human Rights and Justice is the summit's main organizer. Partners and sponsors support its programme, reach, research, and practical delivery."
    />
    <PartnerWall />
  </>
}

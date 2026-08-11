import type { Metadata } from "next"

import { PartnerWall } from "@/components/site/institutional-sections"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = {
  title: "Organizations",
  description:"BHRJ organizes the Paris Hindu Summit 2026, Interfaith Forcefield manages it, and regional organizations support it.",
}

export default function PartnersPage() {
  return <>
    <ManagedPageHero
      slug="organizations"
      eyebrow="Organization structure"
      title="Clear leadership. Shared regional purpose."
      intro="BHRJ organizes the summit, Interfaith Forcefield manages its delivery, and organizations across South Asia strengthen the work."
    />
    <PartnerWall />
  </>
}

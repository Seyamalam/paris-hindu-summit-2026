import type { Metadata } from "next"

import { DonationExperience } from "@/components/site/donation-experience"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = { title: "Donate" }

export default function DonatePage() {
  return <>
    <ManagedPageHero slug="donate" eyebrow="Stand with the summit" title="Help the evidence travel." intro="A transparent contribution pathway for documentation, participation, international advocacy and the work that continues after October." />
    <DonationExperience />
  </>
}

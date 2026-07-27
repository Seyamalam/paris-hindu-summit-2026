import type { Metadata } from "next"

import { RegionalSection } from "@/components/site/institutional-sections"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = { title: "Beyond Bangladesh" }
export default function RegionalPage() { return <><ManagedPageHero slug="regional" eyebrow="Regional forum" title="Beyond Bangladesh: a regional crisis" intro="Bangladesh is where this forum began, but South Asian Hindu minorities face the same story of shrinking numbers and unanswered violence well beyond its borders. Pakistan, Afghanistan, Myanmar and Nepal are four of the starkest examples – and four reasons this forum exists for more than one country's diaspora." /><RegionalSection showIntro={false} /></> }

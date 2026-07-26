import type { Metadata } from "next"

import { RegionalSection } from "@/components/site/institutional-sections"
import { PageHero } from "@/components/site/page-hero"

export const metadata: Metadata = { title: "Beyond Bangladesh" }
export default function RegionalPage() { return <><PageHero eyebrow="Regional forum" title="Solidarity without borders." intro="Bangladesh is the centre of this summit. The regional forum connects its evidence to shared questions of dignity, security and equal citizenship across South Asia." /><RegionalSection /></> }

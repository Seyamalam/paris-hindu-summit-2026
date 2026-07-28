import type { Metadata } from "next"

import { ManagedAdvisoryBoard } from "@/components/site/managed-forum-content"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = {
  title: "Advisory Board",
  description:
    "Meet the international advisors providing strategic guidance to the Paris Hindu Summit.",
}

export default function AdvisoryBoardPage() {
  return (
    <>
      <ManagedPageHero
        slug="advisory-board"
        eyebrow="International advisory board"
        title="Guidance with an international horizon."
        intro="Independent advisors bring experience in human rights, diplomacy, law, policy, community leadership, and international coordination to the summit’s continuing work."
      />
      <ManagedAdvisoryBoard />
    </>
  )
}

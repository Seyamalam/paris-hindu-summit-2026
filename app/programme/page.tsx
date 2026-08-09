import { ManagedPageHero } from "@/components/site/managed-page-hero"
import { ProgrammeTabs } from "@/components/site/programme-tabs"

export default function ProgrammePage() {
  return (
    <>
      <ManagedPageHero
        slug="programme"
        eyebrow="2–5 October 2026"
        title="Four days. One shared road forward."
        intro="From internal preparation and public testimony to institutional action, the Paris Declaration, and an interfaith pilgrimage of remembrance."
      />
      <section className="section-shell programme-page">
        <ProgrammeTabs />
      </section>
    </>
  )
}

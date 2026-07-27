import { ManagedPageHero } from "@/components/site/managed-page-hero"
import { ProgrammeTabs } from "@/components/site/programme-tabs"

export default function ProgrammePage() {
  return (
    <>
      <ManagedPageHero
        slug="programme"
        eyebrow="3–4 October 2026"
        title="From testimony to the Paris Declaration."
        intro="Two days structured to understand the record, engage institutions, build practical commitments, and conclude with a shared declaration and sacred pledge."
      />
      <section className="section-shell programme-page">
        <ProgrammeTabs />
      </section>
    </>
  )
}

import { ManagedPageHero } from "@/components/site/managed-page-hero"
import {
  ManagedOverview,
  PresentMoment,
} from "@/components/site/managed-forum-content"
import { ManagedText } from "@/components/site/managed-editorial"

export default function AboutPage() {
  return (
    <>
      <ManagedPageHero
        slug="about"
        eyebrow="About the summit"
        title="A standing platform, not a single event"
        intro={'A Global Forum on Religious Freedom and Hindu Minority Rights in Bangladesh convenes in Paris under the theme "Justice for Bangladeshi Hindus: Solidarity Without Borders". It is organised by an independent organising committee chaired by Dr Richard Benkin – a human rights activist, author and lecturer – together with social activists, human rights advocates, scholars, faith leaders and the global diaspora.'}
        image="/images/paris-night.png"
      />
      <ManagedOverview />
      <PresentMoment />
      <section className="outcomes section-shell">
        <div className="section-heading compact">
          <p className="kicker"><ManagedText slug="about-outcomes-heading" field="eyebrow" fallback="Expected outcomes" /></p>
          <h2><ManagedText slug="about-outcomes-heading" field="title" fallback="The goal is not a communiqué. It is a network ready to mobilise." /></h2>
        </div>
        <ol>
          {[
            "A jointly endorsed international declaration anchored in the minority-rights charter.",
            "Commitments from parliamentarians and delegates to raise the issue through formal channels.",
            "A standing international coordination network for campaigns, statements, and rapid response.",
            "Direct legal, emergency, documentation, and media support for victims and defenders.",
            "A sustained public calendar that keeps documented evidence visible after Paris.",
          ].map((fallback, index) => (
            <li key={fallback}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p><ManagedText slug={`about-outcome-${index + 1}`} field="title" fallback={fallback} /></p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

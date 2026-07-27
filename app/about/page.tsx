import { PageHero } from "@/components/site/page-hero"
import {
  ManagedOverview,
  PresentMoment,
} from "@/components/site/managed-forum-content"

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the summit"
        title="A standing platform, not a single event"
        intro={'A Global Forum on Religious Freedom and Hindu Minority Rights in Bangladesh convenes in Paris under the theme "Justice for Bangladeshi Hindus: Solidarity Without Borders". It is organised by an independent organising committee chaired by Dr Richard Benkin – a human rights activist, author and lecturer – together with social activists, human rights advocates, scholars, faith leaders and the global diaspora.'}
        image="/images/paris-night.png"
      />
      <ManagedOverview />
      <PresentMoment />
      <section className="outcomes section-shell">
        <div className="section-heading compact"><p className="kicker">Expected outcomes</p><h2>The goal is not a communiqué. It is a network ready to mobilise.</h2></div>
        <ol>
          <li><span>01</span><p>A jointly endorsed international declaration anchored in the minority-rights charter.</p></li>
          <li><span>02</span><p>Commitments from parliamentarians and delegates to raise the issue through formal channels.</p></li>
          <li><span>03</span><p>A standing international coordination network for campaigns, statements, and rapid response.</p></li>
          <li><span>04</span><p>Direct legal, emergency, documentation, and media support for victims and defenders.</p></li>
          <li><span>05</span><p>A sustained public calendar that keeps documented evidence visible after Paris.</p></li>
        </ol>
      </section>
    </>
  )
}

import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, Globe2Icon, ScaleIcon, UsersIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/site/page-hero"

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the summit"
        title="A standing platform, not a single event."
        intro="Paris brings survivors, scholars, rights defenders, diplomats, legal advocates, and diaspora organisations into one coordinated, evidence-based forum."
        image="/images/paris-night.png"
      />
      <section className="section-shell editorial-story">
        <aside><p className="kicker">Prelude and purpose</p><span>01</span></aside>
        <div>
          <h2>The promise of equal citizenship remains substantially unfulfilled.</h2>
          <p>Bangladesh’s 1971 founding ideals promised a secular republic built on equality for all citizens. Yet Hindu communities have continued to experience displacement, property loss, discrimination, and recurrent violence.</p>
          <p>The forum exists to connect those most affected with the institutions capable of acting: international bodies, governments, parliamentarians, courts, media organisations, researchers, and civil society.</p>
        </div>
      </section>
      <section className="three-pillars section-shell">
        {[
          [UsersIcon, "Center testimony", "Give survivors and community leaders dignified, direct platforms, including protective anonymity where required."],
          [ScaleIcon, "Build enforceable protection", "Convert evidence into legislation, legal remedies, diplomatic pressure, and formal human-rights mechanisms."],
          [Globe2Icon, "Coordinate across borders", "Create a durable network able to issue joint statements, activate campaigns, and respond when communities face new threats."],
        ].map(([Icon, title, text]) => {
          const PillarIcon = Icon as typeof UsersIcon
          return <article key={String(title)}><PillarIcon /><h3>{String(title)}</h3><p>{String(text)}</p></article>
        })}
      </section>
      <section className="image-story section-shell">
        <div><Image src="/images/courtyard.png" alt="Historic Bengali temple architecture" fill sizes="50vw" /></div>
        <div>
          <p className="kicker">Solidarity without borders</p>
          <h2>A shared human-rights principle—not a regional or partisan concern.</h2>
          <p>The summit places Bangladesh’s crisis within a wider South Asian and international context. It seeks a common language and shared relationships for advocates confronting targeted violence, forced displacement, property loss, and the erosion of religious freedom.</p>
          <Button nativeButton={false} variant="outline" render={<Link href="/context" />}>Explore the evidence <ArrowRightIcon data-icon="inline-end" /></Button>
        </div>
      </section>
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

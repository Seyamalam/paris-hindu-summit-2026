import { Building2Icon, Globe2Icon, MegaphoneIcon, UsersIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PageHero } from "@/components/site/page-hero"
import { committee } from "@/lib/content"

const responsibilityGroups = [
  [Globe2Icon, "International coordination", "Guest invitations, dignitary relations, speaker selection, international networking, and institutional partnerships."],
  [Building2Icon, "Operations and logistics", "Venue coordination, delegate communication, visas, local administration, budget, travel, and participant support."],
  [MegaphoneIcon, "Documentation and public work", "Official communications, the summit website, documentary production, outreach, media materials, and cultural initiatives."],
  [UsersIcon, "Regional participation", "Cross-border coordination with organisations and delegates from Bangladesh, India, Nepal, Afghanistan, Europe, and North America."],
]

export default function CommitteePage() {
  return (
    <>
      <PageHero
        eyebrow="Organising committee"
        title="Responsibility has a name."
        intro="The committee brings together international advocacy, local operations, cultural work, digital communications, participant coordination, and fundraising."
      />
      <section className="responsibilities section-shell">
        {responsibilityGroups.map(([Icon, title, text]) => {
          const ResponsibilityIcon = Icon as typeof Globe2Icon
          return <article key={String(title)}><ResponsibilityIcon /><h3>{String(title)}</h3><p>{String(text)}</p></article>
        })}
      </section>
      <section className="committee-roster section-shell">
        <div className="section-heading compact"><p className="kicker">Committee roster</p><h2>Working across borders, disciplines, and responsibilities.</h2></div>
        <div className="roster-grid">
          {committee.map(([name, role], index) => (
            <article key={name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <Badge variant="outline">{role}</Badge>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

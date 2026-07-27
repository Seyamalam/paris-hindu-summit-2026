import { Building2Icon, Globe2Icon, MegaphoneIcon, UsersIcon } from "lucide-react"

import { ManagedCommittee } from "@/components/site/managed-forum-content"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

const responsibilityGroups = [
  [Globe2Icon, "International coordination", "Guest invitations, dignitary relations, speaker selection, international networking, and institutional partnerships."],
  [Building2Icon, "Operations and logistics", "Venue coordination, delegate communication, visas, local administration, budget, travel, and participant support."],
  [MegaphoneIcon, "Documentation and public work", "Official communications, the summit website, documentary production, outreach, media materials, and cultural initiatives."],
  [UsersIcon, "Regional participation", "Cross-border coordination with organisations and delegates from Bangladesh, India, Nepal, Afghanistan, Europe, and North America."],
]

export default function CommitteePage() {
  return (
    <>
      <ManagedPageHero
        slug="committee"
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
      <ManagedCommittee />
    </>
  )
}

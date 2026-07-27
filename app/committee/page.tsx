import { Building2Icon, Globe2Icon, MegaphoneIcon, UsersIcon } from "lucide-react"

import { ManagedText } from "@/components/site/managed-editorial"
import { ManagedCommittee } from "@/components/site/managed-forum-content"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

const responsibilityGroups = [
  [Globe2Icon, "committee-responsibility-international-coordination", "International coordination", "Guest invitations, dignitary relations, speaker selection, international networking, and institutional partnerships."],
  [Building2Icon, "committee-responsibility-operations-logistics", "Operations and logistics", "Venue coordination, delegate communication, visas, local administration, budget, travel, and participant support."],
  [MegaphoneIcon, "committee-responsibility-documentation-public-work", "Documentation and public work", "Official communications, the summit website, documentary production, outreach, media materials, and cultural initiatives."],
  [UsersIcon, "committee-responsibility-regional-participation", "Regional participation", "Cross-border coordination with organisations and delegates from Bangladesh, India, Nepal, Afghanistan, Europe, and North America."],
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
        {responsibilityGroups.map(([Icon, slug, title, text]) => {
          const ResponsibilityIcon = Icon as typeof Globe2Icon
          return <article key={String(slug)}><ResponsibilityIcon /><h3><ManagedText slug={String(slug)} field="title" fallback={String(title)} /></h3><p><ManagedText slug={String(slug)} field="summary" fallback={String(text)} /></p></article>
        })}
      </section>
      <ManagedCommittee />
    </>
  )
}

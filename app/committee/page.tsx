import { ManagedCommittee } from "@/components/site/managed-forum-content"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export default function CommitteePage() {
  return (
    <>
      <ManagedPageHero
        slug="committee"
        eyebrow="Organising committee"
        title="Responsibility has a name."
        intro="The committee brings together international advocacy, local operations, cultural work, digital communications, participant coordination, and fundraising."
      />
      <ManagedCommittee />
    </>
  )
}

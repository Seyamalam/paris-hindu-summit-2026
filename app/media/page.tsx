import type { Metadata } from "next"

import { MediaPublications } from "@/components/site/media-publications"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = { title: "Media & Publication" }

export default function MediaPage() {
  return (
    <>
      <ManagedPageHero
        slug="media"
        eyebrow="Media & Publication"
        title="The public record must travel."
        intro="Research, reports, interviews, releases, documentary work, and media resources designed to keep verified evidence visible before, during, and after Paris."
        image="/images/archive-table.png"
      />
      <MediaPublications />
    </>
  )
}

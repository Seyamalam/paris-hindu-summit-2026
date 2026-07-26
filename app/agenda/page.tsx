import type { Metadata } from "next"

import { CmsDocumentPage } from "@/components/site/managed-forum-content"

export const metadata: Metadata = { title: "Proposed agenda" }

export default function AgendaPage() {
  return (
    <CmsDocumentPage
      category="agenda"
      eyebrow="Working document · Paris 2026"
      title="Proposed Agenda"
      intro="Seventeen connected areas for protection, evidence, justice, international cooperation, and a sustainable future for Hindus in Bangladesh."
    />
  )
}


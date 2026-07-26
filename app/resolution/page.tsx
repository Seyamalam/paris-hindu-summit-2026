import type { Metadata } from "next"

import { CmsDocumentPage } from "@/components/site/managed-forum-content"

export const metadata: Metadata = { title: "Paris Resolution 2026" }

export default function ResolutionPage() {
  return (
    <CmsDocumentPage
      category="resolution"
      eyebrow="Principal outcome document"
      title="Paris Resolution — 2026"
      intro="A rights-based framework for protection, justice, community resilience, international cooperation, and accountable long-term action."
    />
  )
}


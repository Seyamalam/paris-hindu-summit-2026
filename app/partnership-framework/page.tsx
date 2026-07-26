import type { Metadata } from "next"

import { CmsDocumentPage } from "@/components/site/managed-forum-content"

export const metadata: Metadata = {
  title: "International Partnership Framework",
}

export default function PartnershipFrameworkPage() {
  return (
    <CmsDocumentPage
      category="partnership"
      eyebrow="Strategic cooperation"
      title="International Partnership Framework"
      intro="A practical cooperation map spanning multilateral institutions, governments, civil society, universities, human-rights organisations, and development partners."
    />
  )
}


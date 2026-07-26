import type { Metadata } from "next"

import { CmsDocumentPage } from "@/components/site/managed-forum-content"

export const metadata: Metadata = { title: "Five-Year Strategic Action Plan" }

export default function StrategyPage() {
  return (
    <CmsDocumentPage
      category="strategy"
      eyebrow="2027–2031"
      title="Five-Year Strategic Action Plan"
      intro="Eight strategic goals linking early warning, legal protection, research, livelihoods, leadership, humanitarian recovery, and institutional sustainability."
    />
  )
}


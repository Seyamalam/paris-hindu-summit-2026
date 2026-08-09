import type { Metadata } from "next"

import { ForumPackageCatalog } from "@/components/site/forum-package-catalog"

export const metadata:Metadata = { title:"Partnership & Sponsorship", description:"Explore partnership and sponsorship opportunities for the Paris Hindu Summit 2026." }

export default function PartnershipSponsorshipPage() {
  return <ForumPackageCatalog catalogue="sponsorship" />
}

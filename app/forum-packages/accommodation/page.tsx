import type { Metadata } from "next"

import { ForumPackageCatalog } from "@/components/site/forum-package-catalog"

export const metadata:Metadata = { title:"Accommodation Packages", description:"Compare four-night accommodation packages for the Paris Hindu Summit 2026." }

export default function AccommodationPackagesPage() {
  return <ForumPackageCatalog catalogue="accommodation" />
}

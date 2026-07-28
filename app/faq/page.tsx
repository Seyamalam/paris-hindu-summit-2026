import type { Metadata } from "next"

import { FaqList } from "@/components/site/faq-list"
import { ManagedPageHero } from "@/components/site/managed-page-hero"

export const metadata: Metadata = { title: "Frequently asked questions" }

export default function FaqPage() {
  return (
    <>
      <ManagedPageHero
        slug="faq"
        eyebrow="Frequently asked questions"
        title="Practical answers before Paris."
        intro="Attendance, access, languages, programme information, media arrangements, and other practical details."
      />
      <FaqList />
    </>
  )
}

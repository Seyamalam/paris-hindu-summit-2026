import type { Metadata } from "next"
import { LegalPage } from "@/components/site/legal-page"
export const metadata: Metadata = { title: "Privacy notice" }
export default function PrivacyPage() { return <LegalPage slug="privacy" /> }

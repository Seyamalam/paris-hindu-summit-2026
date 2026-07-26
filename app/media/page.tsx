import Image from "next/image"
import { ArrowUpRightIcon, BookOpenIcon, FileTextIcon, NewspaperIcon, PlayIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHero } from "@/components/site/page-hero"

const resources = [
  [FileTextIcon, "Research brief", "Citizenship, demographic change, and documented incidents", "A production source pack will consolidate approved evidence, methodology, and primary links."],
  [BookOpenIcon, "Publication", "A Quiet Case of Ethnic Cleansing", "Dr. Richard Benkin’s book documents anti-Hindu atrocities, government complicity, and international silence."],
  [NewspaperIcon, "Media backgrounder", "Reporting the summit responsibly", "Context, names, pronunciation, safeguarding guidance, and interview routes for accredited media."],
]

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media and publications"
        title="The public record must travel."
        intro="Research, reports, interviews, releases, documentary work, and media resources designed to keep verified evidence visible before, during, and after Paris."
        image="/images/archive-table.png"
      />
      <section className="resource-grid section-shell">
        {resources.map(([Icon, type, title, description]) => {
          const ResourceIcon = Icon as typeof FileTextIcon
          return (
            <Card key={String(title)} className="resource-card">
              <CardHeader><ResourceIcon /><Badge variant="outline">{String(type)}</Badge><CardTitle>{String(title)}</CardTitle><CardDescription>{String(description)}</CardDescription></CardHeader>
              <CardContent><p>Publication details and approved destination links will be added as the editorial and source-verification process is completed.</p></CardContent>
              <CardFooter><Button variant="link">View resource <ArrowUpRightIcon data-icon="inline-end" /></Button></CardFooter>
            </Card>
          )
        })}
      </section>
      <section className="film-section section-shell" id="film">
        <div className="film-image"><Image src="/images/testimony-stage.png" alt="An empty witness chair and microphone" fill sizes="55vw" /></div>
        <div>
          <p className="kicker">Opening film · In production</p>
          <h2>When the witness chair is no longer empty.</h2>
          <p>The cultural and documentation team is developing a short film to introduce the summit’s human record with dignity, verification, and appropriate safeguarding.</p>
          <Button variant="outline" disabled><PlayIcon data-icon="inline-start" /> Film coming soon</Button>
        </div>
      </section>
      <section className="newsroom section-shell">
        <div className="section-heading compact"><p className="kicker">Media centre</p><h2>Releases, updates, coverage, and interviews.</h2></div>
        <div>
          {["Paris summit confirms 3–4 October programme", "Speaker and delegate nominations under review", "Media accreditation opens for international desks", "Paris Declaration drafting framework announced"].map((title, index) => (
            <article key={title}><span>Update · 0{index + 1}</span><h3>{title}</h3><Button variant="link">Read update <ArrowUpRightIcon data-icon="inline-end" /></Button></article>
          ))}
        </div>
      </section>
    </>
  )
}

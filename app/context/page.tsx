import Image from "next/image"
import { BookOpenIcon, LandmarkIcon, ShieldAlertIcon } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHero } from "@/components/site/page-hero"
import { charter, evidence } from "@/lib/content"

export default function ContextPage() {
  return (
    <>
      <PageHero
        eyebrow="Understanding the context"
        title="History, evidence, and the right to belong."
        intro="A concise public record of demographic decline, constitutional contradiction, documented violence, property loss, and the continuing struggle for equal citizenship."
        image="/images/archive-table.png"
      />
      <section className="evidence-band light">
        <div className="evidence-grid">{evidence.map((item) => <article key={item.value}><b>{item.value}</b><p>{item.label}</p></article>)}</div>
        <p className="source-note">Figures are drawn from the supplied concept note and cited organisations. Production publication requires final source verification and links.</p>
      </section>
      <section className="context-chapters section-shell">
        {[
          [BookOpenIcon, "1947–1971", "From partition to independence", "Partition, outward migration, dispossession, and the changing place of religious minorities in East Pakistan shaped the conditions inherited by independent Bangladesh."],
          [LandmarkIcon, "1972–present", "Constitutional contradiction", "The 1972 Constitution enshrined secularism. Later amendments removed and then restored it while retaining Islam as the state religion—an unresolved tension between equality on paper and lived citizenship."],
          [ShieldAlertIcon, "Documented record", "Violence and protection failures", "Minority organisations and international monitors document killings, arson, looting, attacks on homes and places of worship, sexual violence, land grabbing, intimidation, and blasphemy-related persecution."],
        ].map(([Icon, label, title, text]) => {
          const ChapterIcon = Icon as typeof BookOpenIcon
          return <article key={String(title)}><ChapterIcon /><p className="kicker">{String(label)}</p><h2>{String(title)}</h2><p>{String(text)}</p></article>
        })}
      </section>
      <section className="section-shell charter-section">
        <div className="section-heading">
          <p className="kicker">The seven-point charter</p>
          <h2>Goodwill is not a substitute for law.</h2>
          <p>Longstanding demands from minority-rights organisations call for enforceable protection, investigation, restitution, and equal access to public life.</p>
        </div>
        <Accordion defaultValue={["item-0"]} className="charter-accordion">
          {charter.map((item, index) => (
            <AccordionItem key={item} value={`item-${index}`}>
              <AccordionTrigger><span>{String(index + 1).padStart(2, "0")}</span>{item}</AccordionTrigger>
              <AccordionContent>Paris will examine the legal, institutional, documentation, and international-coordination steps required to move this demand from advocacy into enforceable practice.</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <section className="image-band">
        <Image src="/images/river-delta.png" alt="Aerial view of Bangladesh river systems and settlements" fill sizes="100vw" />
        <div><p className="kicker">The living record</p><h2>Behind every data point is a family deciding whether it can stay.</h2></div>
      </section>
    </>
  )
}

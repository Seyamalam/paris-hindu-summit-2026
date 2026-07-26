"use client"

import { useQuery } from "convex/react"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { api } from "@/convex/_generated/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/site/page-hero"
import { Reveal } from "@/components/site/reveal"
import { committee as fallbackCommittee } from "@/lib/content"

type DocumentCategory =
  | "agenda"
  | "resolution"
  | "strategy"
  | "partnership"

export function ManagedOverview() {
  const entries = useQuery(api.cms.listPublished, { category: "overview" })
  if (!entries?.length) return null
  return (
    <section className="managed-overview section-shell">
      {entries.map((entry, index) => (
        <Reveal key={entry._id} delay={index * 80}>
          <article>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="kicker">{entry.eyebrow}</p>
              <h2>{entry.title}</h2>
              <p>{entry.summary}</p>
              <p>{entry.body}</p>
              {entry.secondaryText && <aside>{entry.secondaryText}</aside>}
            </div>
          </article>
        </Reveal>
      ))}
    </section>
  )
}

export function ManagedCommittee() {
  const advisors = useQuery(api.cms.listPublished, { category: "advisory" })
  const managedTeam = useQuery(api.cms.listPublished, { category: "team" })
  const team =
    managedTeam && managedTeam.length > 0
      ? managedTeam
      : fallbackCommittee.map(([name, role], index) => ({
          _id: name,
          title: name,
          role,
          summary: "",
          body: "",
          order: index + 1,
        }))

  return (
    <>
      <section className="committee-roster section-shell" id="advisory">
        <div className="section-heading compact">
          <p className="kicker">Strategic guidance</p>
          <h2>Advisory Board</h2>
          <p>
            International outreach, partnerships, fundraising, and regional
            coordination carried by named advisors.
          </p>
        </div>
        <div className="advisor-grid">
          {advisors?.map((person, index) => (
            <Reveal key={person._id} delay={index * 70}>
              <article>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p className="kicker">{person.role}</p>
                <h3>{person.title}</h3>
                <p>{person.body || person.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="committee-roster section-shell" id="organising-team">
        <div className="section-heading compact">
          <p className="kicker">Organising Committee</p>
          <h2>Working across borders, disciplines, and responsibilities.</h2>
        </div>
        <div className="roster-grid managed-roster">
          {team.map((person, index) => (
            <article key={person._id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{person.title}</h3>
                <Badge variant="outline">{person.role}</Badge>
                {(person.body || person.summary) && (
                  <p>{person.body || person.summary}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export function CmsDocumentPage({
  category,
  eyebrow,
  title,
  intro,
}: {
  category:DocumentCategory
  eyebrow:string
  title:string
  intro:string
}) {
  const entries = useQuery(api.cms.listPublished, { category })
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="document-collection section-shell">
        <header>
          <p className="kicker">{entries?.length ?? 0} published sections</p>
          <p>
            This working document is managed in the protected Admin content
            editor. Published changes appear here immediately.
          </p>
        </header>
        <div>
          {entries?.map((entry, index) => (
            <Reveal key={entry._id} delay={(index % 4) * 60}>
              <article id={entry.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="kicker">{entry.eyebrow}</p>
                  <h2>{entry.title}</h2>
                  <p className="document-summary">{entry.summary}</p>
                  {entry.body && <p>{entry.body}</p>}
                  {entry.secondaryText && <aside>{entry.secondaryText}</aside>}
                  {entry.linkUrl && (
                    <Button
                      nativeButton={false}
                      variant="link"
                      render={<Link href={entry.linkUrl} />}
                    >
                      {entry.linkLabel || "Read more"}{" "}
                      <ArrowRightIcon data-icon="inline-end" />
                    </Button>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}


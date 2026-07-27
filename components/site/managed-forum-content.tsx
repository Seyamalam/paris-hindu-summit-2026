"use client"

import Image from "next/image"
import { useQuery } from "convex/react"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { api } from "@/convex/_generated/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/site/page-hero"
import { Reveal } from "@/components/site/reveal"
import { committee as fallbackCommittee } from "@/lib/content"
import { speakers as fallbackSpeakers } from "@/lib/content"

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
                {person.imageUrl && (
                  <div className="committee-portrait">
                    <Image
                      src={person.imageUrl}
                      alt={person.title}
                      fill
                      sizes="(max-width: 720px) 100vw, 45vw"
                    />
                  </div>
                )}
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
              {"imageUrl" in person && person.imageUrl && (
                <div className="committee-portrait">
                  <Image
                    src={person.imageUrl}
                    alt={person.title}
                    fill
                    sizes="(max-width: 720px) 100vw, 30vw"
                  />
                </div>
              )}
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

export function ManagedSpeakers() {
  const managed = useQuery(api.cms.listPublished, { category: "speaker" })
  const speakers =
    managed && managed.length > 0
      ? managed.map((speaker) => ({
          key: speaker._id,
          name: speaker.title,
          intro: speaker.role || speaker.summary,
          country: speaker.country,
          bio: speaker.body || speaker.summary,
          image: speaker.imageUrl,
        }))
      : fallbackSpeakers.map((speaker) => ({
          key: speaker.name,
          name: speaker.name,
          intro: speaker.role,
          country: speaker.country,
          bio: speaker.bio,
          image: speaker.image,
        }))

  return (
    <section className="speaker-list section-shell">
      {speakers.map((speaker, index) => (
        <article key={speaker.key}>
          <span className="speaker-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="speaker-portrait">
            {speaker.image ? (
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                sizes="(max-width: 720px) 100vw, 32vw"
              />
            ) : (
              <span aria-hidden="true">{speaker.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="kicker">{speaker.country || "Paris 2026"}</p>
            <h2>{speaker.name}</h2>
            <h3>{speaker.intro}</h3>
            <p>{speaker.bio}</p>
          </div>
        </article>
      ))}
    </section>
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
  const records = entries ?? []
  const strategyVision = category === "strategy"
    ? records.find((entry) => entry.parentSlug === "vision")
    : undefined
  const strategyTimeline = category === "strategy"
    ? records.filter((entry) => entry.parentSlug === "timeline")
    : []
  const mainRecords = category === "strategy"
    ? records.filter((entry) => !["vision", "timeline"].includes(entry.parentSlug))
    : records

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      {strategyVision && (
        <section className="strategy-vision section-shell">
          <p className="kicker">{strategyVision.eyebrow || "Vision"}</p>
          <h2>{strategyVision.title}</h2>
          <p>{strategyVision.body || strategyVision.summary}</p>
        </section>
      )}
      <section className="document-collection section-shell">
        <header>
          <p className="kicker">{mainRecords.length} published sections</p>
          <p>
            This working document is managed in the protected page editor.
            Published changes appear here immediately.
          </p>
        </header>
        <div className={category === "partnership" ? "partnership-document-grid" : undefined}>
          {mainRecords.map((entry, index) => (
            <Reveal key={entry._id} delay={(index % 4) * 60}>
              <article id={entry.slug} data-document-category={category}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="kicker">{entry.eyebrow}</p>
                  <h2>{entry.title}</h2>
                  {entry.summary && (category === "resolution" || entry.summary !== entry.body) && (
                    <p className="document-summary">{entry.summary}</p>
                  )}
                  {entry.body && category !== "resolution" && (
                    <div className="document-labelled-copy">
                      <small>
                        {category === "agenda"
                          ? "Discussion points"
                          : category === "strategy"
                            ? "Key actions"
                            : category === "partnership"
                              ? "Area of cooperation"
                              : "Details"}
                      </small>
                      <p>{entry.body}</p>
                    </div>
                  )}
                  {entry.secondaryText && !["resolution", "strategy"].includes(category) && (
                    <aside>{entry.secondaryText}</aside>
                  )}
                  {entry.secondaryText && category === "strategy" && (
                    <aside>
                      <small>Expected outcomes</small>
                      {entry.secondaryText}
                    </aside>
                  )}
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
      {category === "resolution" && records.some((entry) => entry.secondaryText) && (
        <section className="resolution-outcomes section-shell">
          <p className="kicker">After the resolutions</p>
          <h2>Expected outcomes</h2>
          <div>
            {records.filter((entry) => entry.secondaryText).map((entry) => (
              <article key={entry._id}>
                <span>{entry.eyebrow}</span>
                <p>{entry.secondaryText}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      {category === "strategy" && strategyTimeline.length > 0 && (
        <section className="strategy-timeline section-shell">
          <header>
            <p className="kicker">Five-year delivery</p>
            <h2>Implementation Timeline</h2>
          </header>
          <div>
            {strategyTimeline.map((entry) => (
              <article key={entry._id}>
                <span>{entry.dateLabel}</span>
                <h3>{entry.title}</h3>
                <p>{entry.body || entry.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

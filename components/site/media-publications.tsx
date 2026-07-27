"use client"

import Image from "next/image"
import { useQuery } from "convex/react"
import { ArrowDownToLineIcon, BookOpenIcon } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"

export function MediaPublications() {
  const sections = useQuery(api.media.listPublished)

  if (sections === undefined) {
    return (
      <section className="publication-library section-shell" aria-busy="true">
        <p className="kicker">Loading the public archive</p>
      </section>
    )
  }

  if (sections.length === 0) {
    return (
      <section className="publication-library section-shell">
        <div className="publication-empty">
          <BookOpenIcon />
          <p className="kicker">Editorial archive</p>
          <h2>Publications are being prepared.</h2>
          <p>
            Books, government reports, research papers, and media resources will
            appear here as soon as the editorial team publishes them.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="publication-library section-shell">
      {sections.map((section, sectionIndex) => (
        <section className="publication-section" id={section.slug} key={section._id}>
          <header>
            <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
            <div>
              <p className="kicker">Media &amp; Publication</p>
              <h2>{section.name}</h2>
              {section.description && <p>{section.description}</p>}
            </div>
          </header>
          {section.items.length > 0 ? (
            <div className="publication-grid">
              {section.items.map((item) => (
                <article key={item._id}>
                  <div className="publication-cover">
                    {item.coverUrl ? (
                      <Image
                        src={item.coverUrl}
                        alt=""
                        fill
                        sizes="(max-width: 720px) 100vw, 30vw"
                      />
                    ) : (
                      <BookOpenIcon aria-hidden="true" />
                    )}
                  </div>
                  <div className="publication-copy">
                    <p className="kicker">{item.fileName}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.fileUrl && (
                      <Button
                        nativeButton={false}
                        variant="outline"
                        render={
                          <a href={item.fileUrl} target="_blank" rel="noreferrer" />
                        }
                      >
                        Open file <ArrowDownToLineIcon data-icon="inline-end" />
                      </Button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="publication-section-empty">
              No publications have been released in this section yet.
            </p>
          )}
        </section>
      ))}
    </section>
  )
}

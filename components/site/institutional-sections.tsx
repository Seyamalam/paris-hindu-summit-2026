"use client"

import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { useEditorialRecord } from "@/components/site/managed-editorial"

export function PartnerWall() {
  const liveOrganizations = useQuery(api.content.listOrganizations)
  const organizations = (liveOrganizations ?? []).filter(
    (organization) =>
      !organization.name.toLowerCase().includes("bureau of human rights and justice")
  )
  const organizer = useEditorialRecord("main-organizer", {
    eyebrow:"Main organizer",
    title:"Bureau of Human Rights and Justice",
    summary:"BHRJ leads the Paris Hindu Summit 2026. The organization supports people in vulnerable regions through humanitarian relief, sustainable agriculture, and partnerships built around dignity and long-term resilience.",
    linkLabel:"Visit BHRJ",
    linkUrl:"https://www.bhrj.org/",
  })
  const heading = useEditorialRecord("partners-heading", {
    eyebrow:"Supporting partners & sponsors",
    title:"Institutions strengthening the summit.",
    summary:"Under BHRJ's leadership, supporting organisations contribute policy reach, research, community networks, access, and practical support.",
  })
  const organizerUrl = organizer.linkUrl || "https://www.bhrj.org/"

  return (
    <section className="partner-wall section-shell" id="partners">
      <article className="main-organizer-card">
        <div className="main-organizer-copy">
          <p className="kicker">{organizer.eyebrow}</p>
          <span>Lead institution</span>
          <h2>{organizer.title}</h2>
          <p>{organizer.summary}</p>
          <a href={organizerUrl} target="_blank" rel="noreferrer">
            {organizer.linkLabel || "Visit BHRJ"}
            <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </div>
        <div className="main-organizer-mark" aria-hidden="true">
          <span>BHRJ</span>
          <small>Paris Hindu Summit 2026</small>
        </div>
      </article>
      <div className="section-heading">
        <p className="kicker">Supporting partners & sponsors</p>
        <div>
          <h2>{heading.title}</h2>
          <p>{heading.summary}</p>
        </div>
      </div>
      <div className="partner-grid">
        {organizations.map((organization) => (
          <article
            key={organization._id}
            className={`partner-card partner-${organization.tier}`}
          >
            <div className="partner-card-meta">
              <span>{organization.kind}</span>
              <small>{organization.tier}</small>
            </div>
            <div className="partner-identity">
              {organization.logoUrl && (
                <div className="partner-logo-frame">
                  <Image
                    src={organization.logoUrl}
                    alt={`${organization.name} logo`}
                    width={120}
                    height={60}
                    sizes="120px"
                  />
                </div>
              )}
              <b>{organization.name}</b>
            </div>
            <p>{organization.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function RegionalSection({ showIntro = true }: { showIntro?: boolean }) {
  const liveCountries = useQuery(api.content.listRegionalCountries)
  const countries = liveCountries ?? []
  const heading = useEditorialRecord("regional-heading", {
    eyebrow:"Beyond Bangladesh · regional forum",
    title:"Beyond Bangladesh: a regional crisis",
    summary:"Bangladesh is where this forum began, but South Asian Hindu minorities face the same story of shrinking numbers and unanswered violence well beyond its borders. Pakistan, Afghanistan, Nepal, and Myanmar are four of the starkest examples—and four reasons this forum exists for more than one country's diaspora.",
  })

  return (
    <section className="regional-section" id="beyond-bangladesh">
      {showIntro && (
        <div className="regional-intro section-shell">
          <p className="kicker">{heading.eyebrow}</p>
          <h2>{heading.title}</h2>
          <p>{heading.summary}</p>
        </div>
      )}
      <div className="regional-grid">
        {countries.map((country, index) => (
          <article key={country._id}>
            <div className="regional-card-top">
              <span>{country.code}</span>
              <small>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(countries.length).padStart(2, "0")}
              </small>
            </div>
            <p className="kicker">{country.eyebrow}</p>
            <h3>{country.name}</h3>
            <h4>{country.headline}</h4>
            <p>{country.summary}</p>
            <details>
              <summary>
                Read the regional focus <ArrowUpRightIcon />
              </summary>
              <p>{country.detail}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  )
}

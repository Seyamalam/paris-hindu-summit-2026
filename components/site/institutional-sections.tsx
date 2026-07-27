"use client"

import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { useEditorialRecord } from "@/components/site/managed-editorial"

export function PartnerWall() {
  const liveOrganizations = useQuery(api.content.listOrganizations)
  const organizations = liveOrganizations ?? []
  const heading = useEditorialRecord("partners-heading", {
    eyebrow:"Partners & sponsors",
    title:"Institutions standing in the record.",
    summary:"Organisations contributing policy reach, research, community networks, access, and practical support remain visible together.",
  })

  return (
    <section className="partner-wall section-shell" id="partners">
      <div className="section-heading">
        <p className="kicker">{heading.eyebrow}</p>
        <div>
          <h2>{heading.title}</h2>
          <p>{heading.summary}</p>
        </div>
      </div>
      <div className="partner-grid">
        {organizations.map((organization, index) => (
          <article
            key={organization.slug}
            className={`partner-card partner-${organization.tier}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div className="partner-identity">
              {organization.logoUrl && (
                <Image
                  src={organization.logoUrl}
                  alt={`${organization.name} logo`}
                  width={180}
                  height={80}
                />
              )}
              <b>{organization.name}</b>
            </div>
            <p>{organization.description}</p>
            <small>
              {organization.kind} · {organization.tier}
            </small>
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
    title:"Solidarity without borders means listening across them.",
    summary:"Pakistan, Afghanistan, Myanmar, and Nepal form the starting regional group—a shared record of citizenship, security, heritage, displacement, and the right to remain.",
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
          <article key={country.slug}>
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

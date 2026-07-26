"use client"

import Image from "next/image"
import { ArrowUpRightIcon } from "lucide-react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { partnerFallback, regionalFallback } from "@/lib/content"

export function PartnerWall() {
  const liveOrganizations = useQuery(api.content.listOrganizations)
  const organizations = liveOrganizations ?? partnerFallback

  return (
    <section className="partner-wall section-shell" id="partners">
      <div className="section-heading">
        <p className="kicker">Partners &amp; sponsors</p>
        <div>
          <h2>Institutions standing in the record.</h2>
          <p>
            A permanent, tiered wall keeps every partner visible. Confirmed
            organisations, logos, tiers, links, and display order will be
            managed from the admin panel.
          </p>
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
              {organization.logoUrl ? (
                <Image
                  src={organization.logoUrl}
                  alt={`${organization.name} logo`}
                  width={180}
                  height={80}
                />
              ) : (
                <b>{organization.name}</b>
              )}
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

export function RegionalSection() {
  const liveCountries = useQuery(api.content.listRegionalCountries)
  const countries = liveCountries ?? regionalFallback

  return (
    <section className="regional-section" id="beyond-bangladesh">
      <div className="regional-intro section-shell">
        <p className="kicker">Beyond Bangladesh · regional forum</p>
        <h2>Solidarity without borders means listening across them.</h2>
        <p>
          Pakistan, Afghanistan, Myanmar, and now Nepal form the starting
          regional group. Organisers can add, edit, reorder, draft, or publish
          further countries through the admin panel without a code deployment.
        </p>
      </div>
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

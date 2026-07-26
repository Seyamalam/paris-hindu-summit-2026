import { v } from "convex/values"

import { internalMutation } from "./_generated/server"

const regionalCountries = [
  {
    slug: "pakistan",
    name: "Pakistan",
    code: "PK",
    eyebrow: "Minority protection",
    headline: "Equal citizenship must be enforceable.",
    summary:
      "A regional dialogue on safeguarding worship, representation, personal security, and equal access to public life.",
    detail:
      "The forum connects documented experience with practical protections, accountable institutions, and sustained international attention.",
    order: 1,
  },
  {
    slug: "afghanistan",
    name: "Afghanistan",
    code: "AF",
    eyebrow: "Community continuity",
    headline: "Historic communities must not disappear unseen.",
    summary:
      "Documentation, cultural continuity, safe passage, and the protection of displaced Hindu and Sikh families remain urgent concerns.",
    detail:
      "The regional programme creates space for evidence, heritage protection, and cooperation with communities living in displacement.",
    order: 2,
  },
  {
    slug: "myanmar",
    name: "Myanmar",
    code: "MM",
    eyebrow: "Freedom and belonging",
    headline: "Rights do not stop at a border.",
    summary:
      "The conversation examines citizenship, displacement, religious freedom, and the security of vulnerable communities.",
    detail:
      "Regional specialists will connect local testimony to international standards and durable protection mechanisms.",
    order: 3,
  },
  {
    slug: "nepal",
    name: "Nepal",
    code: "NP",
    eyebrow: "Regional cooperation",
    headline: "Shared heritage can support shared responsibility.",
    summary:
      "Nepal joins the regional section through dialogue on constitutional secularism, equal citizenship, heritage, and cross-border cooperation.",
    detail:
      "Its inclusion broadens Beyond Bangladesh into a platform where South Asian institutions can exchange practical lessons and commitments.",
    order: 4,
  },
] as const

const organizations = [
  {
    slug: "institutional-partners",
    name: "Institutional partners",
    kind: "partner" as const,
    tier: "strategic" as const,
    description: "Host, policy, and international cooperation organisations.",
    order: 1,
  },
  {
    slug: "research-network",
    name: "Research & evidence network",
    kind: "partner" as const,
    tier: "knowledge" as const,
    description:
      "Researchers, archives, legal experts, and documentation partners.",
    order: 2,
  },
  {
    slug: "diaspora-organisations",
    name: "Diaspora organisations",
    kind: "partner" as const,
    tier: "community" as const,
    description:
      "Community organisations carrying the summit into local action.",
    order: 3,
  },
  {
    slug: "summit-supporters",
    name: "Summit supporters",
    kind: "sponsor" as const,
    tier: "supporting" as const,
    description:
      "Organisations supporting access, translation, travel, and production.",
    order: 4,
  },
] as const

export const seedInitialContent = internalMutation({
  args: {},
  returns: v.object({
    countriesInserted: v.number(),
    countriesUpdated: v.number(),
    organizationsInserted: v.number(),
    organizationsUpdated: v.number(),
  }),
  handler: async (ctx) => {
    const now = Date.now()
    let countriesInserted = 0
    let countriesUpdated = 0
    let organizationsInserted = 0
    let organizationsUpdated = 0

    for (const country of regionalCountries) {
      const existing = await ctx.db
        .query("regionalCountries")
        .withIndex("by_slug", (q) => q.eq("slug", country.slug))
        .unique()
      const value = { ...country, status: "published" as const, updatedAt: now }

      if (existing) {
        await ctx.db.patch(existing._id, value)
        countriesUpdated += 1
      } else {
        await ctx.db.insert("regionalCountries", value)
        countriesInserted += 1
      }
    }

    for (const organization of organizations) {
      const existing = await ctx.db
        .query("organizations")
        .withIndex("by_slug", (q) => q.eq("slug", organization.slug))
        .unique()
      const value = {
        ...organization,
        status: "published" as const,
        updatedAt: now,
      }

      if (existing) {
        await ctx.db.patch(existing._id, value)
        organizationsUpdated += 1
      } else {
        await ctx.db.insert("organizations", value)
        organizationsInserted += 1
      }
    }

    return {
      countriesInserted,
      countriesUpdated,
      organizationsInserted,
      organizationsUpdated,
    }
  },
})

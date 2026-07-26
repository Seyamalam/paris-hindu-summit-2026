import { v } from "convex/values"

import { query } from "./_generated/server"

const regionalCountry = v.object({
  _id: v.id("regionalCountries"),
  slug: v.string(),
  name: v.string(),
  code: v.string(),
  eyebrow: v.string(),
  headline: v.string(),
  summary: v.string(),
  detail: v.string(),
  sourceUrl: v.union(v.string(), v.null()),
  imageUrl: v.union(v.string(), v.null()),
  order: v.number(),
})

const organization = v.object({
  _id: v.id("organizations"),
  slug: v.string(),
  name: v.string(),
  kind: v.union(v.literal("partner"), v.literal("sponsor")),
  tier: v.union(
    v.literal("strategic"),
    v.literal("knowledge"),
    v.literal("community"),
    v.literal("supporting")
  ),
  description: v.string(),
  websiteUrl: v.union(v.string(), v.null()),
  logoUrl: v.union(v.string(), v.null()),
  order: v.number(),
})

export const listRegionalCountries = query({
  args: {},
  returns: v.array(regionalCountry),
  handler: async (ctx) => {
    const countries = await ctx.db
      .query("regionalCountries")
      .withIndex("by_status_and_order", (q) => q.eq("status", "published"))
      .take(24)

    return Promise.all(
      countries.map(async (country) => ({
        _id: country._id,
        slug: country.slug,
        name: country.name,
        code: country.code,
        eyebrow: country.eyebrow,
        headline: country.headline,
        summary: country.summary,
        detail: country.detail,
        sourceUrl: country.sourceUrl ?? null,
        imageUrl: country.imageStorageId
          ? await ctx.storage.getUrl(country.imageStorageId)
          : null,
        order: country.order,
      }))
    )
  },
})

export const listOrganizations = query({
  args: {},
  returns: v.array(organization),
  handler: async (ctx) => {
    const organizations = await ctx.db
      .query("organizations")
      .withIndex("by_status_and_order", (q) => q.eq("status", "published"))
      .take(100)

    return Promise.all(
      organizations.map(async (item) => ({
        _id: item._id,
        slug: item.slug,
        name: item.name,
        kind: item.kind,
        tier: item.tier,
        description: item.description,
        websiteUrl: item.websiteUrl ?? null,
        logoUrl: item.logoStorageId
          ? await ctx.storage.getUrl(item.logoStorageId)
          : null,
        order: item.order,
      }))
    )
  },
})

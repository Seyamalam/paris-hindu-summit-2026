import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { getAdmin, writeAudit } from "./lib/admin"

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
  organizationRole: v.union(
    v.literal("organizing"),
    v.literal("managing"),
    v.literal("supporting")
  ),
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

function inferOrganizationRole(name: string) {
  const normalized = name.toLowerCase()
  if (normalized.includes("bureau of human rights and justice")) {
    return "organizing" as const
  }
  if (normalized.includes("forcefield")) return "managing" as const
  return "supporting" as const
}

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
        organizationRole:
          item.organizationRole ?? inferOrganizationRole(item.name),
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

export const listRegionalForAdmin = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("regionalCountries"),
      slug: v.string(),
      name: v.string(),
      code: v.string(),
      eyebrow: v.string(),
      headline: v.string(),
      summary: v.string(),
      detail: v.string(),
      sourceUrl: v.string(),
      order: v.number(),
      status: v.union(v.literal("draft"), v.literal("published")),
    })
  ),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const rows = await ctx.db
      .query("regionalCountries")
      .withIndex("by_status_and_order")
      .take(100)
    return rows.map((item) => ({
      _id: item._id,
      slug: item.slug,
      name: item.name,
      code: item.code,
      eyebrow: item.eyebrow,
      headline: item.headline,
      summary: item.summary,
      detail: item.detail,
      sourceUrl: item.sourceUrl ?? "",
      order: item.order,
      status: item.status,
    }))
  },
})

export const saveRegional = mutation({
  args: {
    id: v.optional(v.id("regionalCountries")),
    slug: v.string(),
    name: v.string(),
    code: v.string(),
    eyebrow: v.string(),
    headline: v.string(),
    summary: v.string(),
    detail: v.string(),
    sourceUrl: v.string(),
    order: v.number(),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  returns: v.id("regionalCountries"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const { id, sourceUrl, ...rest } = args
    const value = {
      ...rest,
      sourceUrl: sourceUrl.trim() || undefined,
      updatedAt: Date.now(),
    }
    const entityId = id
      ? (await ctx.db.patch(id, value), id)
      : await ctx.db.insert("regionalCountries", value)
    await writeAudit(ctx, actor, {
      action: id ? "update" : "create",
      entityType: "regionalCountry",
      entityId,
      summary: `Saved ${args.name}`,
    })
    return entityId
  },
})

export const removeRegional = mutation({
  args: { id: v.id("regionalCountries") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const row = await ctx.db.get(args.id)
    if (row) await ctx.db.delete(args.id)
    await writeAudit(ctx, actor, {
      action: "delete",
      entityType: "regionalCountry",
      entityId: args.id,
      summary: `Deleted ${row?.name ?? "regional country"}`,
    })
    return null
  },
})

export const listOrganizationsForAdmin = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("organizations"),
      slug: v.string(),
      name: v.string(),
      organizationRole: v.union(
        v.literal("organizing"),
        v.literal("managing"),
        v.literal("supporting")
      ),
      kind: v.union(v.literal("partner"), v.literal("sponsor")),
      tier: v.union(
        v.literal("strategic"),
        v.literal("knowledge"),
        v.literal("community"),
        v.literal("supporting")
      ),
      description: v.string(),
      websiteUrl: v.string(),
      logoStorageId: v.optional(v.id("_storage")),
      order: v.number(),
      status: v.union(v.literal("draft"), v.literal("published")),
    })
  ),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const rows = await ctx.db
      .query("organizations")
      .withIndex("by_status_and_order")
      .take(200)
    return rows.map((item) => ({
      _id: item._id,
      slug: item.slug,
      name: item.name,
      organizationRole:
        item.organizationRole ?? inferOrganizationRole(item.name),
      kind: item.kind,
      tier: item.tier,
      description: item.description,
      websiteUrl: item.websiteUrl ?? "",
      logoStorageId: item.logoStorageId,
      order: item.order,
      status: item.status,
    }))
  },
})

export const saveOrganization = mutation({
  args: {
    id: v.optional(v.id("organizations")),
    slug: v.string(),
    name: v.string(),
    organizationRole: v.union(
      v.literal("organizing"),
      v.literal("managing"),
      v.literal("supporting")
    ),
    kind: v.union(v.literal("partner"), v.literal("sponsor")),
    tier: v.union(
      v.literal("strategic"),
      v.literal("knowledge"),
      v.literal("community"),
      v.literal("supporting")
    ),
    description: v.string(),
    websiteUrl: v.string(),
    logoStorageId: v.optional(v.id("_storage")),
    order: v.number(),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  returns: v.id("organizations"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const { id, websiteUrl, logoStorageId, ...rest } = args
    const value = {
      ...rest,
      websiteUrl: websiteUrl.trim() || undefined,
      logoStorageId,
      updatedAt: Date.now(),
    }
    const entityId = id
      ? (await ctx.db.patch(id, value), id)
      : await ctx.db.insert("organizations", value)
    await writeAudit(ctx, actor, {
      action: id ? "update" : "create",
      entityType: "organization",
      entityId,
      summary: `Saved ${args.name}`,
    })
    return entityId
  },
})

export const removeOrganization = mutation({
  args: { id: v.id("organizations") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const row = await ctx.db.get(args.id)
    if (row) await ctx.db.delete(args.id)
    await writeAudit(ctx, actor, {
      action: "delete",
      entityType: "organization",
      entityId: args.id,
      summary: `Deleted ${row?.name ?? "organization"}`,
    })
    return null
  },
})

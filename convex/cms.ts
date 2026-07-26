import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { getAdmin, writeAudit } from "./lib/admin"

export const categoryValidator = v.union(
  v.literal("overview"),
  v.literal("agenda"),
  v.literal("resolution"),
  v.literal("strategy"),
  v.literal("partnership"),
  v.literal("why"),
  v.literal("challenge"),
  v.literal("engage"),
  v.literal("speaker"),
  v.literal("team"),
  v.literal("advisory"),
  v.literal("programme"),
  v.literal("media"),
  v.literal("faq")
)

const entryFields = {
  category: categoryValidator,
  slug: v.string(),
  title: v.string(),
  eyebrow: v.string(),
  summary: v.string(),
  body: v.string(),
  secondaryText: v.string(),
  country: v.string(),
  role: v.string(),
  email: v.string(),
  phone: v.string(),
  linkLabel: v.string(),
  linkUrl: v.string(),
  dateLabel: v.string(),
  timeLabel: v.string(),
  parentSlug: v.string(),
  imageStorageId: v.optional(v.id("_storage")),
  order: v.number(),
  status: v.union(v.literal("draft"), v.literal("published")),
  featured: v.boolean(),
}

const publicEntry = v.object({
  _id: v.id("cmsEntries"),
  ...entryFields,
  imageUrl: v.union(v.string(), v.null()),
})

export const listPublished = query({
  args: { category: categoryValidator },
  returns: v.array(publicEntry),
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("cmsEntries")
      .withIndex("by_category_and_status_and_order", (q) =>
        q.eq("category", args.category).eq("status", "published")
      )
      .take(100)
    return Promise.all(
      rows.map(async (item) => ({
        _id: item._id,
        category: item.category,
        slug: item.slug,
        title: item.title,
        eyebrow: item.eyebrow,
        summary: item.summary,
        body: item.body,
        secondaryText: item.secondaryText,
        country: item.country,
        role: item.role,
        email: item.email,
        phone: item.phone,
        linkLabel: item.linkLabel,
        linkUrl: item.linkUrl,
        dateLabel: item.dateLabel,
        timeLabel: item.timeLabel,
        parentSlug: item.parentSlug,
        imageStorageId: item.imageStorageId,
        order: item.order,
        status: item.status,
        featured: item.featured,
        imageUrl: item.imageStorageId
          ? await ctx.storage.getUrl(item.imageStorageId)
          : null,
      }))
    )
  },
})

export const listForAdmin = query({
  args: { category: categoryValidator },
  returns: v.array(publicEntry),
  handler: async (ctx, args) => {
    await getAdmin(ctx)
    const rows = await ctx.db
      .query("cmsEntries")
      .withIndex("by_category_and_order", (q) =>
        q.eq("category", args.category)
      )
      .take(200)
    return Promise.all(
      rows.map(async (item) => ({
        _id: item._id,
        category: item.category,
        slug: item.slug,
        title: item.title,
        eyebrow: item.eyebrow,
        summary: item.summary,
        body: item.body,
        secondaryText: item.secondaryText,
        country: item.country,
        role: item.role,
        email: item.email,
        phone: item.phone,
        linkLabel: item.linkLabel,
        linkUrl: item.linkUrl,
        dateLabel: item.dateLabel,
        timeLabel: item.timeLabel,
        parentSlug: item.parentSlug,
        imageStorageId: item.imageStorageId,
        order: item.order,
        status: item.status,
        featured: item.featured,
        imageUrl: item.imageStorageId
          ? await ctx.storage.getUrl(item.imageStorageId)
          : null,
      }))
    )
  },
})

export const save = mutation({
  args: { id: v.optional(v.id("cmsEntries")), ...entryFields },
  returns: v.id("cmsEntries"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const { id, ...fields } = args
    const value = { ...fields, updatedAt: Date.now() }
    const entityId = id
      ? (await ctx.db.patch(id, value), id)
      : await ctx.db.insert("cmsEntries", value)
    await writeAudit(ctx, actor, {
      action: id ? "update" : "create",
      entityType: "cmsEntry",
      entityId,
      summary: `${id ? "Updated" : "Created"} ${fields.title}`,
    })
    return entityId
  },
})

export const remove = mutation({
  args: { id: v.id("cmsEntries") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const existing = await ctx.db.get(args.id)
    if (existing) await ctx.db.delete(args.id)
    await writeAudit(ctx, actor, {
      action: "delete",
      entityType: "cmsEntry",
      entityId: args.id,
      summary: `Deleted ${existing?.title ?? "content entry"}`,
    })
    return null
  },
})

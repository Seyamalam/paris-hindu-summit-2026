import { ConvexError, v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { getAdmin, writeAudit } from "./lib/admin"

const status = v.union(v.literal("draft"), v.literal("published"))

const publicItem = v.object({
  _id: v.id("mediaItems"),
  sectionSlug: v.string(),
  slug: v.string(),
  title: v.string(),
  description: v.string(),
  coverUrl: v.union(v.string(), v.null()),
  fileUrl: v.union(v.string(), v.null()),
  fileName: v.string(),
  mimeType: v.string(),
  order: v.number(),
})

const publicSection = v.object({
  _id: v.id("mediaSections"),
  slug: v.string(),
  name: v.string(),
  description: v.string(),
  order: v.number(),
  items: v.array(publicItem),
})

export const listPublished = query({
  args: {},
  returns: v.array(publicSection),
  handler: async (ctx) => {
    const sections = await ctx.db
      .query("mediaSections")
      .withIndex("by_status_and_order", (q) => q.eq("status", "published"))
      .take(50)

    return Promise.all(
      sections.map(async (section) => {
        const items = await ctx.db
          .query("mediaItems")
          .withIndex("by_section_slug_and_status_and_order", (q) =>
            q.eq("sectionSlug", section.slug).eq("status", "published")
          )
          .take(100)
        return {
          _id: section._id,
          slug: section.slug,
          name: section.name,
          description: section.description,
          order: section.order,
          items: await Promise.all(
            items.map(async (item) => ({
              _id: item._id,
              sectionSlug: item.sectionSlug,
              slug: item.slug,
              title: item.title,
              description: item.description,
              coverUrl: item.coverStorageId
                ? await ctx.storage.getUrl(item.coverStorageId)
                : null,
              fileUrl: await ctx.storage.getUrl(item.fileStorageId),
              fileName: item.fileName,
              mimeType: item.mimeType,
              order: item.order,
            }))
          ),
        }
      })
    )
  },
})

export const listForAdmin = query({
  args: {},
  returns: v.object({
    sections: v.array(
      v.object({
        _id: v.id("mediaSections"),
        slug: v.string(),
        name: v.string(),
        description: v.string(),
        order: v.number(),
        status,
      })
    ),
    items: v.array(
      v.object({
        _id: v.id("mediaItems"),
        sectionSlug: v.string(),
        slug: v.string(),
        title: v.string(),
        description: v.string(),
        coverStorageId: v.optional(v.id("_storage")),
        fileStorageId: v.id("_storage"),
        fileName: v.string(),
        mimeType: v.string(),
        order: v.number(),
        status,
      })
    ),
  }),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const [sections, itemsBySection] = await Promise.all([
      ctx.db.query("mediaSections").withIndex("by_order").take(100),
      ctx.db.query("mediaItems").withIndex("by_section_slug_and_order").take(500),
    ])
    return {
      sections: sections.map(
        ({ _id, slug, name, description, order, status: itemStatus }) => ({
          _id,
          slug,
          name,
          description,
          order,
          status: itemStatus,
        })
      ),
      items: itemsBySection.map(
        ({
          _id,
          sectionSlug,
          slug,
          title,
          description,
          coverStorageId,
          fileStorageId,
          fileName,
          mimeType,
          order,
          status: itemStatus,
        }) => ({
          _id,
          sectionSlug,
          slug,
          title,
          description,
          coverStorageId,
          fileStorageId,
          fileName,
          mimeType,
          order,
          status: itemStatus,
        })
      ),
    }
  },
})

export const saveSection = mutation({
  args: {
    id: v.optional(v.id("mediaSections")),
    slug: v.string(),
    name: v.string(),
    description: v.string(),
    order: v.number(),
    status,
  },
  returns: v.id("mediaSections"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const { id, ...fields } = args
    if (!fields.slug.trim() || !fields.name.trim()) {
      throw new ConvexError("Section name and slug are required.")
    }
    const conflictingSection = await ctx.db
      .query("mediaSections")
      .withIndex("by_slug", (q) => q.eq("slug", fields.slug.trim()))
      .first()
    if (conflictingSection && conflictingSection._id !== id) {
      throw new ConvexError("That publication section slug is already in use.")
    }
    const value = {
      ...fields,
      slug: fields.slug.trim(),
      name: fields.name.trim(),
      updatedAt: Date.now(),
    }
    const entityId = id
      ? (await ctx.db.patch(id, value), id)
      : await ctx.db.insert("mediaSections", value)
    await writeAudit(ctx, actor, {
      action: id ? "update" : "create",
      entityType: "mediaSection",
      entityId,
      summary: `${id ? "Updated" : "Created"} ${value.name}`,
    })
    return entityId
  },
})

export const removeSection = mutation({
  args: { id: v.id("mediaSections") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const section = await ctx.db.get(args.id)
    if (section) {
      const attachedItem = await ctx.db
        .query("mediaItems")
        .withIndex("by_section_slug_and_order", (q) =>
          q.eq("sectionSlug", section.slug)
        )
        .first()
      if (attachedItem) {
        throw new ConvexError(
          "Move or delete this section’s publications before deleting it."
        )
      }
      await ctx.db.delete(args.id)
    }
    await writeAudit(ctx, actor, {
      action: "delete",
      entityType: "mediaSection",
      entityId: args.id,
      summary: `Deleted ${section?.name ?? "media section"}`,
    })
    return null
  },
})

export const saveItem = mutation({
  args: {
    id: v.optional(v.id("mediaItems")),
    sectionSlug: v.string(),
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    coverStorageId: v.optional(v.id("_storage")),
    fileStorageId: v.id("_storage"),
    fileName: v.string(),
    mimeType: v.string(),
    order: v.number(),
    status,
  },
  returns: v.id("mediaItems"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const { id, ...fields } = args
    if (!fields.sectionSlug.trim() || !fields.slug.trim() || !fields.title.trim()) {
      throw new ConvexError("Section, title, and slug are required.")
    }
    const coverStorageId = fields.coverStorageId
    const [section, conflictingItem, fileAsset, coverAsset] = await Promise.all([
      ctx.db
        .query("mediaSections")
        .withIndex("by_slug", (q) => q.eq("slug", fields.sectionSlug.trim()))
        .first(),
      ctx.db
        .query("mediaItems")
        .withIndex("by_slug", (q) => q.eq("slug", fields.slug.trim()))
        .first(),
      ctx.db
        .query("assets")
        .withIndex("by_storage_id", (q) =>
          q.eq("storageId", fields.fileStorageId)
        )
        .first(),
      coverStorageId
        ? ctx.db
            .query("assets")
            .withIndex("by_storage_id", (q) =>
              q.eq("storageId", coverStorageId)
            )
            .first()
        : Promise.resolve(null),
    ])
    if (!section) throw new ConvexError("Choose an existing publication section.")
    if (conflictingItem && conflictingItem._id !== id) {
      throw new ConvexError("That publication slug is already in use.")
    }
    if (!fileAsset) throw new ConvexError("Choose a file from the managed media library.")
    if (fields.coverStorageId && !coverAsset) {
      throw new ConvexError("Choose a cover from the managed media library.")
    }
    const value = {
      ...fields,
      sectionSlug: fields.sectionSlug.trim(),
      slug: fields.slug.trim(),
      title: fields.title.trim(),
      updatedAt: Date.now(),
    }
    const entityId = id
      ? (await ctx.db.patch(id, value), id)
      : await ctx.db.insert("mediaItems", value)
    await writeAudit(ctx, actor, {
      action: id ? "update" : "create",
      entityType: "mediaItem",
      entityId,
      summary: `${id ? "Updated" : "Created"} ${value.title}`,
    })
    return entityId
  },
})

export const removeItem = mutation({
  args: { id: v.id("mediaItems") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const item = await ctx.db.get(args.id)
    if (item) await ctx.db.delete(args.id)
    await writeAudit(ctx, actor, {
      action: "delete",
      entityType: "mediaItem",
      entityId: args.id,
      summary: `Deleted ${item?.title ?? "media item"}`,
    })
    return null
  },
})

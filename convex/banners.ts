import { ConvexError, v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { getAdmin, writeAudit } from "./lib/admin"

const status = v.union(v.literal("draft"), v.literal("published"))
const banner = v.object({
  _id: v.id("homeBanners"),
  title: v.string(),
  imageStorageId: v.id("_storage"),
  imageUrl: v.string(),
  altText: v.string(),
  order: v.number(),
  status,
  updatedAt: v.number(),
})

export const listPublished = query({
  args: {},
  returns: v.array(banner),
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("homeBanners")
      .withIndex("by_status_and_order", (q) => q.eq("status", "published"))
      .take(12)

    const resolved = await Promise.all(
      rows.map(async (row) => ({
        ...row,
        imageUrl: await ctx.storage.getUrl(row.imageStorageId),
      }))
    )

    return resolved.flatMap((row) =>
      row.imageUrl
        ? [
            {
              _id: row._id,
              title: row.title,
              imageStorageId: row.imageStorageId,
              imageUrl: row.imageUrl,
              altText: row.altText,
              order: row.order,
              status: row.status,
              updatedAt: row.updatedAt,
            },
          ]
        : []
    )
  },
})

export const listForAdmin = query({
  args: {},
  returns: v.array(banner),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const rows = await ctx.db
      .query("homeBanners")
      .withIndex("by_order")
      .take(50)
    const resolved = await Promise.all(
      rows.map(async (row) => ({
        ...row,
        imageUrl: await ctx.storage.getUrl(row.imageStorageId),
      }))
    )

    return resolved.flatMap((row) =>
      row.imageUrl
        ? [
            {
              _id: row._id,
              title: row.title,
              imageStorageId: row.imageStorageId,
              imageUrl: row.imageUrl,
              altText: row.altText,
              order: row.order,
              status: row.status,
              updatedAt: row.updatedAt,
            },
          ]
        : []
    )
  },
})

export const save = mutation({
  args: {
    id: v.optional(v.id("homeBanners")),
    title: v.string(),
    imageStorageId: v.id("_storage"),
    altText: v.string(),
    order: v.number(),
    status,
  },
  returns: v.id("homeBanners"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const title = args.title.trim()
    const altText = args.altText.trim()
    if (title.length < 2) {
      throw new ConvexError("Give this banner a short internal name.")
    }
    if (altText.length < 8) {
      throw new ConvexError("Add descriptive alternative text for this banner.")
    }
    if (!Number.isInteger(args.order) || args.order < 0 || args.order > 999) {
      throw new ConvexError(
        "Display order must be a whole number from 0 to 999."
      )
    }

    const asset = await ctx.db
      .query("assets")
      .withIndex("by_storage_id", (q) => q.eq("storageId", args.imageStorageId))
      .unique()
    if (!asset || !asset.mimeType.startsWith("image/")) {
      throw new ConvexError("Choose a managed image from the media library.")
    }

    const values = {
      title,
      imageStorageId: args.imageStorageId,
      altText,
      order: args.order,
      status: args.status,
      updatedAt: Date.now(),
    }
    const id = args.id
      ? (await ctx.db.patch(args.id, values), args.id)
      : await ctx.db.insert("homeBanners", values)

    await writeAudit(ctx, actor, {
      action: args.id ? "update" : "create",
      entityType: "homeBanner",
      entityId: id,
      summary: `${args.status === "published" ? "Published" : "Saved"} banner ${title}`,
    })
    return id
  },
})

export const remove = mutation({
  args: { id: v.id("homeBanners") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const row = await ctx.db.get(args.id)
    if (row) await ctx.db.delete(args.id)
    await writeAudit(ctx, actor, {
      action: "delete",
      entityType: "homeBanner",
      entityId: args.id,
      summary: `Deleted banner ${row?.title ?? args.id}`,
    })
    return null
  },
})

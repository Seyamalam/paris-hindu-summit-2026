import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

const publicationStatus = v.union(v.literal("draft"), v.literal("published"))

export default defineSchema({
  regionalCountries: defineTable({
    slug: v.string(),
    name: v.string(),
    code: v.string(),
    eyebrow: v.string(),
    headline: v.string(),
    summary: v.string(),
    detail: v.string(),
    sourceUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    order: v.number(),
    status: publicationStatus,
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status_and_order", ["status", "order"]),

  organizations: defineTable({
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
    websiteUrl: v.optional(v.string()),
    logoStorageId: v.optional(v.id("_storage")),
    order: v.number(),
    status: publicationStatus,
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status_and_order", ["status", "order"])
    .index("by_kind_and_status_and_order", ["kind", "status", "order"]),

  assets: defineTable({
    storageId: v.id("_storage"),
    fileName: v.string(),
    mimeType: v.string(),
    byteSize: v.number(),
    altText: v.string(),
    category: v.union(
      v.literal("logo"),
      v.literal("portrait"),
      v.literal("media"),
      v.literal("document"),
      v.literal("general")
    ),
    status: publicationStatus,
    uploadedAt: v.number(),
  })
    .index("by_storage_id", ["storageId"])
    .index("by_category_and_status", ["category", "status"]),
})

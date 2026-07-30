import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { getAdmin, writeAudit } from "./lib/admin"

export const settingsFieldsValidator = v.object({
  eventName: v.string(),
  shortName: v.string(),
  theme: v.string(),
  eventStartIso: v.string(),
  eventEndIso: v.string(),
  timezone: v.string(),
  venue: v.string(),
  address: v.string(),
  cityCountry: v.string(),
  format: v.string(),
  delegateInfo: v.string(),
  languages: v.string(),
  announcement: v.string(),
  announcementEnabled: v.boolean(),
  contactEmail: v.string(),
  registrationEmail: v.string(),
  pressEmail: v.string(),
  phone: v.string(),
  whatsapp: v.string(),
  facebookUrl: v.string(),
  xUrl: v.string(),
  instagramUrl: v.string(),
  youtubeUrl: v.string(),
  linkedinUrl: v.optional(v.string()),
  heroEyebrow: v.string(),
  heroTitleLine1: v.string(),
  heroTitleLine2: v.string(),
  heroLead: v.string(),
  whyTitle: v.string(),
  whyBody: v.string(),
  donationEyebrow: v.string(),
  donationTitle: v.string(),
  donationBody: v.string(),
  footerTitle: v.string(),
  footerBody: v.string(),
  registrationOpen: v.boolean(),
  donationsEnabled: v.boolean(),
  logoStorageId: v.optional(v.id("_storage")),
  faviconStorageId: v.optional(v.id("_storage")),
})

export const settingsValidator = v.object({
  ...settingsFieldsValidator.fields,
  logoUrl: v.union(v.string(), v.null()),
  faviconUrl: v.union(v.string(), v.null()),
})

export const get = query({
  args: {},
  returns: v.union(v.null(), settingsValidator),
  handler: async (ctx) => {
    const row = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "primary"))
      .unique()
    if (!row) return null
    const { _id, _creationTime, key, updatedAt, ...settings } = row
    void _id
    void _creationTime
    void key
    void updatedAt
    return {
      ...settings,
      logoUrl: settings.logoStorageId
        ? await ctx.storage.getUrl(settings.logoStorageId)
        : null,
      faviconUrl: settings.faviconStorageId
        ? await ctx.storage.getUrl(settings.faviconStorageId)
        : null,
    }
  },
})

export const save = mutation({
  args: settingsFieldsValidator.fields,
  returns: v.null(),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "primary"))
      .unique()
    const value = { ...args, key: "primary", updatedAt: Date.now() }
    if (existing) await ctx.db.replace(existing._id, value)
    else await ctx.db.insert("siteSettings", value)
    await writeAudit(ctx, actor, {
      action: "save",
      entityType: "siteSettings",
      entityId: "primary",
      summary: "Updated global site settings",
    })
    return null
  },
})

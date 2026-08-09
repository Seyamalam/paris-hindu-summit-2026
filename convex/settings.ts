import { v } from "convex/values"

import { internalMutation, mutation, query } from "./_generated/server"
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
  bankTransferEyebrow: v.optional(v.string()),
  bankTransferTitle: v.optional(v.string()),
  bankTransferBody: v.optional(v.string()),
  bankAccountLabel: v.optional(v.string()),
  bankName: v.optional(v.string()),
  bankAccountName: v.optional(v.string()),
  bankIban: v.optional(v.string()),
  bankBic: v.optional(v.string()),
  usBankAccountLabel: v.optional(v.string()),
  usBankName: v.optional(v.string()),
  usBankAccountName: v.optional(v.string()),
  usBankRoutingNumber: v.optional(v.string()),
  usBankAccountNumber: v.optional(v.string()),
  usBankSwift: v.optional(v.string()),
  registrationFeeLabel: v.optional(v.string()),
  registrationFeeTitle: v.optional(v.string()),
  registrationFeeBody: v.optional(v.string()),
  registrationFeeEmail: v.optional(v.string()),
  forumPackagesMenuLabel: v.optional(v.string()),
  accommodationPackageLabel: v.optional(v.string()),
  accommodationPackageTitle: v.optional(v.string()),
  accommodationPackageIntro: v.optional(v.string()),
  sponsorshipPackageLabel: v.optional(v.string()),
  sponsorshipPackageTitle: v.optional(v.string()),
  sponsorshipPackageIntro: v.optional(v.string()),
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

const bankTransferDefaults = {
  bankTransferEyebrow: "Direct bank transfer",
  bankTransferTitle: "Give directly, securely.",
  bankTransferBody: "Your generosity helps bring our community together in Paris for inspiration, dialogue, and justice. Donations can be sent directly to either summit bank account.",
  bankAccountLabel: "France account",
  bankName: "Credit Industriel et Commercial (CIC Bank)",
  bankAccountName: "Bureau of Human Rights and Justice",
  bankIban: "FR76 3006 6104 5100 0207 8600 151",
  bankBic: "CMCIFRPP",
}

const usBankDefaults = {
  usBankAccountLabel: "United States account",
  usBankName: "Fifth Third Bank",
  usBankAccountName: "Forcefield",
  usBankRoutingNumber: "071923909",
  usBankAccountNumber: "10233828",
  usBankSwift: "FTBCUS3CXXX (FTBCUS3C for the 8-character base code)",
}

const officialSocialLinks = {
  facebookUrl: "https://fb.me/e/44RtCKAWc",
  xUrl: "https://x.com/parishindusum?s=11",
  instagramUrl: "https://www.instagram.com/parishindusummit?igsh=MThrMWtiY2Qydnk2Yg%3D%3D&utm_source=qr",
  youtubeUrl: "https://youtube.com/@parishindusummit2026?si=C9PVQHju3ZWG62RP",
  linkedinUrl: "https://www.linkedin.com/company/paris-hindu-summit/",
}

const registrationFeeDefaults = {
  registrationFeeLabel: "US$250",
  registrationFeeTitle: "Registration processing fee",
  registrationFeeBody: "Deposit the registration processing fee into either summit bank account. After sending the payment, email the payment slip for confirmation.",
  registrationFeeEmail: "info@parishindusummit.org",
}

const forumPackageDefaults = {
  forumPackagesMenuLabel: "Forum Packages",
  accommodationPackageLabel: "Four nights in Paris",
  accommodationPackageTitle: "Stay close to the Forum.",
  accommodationPackageIntro: "Compare five accommodation levels for the Paris Hindu Summit. Every package includes four hotel nights and the local tourist tax.",
  sponsorshipPackageLabel: "Partnership & Sponsorship",
  sponsorshipPackageTitle: "Put your institution behind meaningful action.",
  sponsorshipPackageIntro: "Choose a level that matches your organisation's goals—from visible Forum partnership to a focused programme, hospitality, scholarship or archive contribution.",
}

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
      bankTransferEyebrow: settings.bankTransferEyebrow ?? bankTransferDefaults.bankTransferEyebrow,
      bankTransferTitle: settings.bankTransferTitle ?? bankTransferDefaults.bankTransferTitle,
      bankTransferBody: settings.bankTransferBody ?? bankTransferDefaults.bankTransferBody,
      bankAccountLabel: settings.bankAccountLabel ?? bankTransferDefaults.bankAccountLabel,
      bankName: settings.bankName ?? bankTransferDefaults.bankName,
      bankAccountName: settings.bankAccountName ?? bankTransferDefaults.bankAccountName,
      bankIban: settings.bankIban ?? bankTransferDefaults.bankIban,
      bankBic: settings.bankBic ?? bankTransferDefaults.bankBic,
      usBankAccountLabel: settings.usBankAccountLabel ?? usBankDefaults.usBankAccountLabel,
      usBankName: settings.usBankName ?? usBankDefaults.usBankName,
      usBankAccountName: settings.usBankAccountName ?? usBankDefaults.usBankAccountName,
      usBankRoutingNumber: settings.usBankRoutingNumber ?? usBankDefaults.usBankRoutingNumber,
      usBankAccountNumber: settings.usBankAccountNumber ?? usBankDefaults.usBankAccountNumber,
      usBankSwift: settings.usBankSwift ?? usBankDefaults.usBankSwift,
      registrationFeeLabel: settings.registrationFeeLabel ?? registrationFeeDefaults.registrationFeeLabel,
      registrationFeeTitle: settings.registrationFeeTitle ?? registrationFeeDefaults.registrationFeeTitle,
      registrationFeeBody: settings.registrationFeeBody ?? registrationFeeDefaults.registrationFeeBody,
      registrationFeeEmail: settings.registrationFeeEmail ?? registrationFeeDefaults.registrationFeeEmail,
      forumPackagesMenuLabel: settings.forumPackagesMenuLabel ?? forumPackageDefaults.forumPackagesMenuLabel,
      accommodationPackageLabel: settings.accommodationPackageLabel ?? forumPackageDefaults.accommodationPackageLabel,
      accommodationPackageTitle: settings.accommodationPackageTitle ?? forumPackageDefaults.accommodationPackageTitle,
      accommodationPackageIntro: settings.accommodationPackageIntro ?? forumPackageDefaults.accommodationPackageIntro,
      sponsorshipPackageLabel: settings.sponsorshipPackageLabel ?? forumPackageDefaults.sponsorshipPackageLabel,
      sponsorshipPackageTitle: settings.sponsorshipPackageTitle ?? forumPackageDefaults.sponsorshipPackageTitle,
      sponsorshipPackageIntro: settings.sponsorshipPackageIntro ?? forumPackageDefaults.sponsorshipPackageIntro,
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

export const setOfficialSocialLinks = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "primary"))
      .unique()
    if (!existing) throw new Error("Primary site settings have not been created.")
    await ctx.db.patch(existing._id, {
      ...officialSocialLinks,
      updatedAt: Date.now(),
    })
    return null
  },
})

export const setCurrentForumConfiguration = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "primary"))
      .unique()
    if (!existing) throw new Error("Primary site settings have not been created.")
    await ctx.db.patch(existing._id, {
      ...registrationFeeDefaults,
      ...forumPackageDefaults,
      updatedAt: Date.now(),
    })
    return null
  },
})

export const setCurrentBankAccounts = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "primary"))
      .unique()
    if (!existing) throw new Error("Primary site settings have not been created.")
    const oldBankTransferBody = "Your generosity helps bring our community together in Paris for inspiration, dialogue, and justice. Donations can also be sent directly to the following bank account."
    const oldRegistrationFeeBody = "Deposit the registration processing fee into the summit bank account. After sending the payment, email the payment slip for confirmation."
    await ctx.db.patch(existing._id, {
      bankAccountLabel: existing.bankAccountLabel ?? bankTransferDefaults.bankAccountLabel,
      ...usBankDefaults,
      ...(existing.bankTransferBody === oldBankTransferBody ? { bankTransferBody: bankTransferDefaults.bankTransferBody } : {}),
      ...(existing.registrationFeeBody === oldRegistrationFeeBody ? { registrationFeeBody: registrationFeeDefaults.registrationFeeBody } : {}),
      updatedAt: Date.now(),
    })
    return null
  },
})

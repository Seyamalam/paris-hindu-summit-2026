import { v } from "convex/values"

import { internalMutation } from "./_generated/server"

export const applyJuly28IssueContent = internalMutation({
  args: {},
  returns: v.object({
    settingsUpdated: v.number(),
    editorialUpdated: v.number(),
    mediaSectionsUpdated: v.number(),
    pageCopyInserted: v.number(),
  }),
  handler: async (ctx) => {
    const now = Date.now()
    let settingsUpdated = 0
    let editorialUpdated = 0
    let mediaSectionsUpdated = 0
    let pageCopyInserted = 0

    const settings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "primary"))
      .unique()

    if (settings?.shortName === "Paris Assembly") {
      await ctx.db.patch(settings._id, {
        shortName: "Paris Hindu Summit",
        updatedAt: now,
      })
      settingsUpdated += 1
    }

    const brandEntries = await ctx.db
      .query("cmsEntries")
      .withIndex("by_slug", (q) => q.eq("slug", "global-brand"))
      .take(20)
    const brand = brandEntries.find(
      (entry) => entry.category === "sectionCopy"
    )

    if (brand?.title === "For dignity & rights") {
      await ctx.db.patch(brand._id, {
        title: "Global Forum on Religious Freedom and Hindu Minority Rights",
        updatedAt: now,
      })
      editorialUpdated += 1
    }

    const heroActionEntries = await ctx.db
      .query("cmsEntries")
      .withIndex("by_slug", (q) => q.eq("slug", "home-hero-actions"))
      .take(20)
    const heroActions = heroActionEntries.find(
      (entry) => entry.category === "sectionCopy"
    )

    if (heroActions?.secondaryText === "Watch the opening film") {
      await ctx.db.patch(heroActions._id, {
        secondaryText: "View programme schedule",
        body: "/programme",
        updatedAt: now,
      })
      editorialUpdated += 1
    }

    const engageEntries = await ctx.db
      .query("cmsEntries")
      .withIndex("by_slug", (q) => q.eq("slug", "engage"))
      .take(20)
    const engagePage = engageEntries.find(
      (entry) => entry.category === "pageCopy"
    )

    if (engagePage) {
      await ctx.db.patch(engagePage._id, {
        eyebrow: "Attend and support",
        title: "There is more than one way to enter the work",
        summary:
          "Register as a victim, delegate, researcher or presenter, general audience member, or accredited member of the media.",
        updatedAt: now,
      })
      editorialUpdated += 1
    }

    const articles = await ctx.db
      .query("mediaSections")
      .withIndex("by_slug", (q) => q.eq("slug", "articles"))
      .first()

    if (articles?.status === "draft") {
      await ctx.db.patch(articles._id, {
        status: "published",
        updatedAt: now,
      })
      mediaSectionsUpdated += 1
    }

    const faqEntries = await ctx.db
      .query("cmsEntries")
      .withIndex("by_slug", (q) => q.eq("slug", "faq"))
      .take(20)
    const faqPage = faqEntries.find((entry) => entry.category === "pageCopy")

    if (!faqPage) {
      await ctx.db.insert("cmsEntries", {
        category: "pageCopy",
        slug: "faq",
        title: "Practical answers before Paris.",
        eyebrow: "Frequently asked questions",
        summary:
          "Attendance, access, languages, programme information, media arrangements, and other practical details.",
        body: "",
        secondaryText: "",
        country: "",
        role: "",
        email: "",
        phone: "",
        linkLabel: "",
        linkUrl: "/faq",
        dateLabel: "",
        timeLabel: "",
        parentSlug: "",
        order: 11,
        status: "published",
        featured: false,
        updatedAt: now,
      })
      pageCopyInserted += 1
    }

    return {
      settingsUpdated,
      editorialUpdated,
      mediaSectionsUpdated,
      pageCopyInserted,
    }
  },
})

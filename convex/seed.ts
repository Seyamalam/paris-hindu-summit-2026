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

const settings = {
  eventName:
    "Global Forum on Religious Freedom and Hindu Minority Rights in Bangladesh",
  shortName: "Paris Assembly",
  theme: "Justice For Bangladeshi Hindus — Solidarity Without Borders",
  eventStartIso: "2026-10-03T08:30:00+02:00",
  eventEndIso: "2026-10-04T18:00:00+02:00",
  timezone: "Europe/Paris",
  venue: "Salle Des Princes",
  address: "12 Rue de Stalingrad, 93700 Drancy, Paris — France",
  cityCountry: "Drancy, Paris — France",
  format: "In-person, two-day international summit",
  delegateInfo: "International delegates, by invitation and registration",
  languages: "English · French · Bengali interpretation",
  announcement: "Delegate registration is open",
  announcementEnabled: true,
  contactEmail: "eng.suvra@gmail.com",
  registrationEmail: "eng.suvra@gmail.com",
  pressEmail: "eng.suvra@gmail.com",
  phone: "",
  whatsapp: "",
  facebookUrl: "",
  xUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  heroEyebrow: "Global forum · Paris · October 2026",
  heroTitleLine1: "We assemble",
  heroTitleLine2: "for equality.",
  heroLead:
    "Leaders, researchers, rights defenders, and communities building a practical agenda for the rights and future of Hindus in Bangladesh.",
  whyTitle:
    "Justice delayed for half a century cannot be denied indefinitely.",
  whyBody:
    "The forum brings verified testimony, research, policy, and international cooperation into one room—and turns them into commitments that continue after Paris.",
  donationEyebrow: "Support the summit",
  donationTitle: "Your contribution funds testimony, not talk.",
  donationBody:
    "Donations support survivor-testimony documentation, translation, legal research, and delegate travel for those who could not otherwise attend.",
  footerTitle: "One room. Many institutions. A shared commitment.",
  footerBody:
    "Human rights, dignity, evidence, and equal citizenship—carried from Paris into sustained international action.",
  registrationOpen: true,
  donationsEnabled: true,
} as const

const donationTiers = [
  {
    slug: "solidarity-25",
    label: "€25 · Solidarity",
    amountCents: 2500,
    description: "Supports translation, printed evidence, and public access.",
    customAmount: false,
    order: 1,
  },
  {
    slug: "witness-100",
    label: "€100 · Witness",
    amountCents: 10000,
    description: "Supports testimony documentation and legal research.",
    customAmount: false,
    order: 2,
  },
  {
    slug: "delegate-500",
    label: "€500 · Delegate",
    amountCents: 50000,
    description: "Supports travel and access for delegates who need assistance.",
    customAmount: false,
    order: 3,
  },
  {
    slug: "other",
    label: "Choose another amount",
    description: "Give an amount between €5 and €100,000.",
    customAmount: true,
    order: 4,
  },
] as const

const cmsEntries = [
  {
    category: "engage" as const,
    slug: "attend-in-paris",
    title: "Attend in Paris",
    eyebrow: "Registration",
    summary: "Join both programme days, working sessions, and the closing gala.",
    body: "Register your interest and the organising team will follow up with attendance details.",
    linkLabel: "Register interest",
    linkUrl: "/participate",
    order: 1,
    featured: true,
  },
  {
    category: "engage" as const,
    slug: "support-the-record",
    title: "Support the record",
    eyebrow: "Donate",
    summary: "Help testimony, translation, research, and delegate access travel further.",
    body: "The Stripe-ready donation experience runs in demo mode until the organisers add live credentials.",
    linkLabel: "Support the summit",
    linkUrl: "/donate",
    order: 2,
    featured: true,
  },
  {
    category: "engage" as const,
    slug: "partner-with-us",
    title: "Partner with the forum",
    eyebrow: "Institutions",
    summary: "Bring research, policy capacity, media reach, or community networks.",
    body: "Use the support desk to introduce your organisation and proposed contribution.",
    linkLabel: "Contact the support desk",
    linkUrl: "/support",
    order: 3,
    featured: false,
  },
  {
    category: "faq" as const,
    slug: "who-can-attend",
    title: "Who can attend?",
    eyebrow: "Attendance",
    summary: "International delegates may attend by invitation and registration.",
    body: "Submit the registration form and the organising team will confirm attendance and practical information.",
    linkLabel: "",
    linkUrl: "",
    order: 1,
    featured: false,
  },
  {
    category: "faq" as const,
    slug: "languages",
    title: "What languages are supported?",
    eyebrow: "Interpretation",
    summary: "English is primary, with French and Bengali interpretation.",
    body: "Final interpretation arrangements will be confirmed with registered delegates.",
    linkLabel: "",
    linkUrl: "",
    order: 2,
    featured: false,
  },
  {
    category: "programme" as const,
    slug: "day-one-opening",
    title: "Opening film and keynote",
    eyebrow: "Day 01",
    summary: "Evidence enters the public record.",
    body: "Opening film, keynote, historical context, testimony, and legal protection.",
    dateLabel: "3 October 2026",
    timeLabel: "09:30",
    parentSlug: "day-one",
    order: 1,
    featured: true,
  },
  {
    category: "programme" as const,
    slug: "day-one-testimony",
    title: "Testimony and legal protection",
    eyebrow: "Day 01",
    summary: "Survivor accounts meet legal research and practical safeguards.",
    body: "A moderated session connecting lived experience, documentation, and remedies.",
    dateLabel: "3 October 2026",
    timeLabel: "14:30",
    parentSlug: "day-one",
    order: 2,
    featured: false,
  },
  {
    category: "programme" as const,
    slug: "day-two-policy",
    title: "Policy roundtable",
    eyebrow: "Day 02",
    summary: "Evidence becomes commitment.",
    body: "Human-rights standards, property rights, justice, and international cooperation.",
    dateLabel: "4 October 2026",
    timeLabel: "12:00",
    parentSlug: "day-two",
    order: 3,
    featured: true,
  },
  {
    category: "programme" as const,
    slug: "day-two-declaration",
    title: "Paris Declaration and Agni Sakshi",
    eyebrow: "Day 02",
    summary: "A shared agenda and a witnessed pledge.",
    body: "Adoption of the Paris Declaration followed by the closing pledge ceremony.",
    dateLabel: "4 October 2026",
    timeLabel: "16:00",
    parentSlug: "day-two",
    order: 4,
    featured: true,
  },
  {
    category: "media" as const,
    slug: "research-library",
    title: "Research library",
    eyebrow: "Research papers",
    summary: "A curated evidence archive is being prepared for publication.",
    body: "Approved research papers, source notes, and downloadable references will appear here.",
    linkLabel: "Coming soon",
    linkUrl: "",
    order: 1,
    featured: true,
  },
  {
    category: "media" as const,
    slug: "press-room",
    title: "Press room",
    eyebrow: "Media",
    summary: "Accreditation, releases, and the press kit are being prepared.",
    body: "Journalists can contact the support desk now while the public press archive is assembled.",
    linkLabel: "Contact media desk",
    linkUrl: "/support",
    order: 2,
    featured: true,
  },
] as const

export const seedInitialContent = internalMutation({
  args: {},
  returns: v.object({
    countriesInserted: v.number(),
    countriesUpdated: v.number(),
    organizationsInserted: v.number(),
    organizationsUpdated: v.number(),
    settingsUpserted: v.number(),
    tiersUpserted: v.number(),
    cmsEntriesUpserted: v.number(),
  }),
  handler: async (ctx) => {
    const now = Date.now()
    let countriesInserted = 0
    let countriesUpdated = 0
    let organizationsInserted = 0
    let organizationsUpdated = 0
    let settingsUpserted = 0
    let tiersUpserted = 0
    let cmsEntriesUpserted = 0

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

    const existingSettings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "primary"))
      .unique()
    const settingsValue = {
      ...settings,
      key: "primary",
      updatedAt: now,
    }
    if (existingSettings) {
      await ctx.db.replace(existingSettings._id, settingsValue)
    } else {
      await ctx.db.insert("siteSettings", settingsValue)
    }
    settingsUpserted = 1

    for (const tier of donationTiers) {
      const existing = await ctx.db
        .query("donationTiers")
        .withIndex("by_slug", (q) => q.eq("slug", tier.slug))
        .unique()
      const value = {
        ...tier,
        status: "published" as const,
        updatedAt: now,
      }
      if (existing) await ctx.db.patch(existing._id, value)
      else await ctx.db.insert("donationTiers", value)
      tiersUpserted += 1
    }

    for (const entry of cmsEntries) {
      const existing = await ctx.db
        .query("cmsEntries")
        .withIndex("by_slug", (q) => q.eq("slug", entry.slug))
        .unique()
      const value = {
        category: entry.category,
        slug: entry.slug,
        title: entry.title,
        eyebrow: entry.eyebrow,
        summary: entry.summary,
        body: entry.body,
        secondaryText: "",
        country: "",
        role: "",
        email: "",
        phone: "",
        linkLabel: "linkLabel" in entry ? entry.linkLabel : "",
        linkUrl: "linkUrl" in entry ? entry.linkUrl : "",
        dateLabel: "dateLabel" in entry ? entry.dateLabel : "",
        timeLabel: "timeLabel" in entry ? entry.timeLabel : "",
        parentSlug: "parentSlug" in entry ? entry.parentSlug : "",
        order: entry.order,
        status: "published" as const,
        featured: entry.featured,
        updatedAt: now,
      }
      if (existing) await ctx.db.patch(existing._id, value)
      else await ctx.db.insert("cmsEntries", value)
      cmsEntriesUpserted += 1
    }

    return {
      countriesInserted,
      countriesUpdated,
      organizationsInserted,
      organizationsUpdated,
      settingsUpserted,
      tiersUpserted,
      cmsEntriesUpserted,
    }
  },
})

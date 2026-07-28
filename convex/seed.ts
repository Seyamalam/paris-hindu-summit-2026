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

const mediaSections = [
  {
    slug: "books",
    name: "Books",
    description:
      "Books and long-form works connected to the summit’s evidence and public record.",
    order: 1,
  },
  {
    slug: "government-reports",
    name: "Government Reports",
    description:
      "Official reports, parliamentary material, and public institutional documents.",
    order: 2,
  },
  {
    slug: "research-and-briefings",
    name: "Research & Briefings",
    description:
      "Research papers, policy briefs, backgrounders, and verified supporting material.",
    order: 3,
  },
  {
    slug: "images-and-videos",
    name: "Images & Videos",
    description:
      "Photographs and films documenting the summit, its participants, and the continuing public record.",
    order: 4,
  },
] as const

const settings = {
  eventName:
    "Global Forum on Religious Freedom and Hindu Minority Rights in Bangladesh",
  shortName: "Paris Hindu Summit",
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

const sectionCopyEntries = [
  {
    slug:"global-brand",
    parentSlug:"global",
    title:"Global Forum on Religious Freedom and Hindu Minority Rights",
    summary:"Global Solidarity Summit for Bangladeshi Hindus",
  },
  {
    slug:"global-footer-callout",
    parentSlug:"global",
    eyebrow:"Paris · October 2026",
    title:"One room. Many institutions. A shared commitment.",
    linkLabel:"Take part",
    linkUrl:"/engage",
  },
  {
    slug:"global-footer-legal",
    parentSlug:"global",
    title:"Human rights · dignity · equal citizenship",
  },
  {
    slug:"home-hero-actions",
    parentSlug:"home",
    title:"Reserve a place",
    secondaryText:"View programme schedule",
    linkUrl:"/participate",
    body:"/programme",
  },
  {
    slug:"home-banner",
    parentSlug:"home",
    title:"PARIS",
  },
  {
    slug:"home-info-labels",
    parentSlug:"home",
    title:"Venue",
    summary:"Format",
    body:"Delegates",
    secondaryText:"Languages",
  },
  {
    slug:"home-why-intro",
    parentSlug:"home",
    eyebrow:"Why Paris · Why now",
    title:"Justice delayed for half a century cannot be denied indefinitely.",
    summary:"The forum brings verified testimony, research, policy, and international cooperation into one room—and turns them into commitments that continue after Paris.",
    linkLabel:"Read why the forum exists",
    linkUrl:"/about",
  },
  {
    slug:"home-why-record-heading",
    parentSlug:"home",
    eyebrow:"Why this summit",
    title:"Understand the record. Build protection.",
  },
  {
    slug:"home-challenges-heading",
    parentSlug:"home",
    eyebrow:"The challenges",
    title:"What the declaration must confront.",
  },
  {
    slug:"home-evidence-heading",
    parentSlug:"home",
    eyebrow:"Bangladesh · the record",
    title:"Numbers that should stop the room.",
    body:"Source: summit concept note and cited organisations. Detailed citations and methodology will accompany the evidence archive.",
  },
  {
    slug:"home-evidence-1951",
    parentSlug:"home",
    title:"22.05%",
    summary:"Hindu share of East Pakistan’s population in the 1951 census",
  },
  {
    slug:"home-evidence-2022",
    parentSlug:"home",
    title:"7.5%",
    summary:"Hindu share of Bangladesh’s population in the 2022 census",
  },
  {
    slug:"home-evidence-2024-25",
    parentSlug:"home",
    title:"2,710",
    summary:"Incidents recorded by BHBCUC from August 2024 to December 2025",
  },
  {
    slug:"home-evidence-2026",
    parentSlug:"home",
    title:"505",
    summary:"Incidents recorded across 62 districts from January to May 2026",
  },
  {
    slug:"home-programme-heading",
    parentSlug:"home",
    eyebrow:"Conference programme",
    title:"Understand. Engage. Inspire.",
    secondaryText:"Collaborate. Commit. Conclude.",
    linkLabel:"Explore both days",
    linkUrl:"/programme",
  },
  {
    slug:"home-speakers-heading",
    parentSlug:"home",
    eyebrow:"Voices in the room",
    title:"People carrying evidence into action.",
    linkLabel:"Meet the speakers",
    linkUrl:"/speakers",
  },
  {
    slug:"home-countdown-heading",
    parentSlug:"home",
    eyebrow:"The room opens in",
    title:"Paris, France",
  },
  {
    slug:"home-hero-countdown",
    parentSlug:"home",
    eyebrow:"Paris opens in",
    title:"Make the time count.",
    dateLabel:"03—04 / OCT",
  },
  {
    slug:"about-present-moment-heading",
    parentSlug:"about",
    eyebrow:"The present moment",
    title:"Fifty-six years after independence, structural and everyday pressures still shape daily life for Bangladesh's Hindu community.",
  },
  {
    slug:"about-outcomes-heading",
    parentSlug:"about",
    eyebrow:"Expected outcomes",
    title:"The goal is not a communiqué. It is a network ready to mobilise.",
  },
  {
    slug:"about-outcome-1",
    parentSlug:"about",
    title:"A jointly endorsed international declaration anchored in the minority-rights charter.",
  },
  {
    slug:"about-outcome-2",
    parentSlug:"about",
    title:"Commitments from parliamentarians and delegates to raise the issue through formal channels.",
  },
  {
    slug:"about-outcome-3",
    parentSlug:"about",
    title:"A standing international coordination network for campaigns, statements, and rapid response.",
  },
  {
    slug:"about-outcome-4",
    parentSlug:"about",
    title:"Direct legal, emergency, documentation, and media support for victims and defenders.",
  },
  {
    slug:"about-outcome-5",
    parentSlug:"about",
    title:"A sustained public calendar that keeps documented evidence visible after Paris.",
  },
  {
    slug:"context-evidence-source",
    parentSlug:"context",
    title:"Evidence source note",
    body:"Source: summit concept note and cited organisations. Detailed citations and methodology will accompany the evidence archive.",
  },
  {
    slug:"context-chapter-partition",
    parentSlug:"context",
    eyebrow:"1947–1971",
    title:"From partition to independence",
    summary:"Partition, outward migration, dispossession, and the changing place of religious minorities in East Pakistan shaped the conditions inherited by independent Bangladesh.",
  },
  {
    slug:"context-chapter-constitution",
    parentSlug:"context",
    eyebrow:"1972–present",
    title:"Constitutional contradiction",
    summary:"The 1972 Constitution enshrined secularism. Later amendments removed and then restored it while retaining Islam as the state religion—an unresolved tension between equality on paper and lived citizenship.",
  },
  {
    slug:"context-chapter-violence",
    parentSlug:"context",
    eyebrow:"Documented record",
    title:"Violence and protection failures",
    summary:"Minority organisations and international monitors document killings, arson, looting, attacks on homes and places of worship, sexual violence, land grabbing, intimidation, and blasphemy-related persecution.",
  },
  {
    slug:"context-charter-heading",
    parentSlug:"context",
    eyebrow:"The seven-point charter",
    title:"Goodwill is not a substitute for law.",
    summary:"Longstanding demands from minority-rights organisations call for enforceable protection, investigation, restitution, and equal access to public life.",
  },
  ...[
    "A comprehensive Minority Protection Act with real enforcement",
    "A National Minority Commission empowered to investigate complaints",
    "An Elimination of Discrimination Act covering employment, education, and public life",
    "An Intestate Property Protection Act securing inheritance rights",
    "Full implementation of the Vested Property Return Act",
    "Proper implementation of the Chittagong Hill Tracts Peace Accord and Hill Land Commission Act",
    "A separate Land Commission for plains-dwelling Adivasi and minority communities",
  ].map((title, index) => ({
    slug:`context-charter-${index + 1}`,
    parentSlug:"context",
    title,
    body:"Paris will examine the legal, institutional, documentation, and international-coordination steps required to move this demand from advocacy into enforceable practice.",
  })),
  {
    slug:"context-image-caption",
    parentSlug:"context",
    eyebrow:"The living record",
    title:"Behind every data point is a family deciding whether it can stay.",
  },
  ...[
    ["international-coordination", "International coordination", "Guest invitations, dignitary relations, speaker selection, international networking, and institutional partnerships."],
    ["operations-logistics", "Operations and logistics", "Venue coordination, delegate communication, visas, local administration, budget, travel, and participant support."],
    ["documentation-public-work", "Documentation and public work", "Official communications, the summit website, documentary production, outreach, media materials, and cultural initiatives."],
    ["regional-participation", "Regional participation", "Cross-border coordination with organisations and delegates from Bangladesh, India, Nepal, Afghanistan, Europe, and North America."],
  ].map(([slug, title, summary]) => ({
    slug:`committee-responsibility-${slug}`,
    parentSlug:"committee",
    title,
    summary,
  })),
  {
    slug:"committee-advisory-heading",
    parentSlug:"committee",
    eyebrow:"Strategic guidance",
    title:"Advisory Board",
    summary:"International outreach, partnerships, fundraising, and regional coordination carried by named advisors.",
  },
  {
    slug:"committee-team-heading",
    parentSlug:"committee",
    eyebrow:"Organising Committee",
    title:"Working across borders, disciplines, and responsibilities.",
  },
  {
    slug:"speakers-nomination",
    parentSlug:"speakers",
    eyebrow:"Programme participation",
    title:"Bring verified experience, research, or institutional responsibility to Paris.",
    linkLabel:"Contact the programme team",
    linkUrl:"/participate#contact",
  },
  {
    slug:"participate-attend-heading",
    parentSlug:"participate",
    eyebrow:"Attend in Paris",
    title:"Delegate registration",
  },
  {
    slug:"participate-support-heading",
    parentSlug:"participate",
    eyebrow:"Engage and support",
    title:"Choose how you can contribute.",
  },
  {
    slug:"participate-volunteer",
    parentSlug:"participate",
    title:"Volunteer",
    summary:"Support delegate welcome, production, documentation, translation, or event operations.",
    body:"Use the contact form below and select the relevant enquiry route.",
  },
  {
    slug:"participate-partner",
    parentSlug:"participate",
    title:"Partner or sponsor",
    summary:"Contribute institutional reach, expertise, travel support, production resources, or funding.",
    body:"Use the contact form below and select the relevant enquiry route.",
  },
  {
    slug:"participate-media",
    parentSlug:"participate",
    title:"Media accreditation",
    summary:"Request newsroom access, interview coordination, background materials, and safeguarding guidance.",
    body:"Use the contact form below and select the relevant enquiry route.",
  },
  {
    slug:"participate-donation-panel",
    parentSlug:"participate",
    eyebrow:"Fund the work",
    title:"Help evidence reach institutions capable of acting.",
    summary:"Online payments are not yet open. You can preview the contribution pathway without being charged.",
  },
  {
    slug:"participate-contact-heading",
    parentSlug:"participate",
    eyebrow:"Contact the summit",
    title:"Start the right conversation.",
    summary:"General enquiries · Registration · Media · Donation · Partnership",
  },
  {
    slug:"participate-registration-closed",
    parentSlug:"participate",
    eyebrow:"Registration is currently closed",
    title:"The delegate desk will open soon.",
    summary:"Event information remains available while the organisers prepare the next registration window.",
  },
  {
    slug:"participate-registration-success",
    parentSlug:"participate",
    eyebrow:"Registration received",
    title:"Your place in the room starts here.",
    summary:"The registration team can now review this record in the secure admin inbox and follow up with confirmation and practical information.",
  },
  {
    slug:"participate-registration-form",
    parentSlug:"participate",
    title:"Delegate details",
    summary:"Both programme days, printed materials, listed meals, and the closing gala dinner are included. Attendance remains subject to organiser confirmation.",
    body:"I consent to the organisers using these details to administer my registration and contact me about the summit.",
  },
  {
    slug:"support-intro",
    parentSlug:"support",
    eyebrow:"Contact pathways",
    title:"Choose the conversation. We will route it.",
    summary:"Every submission receives a reference and arrives in the protected admin inbox, where organisers can assign a status and retain an internal note.",
  },
  {
    slug:"support-form-success",
    parentSlug:"support",
    eyebrow:"Received",
    title:"Your message is now in the record.",
    summary:"The summit team can review and manage this enquiry in the secure admin inbox.",
  },
  {
    slug:"partners-heading",
    parentSlug:"partners",
    eyebrow:"Partners & sponsors",
    title:"Institutions standing in the record.",
    summary:"Organisations contributing policy reach, research, community networks, access, and practical support remain visible together.",
  },
  {
    slug:"regional-heading",
    parentSlug:"regional",
    eyebrow:"Beyond Bangladesh · regional forum",
    title:"Beyond Bangladesh: a regional crisis",
    summary:"Bangladesh is where this forum began, but South Asian Hindu minorities face the same story of shrinking numbers and unanswered violence well beyond its borders. Pakistan, Afghanistan, Nepal, and Myanmar are four of the starkest examples—and four reasons this forum exists for more than one country's diaspora.",
  },
  {
    slug:"donate-disabled",
    parentSlug:"donate",
    title:"Contribution desk coming soon",
    summary:"The organisers are preparing this pathway. No contribution can be recorded while donations are disabled in Global Site Settings.",
  },
  {
    slug:"donate-checkout",
    parentSlug:"donate",
    eyebrow:"Secure contribution desk",
    title:"Select a level to begin.",
    secondaryText:"Record your intention to contribute.",
    summary:"Online payments are not yet open. For now, this form securely records your contribution intention without taking payment.",
    body:"No payment is taken through this form.",
  },
  {
    slug:"donate-dialog",
    parentSlug:"donate",
    eyebrow:"Donations coming soon",
    title:"Support the work behind the testimony",
    summary:"Preview the contribution pathway. No payment will be taken.",
    body:"Donation intent recorded",
    secondaryText:"No payment was taken.",
    linkLabel:"Donate to the summit",
  },
  {
    slug:"media-empty",
    parentSlug:"media",
    eyebrow:"Editorial archive",
    title:"No publications are currently available.",
    summary:"Published books, reports, research papers, and media resources will be collected here.",
  },
  {
    slug:"resolution-outcomes-heading",
    parentSlug:"resolution",
    eyebrow:"After the resolutions",
    title:"Expected outcomes",
  },
  {
    slug:"strategy-timeline-heading",
    parentSlug:"strategy",
    eyebrow:"Five-year delivery",
    title:"Implementation Timeline",
  },
  {
    slug:"legal-draft-note",
    parentSlug:"legal",
    title:"This is a working draft and requires organiser/legal approval before public launch.",
  },
].map((entry, index) => ({
  category:"sectionCopy" as const,
  eyebrow:"",
  summary:"",
  body:"",
  secondaryText:"",
  linkLabel:"",
  linkUrl:"",
  dateLabel:"",
  timeLabel:"",
  ...entry,
  order:index + 1,
  featured:false,
}))

const cmsEntries = [
  ...sectionCopyEntries,
  {
    category: "pageCopy" as const,
    slug: "about",
    title: "A standing platform, not a single event",
    eyebrow: "About the summit",
    summary: 'A Global Forum on Religious Freedom and Hindu Minority Rights in Bangladesh convenes in Paris under the theme "Justice for Bangladeshi Hindus: Solidarity Without Borders". It is organised by an independent organising committee chaired by Dr Richard Benkin – a human rights activist, author and lecturer – together with social activists, human rights advocates, scholars, faith leaders and the global diaspora.',
    body: "",
    linkUrl: "/about",
    order: 1,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "context",
    title: "History, evidence, and the right to belong.",
    eyebrow: "Understanding the context",
    summary: "A concise public record of demographic decline, constitutional contradiction, documented violence, property loss, and the continuing struggle for equal citizenship.",
    body: "",
    linkUrl: "/context",
    order: 2,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "programme",
    title: "From testimony to the Paris Declaration.",
    eyebrow: "3–4 October 2026",
    summary: "Two days structured to understand the record, engage institutions, build practical commitments, and conclude with a shared declaration and sacred pledge.",
    body: "",
    linkUrl: "/programme",
    order: 3,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "speakers",
    title: "Voices carrying evidence into the room.",
    eyebrow: "Speakers and contributors",
    summary: "The confirmed and proposed contributors below represent the summit’s legal, geopolitical, community, cultural, and documentation work.",
    body: "",
    linkUrl: "/speakers",
    order: 4,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "committee",
    title: "Responsibility has a name.",
    eyebrow: "Organising committee",
    summary: "The committee brings together international advocacy, local operations, cultural work, digital communications, participant coordination, and fundraising.",
    body: "",
    linkUrl: "/committee",
    order: 5,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "advisory-board",
    title: "Guidance with an international horizon.",
    eyebrow: "International advisory board",
    summary:
      "Independent advisors bring experience in human rights, diplomacy, law, policy, community leadership, and international coordination to the summit’s continuing work.",
    body: "",
    linkUrl: "/advisory-board",
    order: 6,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "media",
    title: "The public record must travel.",
    eyebrow: "Media & Publication",
    summary: "Research, reports, interviews, releases, documentary work, and media resources designed to keep verified evidence visible before, during, and after Paris.",
    body: "",
    linkUrl: "/media",
    order: 7,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "participate",
    title: "There is more than one way to enter the work.",
    eyebrow: "Attend and support",
    summary: "Register as a delegate, volunteer, partner, sponsor, donor, or accredited member of the media.",
    body: "",
    linkUrl: "/participate",
    order: 7,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "engage",
    title: "There is more than one way to enter the work",
    eyebrow: "Attend and support",
    summary: "Register as a victim, delegate, researcher or presenter, general audience member, or accredited member of the media.",
    body: "",
    linkUrl: "/engage",
    order: 8,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "faq",
    title: "Practical answers before Paris.",
    eyebrow: "Frequently asked questions",
    summary: "Attendance, access, languages, programme information, media arrangements, and other practical details.",
    body: "",
    linkUrl: "/faq",
    order: 11,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "regional",
    title: "Beyond Bangladesh: a regional crisis",
    eyebrow: "Regional forum",
    summary: "Bangladesh is where this forum began, but South Asian Hindu minorities face the same story of shrinking numbers and unanswered violence well beyond its borders. Pakistan, Afghanistan, Nepal, and Myanmar are four of the starkest examples—and four reasons this forum exists for more than one country's diaspora.",
    body: "",
    linkUrl: "/regional",
    order: 9,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "partners",
    title: "Standing in the record.",
    eyebrow: "Institutional constellation",
    summary: "Partners and sponsors remain visible in an ordered institutional wall—grouped by the kind of commitment they make.",
    body: "",
    linkUrl: "/partners",
    order: 10,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "support",
    title: "Ask. Offer. Connect.",
    eyebrow: "A human route in",
    summary: "One public desk for practical support, partnership, volunteering, media enquiries and conversations with the summit team.",
    body: "",
    linkUrl: "/support",
    order: 11,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "donate",
    title: "Help the evidence travel.",
    eyebrow: "Stand with the summit",
    summary: "A transparent contribution pathway for documentation, participation, international advocacy and the work that continues after October.",
    body: "",
    linkUrl: "/donate",
    order: 12,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "agenda",
    title: "Proposed Agenda",
    eyebrow: "Working document · Paris 2026",
    summary: "Seventeen connected areas for protection, evidence, justice, international cooperation, and a sustainable future for Hindus in Bangladesh.",
    body: "",
    linkUrl: "/agenda",
    order: 13,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "resolution",
    title: "Paris Resolution — 2026",
    eyebrow: "Principal outcome document",
    summary: "A rights-based framework for protection, justice, community resilience, international cooperation, and accountable long-term action.",
    body: "",
    linkUrl: "/resolution",
    order: 14,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "strategy",
    title: "Five-Year Strategic Action Plan",
    eyebrow: "2027–2031",
    summary: "Eight strategic goals linking early warning, legal protection, research, livelihoods, leadership, humanitarian recovery, and institutional sustainability.",
    body: "",
    linkUrl: "/strategy",
    order: 15,
    featured: false,
  },
  {
    category: "pageCopy" as const,
    slug: "partnership-framework",
    title: "International Partnership Framework",
    eyebrow: "Strategic cooperation",
    summary: "A practical cooperation map spanning multilateral institutions, governments, civil society, universities, human-rights organisations, and development partners.",
    body: "",
    linkUrl: "/partnership-framework",
    order: 16,
    featured: false,
  },
  {
    category: "why" as const,
    slug: "why-evidence",
    title: "Evidence",
    eyebrow: "Why this summit",
    summary: "Bring verified testimony, research, and historical records into one international forum.",
    body: "The summit connects lived experience with accountable documentation.",
    order: 1,
    featured: true,
  },
  {
    category: "why" as const,
    slug: "why-protection",
    title: "Protection",
    eyebrow: "Why this summit",
    summary: "Translate evidence into enforceable safeguards for equal citizenship, worship, property, and public life.",
    body: "Rights become meaningful when institutions can act on them.",
    order: 2,
    featured: true,
  },
  {
    category: "why" as const,
    slug: "why-cooperation",
    title: "Cooperation",
    eyebrow: "Why this summit",
    summary: "Build an international network that continues after the Paris Declaration.",
    body: "The room is a beginning, not an endpoint.",
    order: 3,
    featured: true,
  },
  {
    category: "challenge" as const,
    slug: "challenge-dispossession",
    title: "Dispossession",
    eyebrow: "Document",
    summary: "Property loss, intimidation, and displacement continue to weaken community security.",
    body: "The forum brings legal, historical, and lived evidence into a shared record.",
    order: 1,
    featured: true,
  },
  {
    category: "challenge" as const,
    slug: "challenge-representation",
    title: "Representation",
    eyebrow: "Engage",
    summary: "Equal citizenship requires meaningful participation in institutions and public decision-making.",
    body: "Policy dialogue must include the people most affected.",
    order: 2,
    featured: true,
  },
  {
    category: "challenge" as const,
    slug: "challenge-continuity",
    title: "Continuity",
    eyebrow: "Protect",
    summary: "Communities need conditions in which faith, culture, memory, and family life can continue safely.",
    body: "Protection is measured across generations.",
    order: 3,
    featured: true,
  },
  {
    category: "presentMoment" as const,
    slug: "present-moment-property-seizure",
    title: "Land & property seizure",
    eyebrow: "Property rights",
    summary:
      "The legacy of the Vested Property Act continues to strip Hindu families of ancestral land despite a formal return process on paper.",
    body:
      "The legacy of the Vested Property Act continues to strip Hindu families of ancestral land despite a formal return process on paper.",
    order: 1,
    featured: true,
  },
  {
    category: "presentMoment" as const,
    slug: "present-moment-temple-attacks",
    title: "Temple & property attacks",
    eyebrow: "Freedom of worship",
    summary:
      "Vandalism and arson targeting temples, homes and businesses spike around elections and periods of political transition.",
    body:
      "Vandalism and arson targeting temples, homes and businesses spike around elections and periods of political transition.",
    order: 2,
    featured: true,
  },
  {
    category: "presentMoment" as const,
    slug: "present-moment-impunity",
    title: "Impunity for perpetrators",
    eyebrow: "Access to justice",
    summary:
      "Cases are frequently under-investigated or unresolved, leaving communities without confidence that justice will follow an attack.",
    body:
      "Cases are frequently under-investigated or unresolved, leaving communities without confidence that justice will follow an attack.",
    order: 3,
    featured: true,
  },
  {
    category: "presentMoment" as const,
    slug: "present-moment-underrepresentation",
    title: "Underrepresentation",
    eyebrow: "Equal citizenship",
    summary:
      "Hindus remain underrepresented in the civil service, judiciary, security forces and elected office relative to their population share.",
    body:
      "Hindus remain underrepresented in the civil service, judiciary, security forces and elected office relative to their population share.",
    order: 4,
    featured: true,
  },
  {
    category: "presentMoment" as const,
    slug: "present-moment-election-intimidation",
    title: "Election-cycle intimidation",
    eyebrow: "Political participation",
    summary:
      "Minority voters and candidates report intimidation intended to suppress turnout or political participation around national polls.",
    body:
      "Minority voters and candidates report intimidation intended to suppress turnout or political participation around national polls.",
    order: 5,
    featured: true,
  },
  {
    category: "presentMoment" as const,
    slug: "present-moment-emigration",
    title: "Continued emigration",
    eyebrow: "Community continuity",
    summary:
      "Insecurity and limited economic opportunity keep pushing younger generations to leave, accelerating the community’s demographic decline.",
    body:
      "Insecurity and limited economic opportunity keep pushing younger generations to leave, accelerating the community’s demographic decline.",
    order: 6,
    featured: true,
  },
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
    body: "Preview the contribution pathway and record an intention to support the summit without being charged.",
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
    summary: "Approved research papers, source notes, and downloadable references.",
    body: "Browse the public evidence archive and its supporting material.",
    linkLabel: "Open publications",
    linkUrl: "/media",
    order: 1,
    featured: true,
  },
  {
    category: "media" as const,
    slug: "press-room",
    title: "Press room",
    eyebrow: "Media",
    summary: "Accreditation, releases, background materials, and press contacts.",
    body: "Journalists can contact the media desk for accreditation and interview coordination.",
    linkLabel: "Contact media desk",
    linkUrl: "/support",
    order: 2,
    featured: true,
  },
  {
    category: "legal" as const,
    slug: "privacy",
    title: "Privacy notice",
    eyebrow: "Legal draft",
    summary: "How registration, enquiry, and contribution information is handled.",
    body: "The organising team uses submitted information only to respond, coordinate attendance, administer the event, and meet legal obligations. Access is limited to authorised organisers. Final retention periods and the legal entity responsible for processing must be approved before launch.",
    linkLabel: "",
    linkUrl: "",
    order: 1,
    featured: true,
  },
  {
    category: "legal" as const,
    slug: "terms",
    title: "Website terms",
    eyebrow: "Legal draft",
    summary: "Conditions for using the public information and registration services.",
    body: "Programme, speakers, and practical arrangements may change. Published research and media retain their stated ownership and citation requirements. Final organiser identity, governing law, and contact details must be approved before launch.",
    linkLabel: "",
    linkUrl: "",
    order: 2,
    featured: false,
  },
] as const

const seminarEntries = [
  {
    category: "overview" as const,
    slug: "overview-community-erasure",
    title: "A community being erased, one generation at a time",
    eyebrow: "Conference overview",
    summary:
      "Successive census periods record a steep decline in the Hindu share of the population, while families continue to face violence, dispossession, displacement, and pressure to conceal their identity.",
    body:
      "The forum treats demographic decline as a human record rather than an abstract trend. Behind every percentage are families deciding whether it is safe to remain, places of worship damaged or abandoned, property lost, and children learning how visible it is safe to be.",
    secondaryText:
      "The forum also places Bangladesh within a regional pattern affecting Hindu and Sikh communities in Pakistan and Afghanistan, connecting local testimony with a wider human-rights record.",
    order: 1,
    featured: true,
  },
  {
    category: "overview" as const,
    slug: "overview-why-forum",
    title: "Giving the voiceless a voice",
    eyebrow: "Why this forum",
    summary:
      "Paris places survivors, scholars, and community leaders directly before international institutions, allied governments, and a global press corps.",
    body:
      "For decades, testimony has often remained within local and Bengali-language reporting. The forum brings those accounts into an international, evidence-based record so recurring violations cannot be dismissed as isolated events.",
    secondaryText:
      "An international stage is a practical route from private suffering to documentation, policy engagement, legal attention, and sustained institutional pressure.",
    order: 2,
    featured: true,
  },
  {
    category: "overview" as const,
    slug: "overview-sustained-support",
    title: "What sustained support will build",
    eyebrow: "Beyond the forum",
    summary:
      "The Paris gathering is a launching point for long-term protection, legal capacity, economic resilience, documentation, and community leadership.",
    body:
      "Priorities include FoRB and human-rights training for Hindu youth; vocational training, livelihood grants, and cooperative support; legal aid for seized and vested property; continued documentation and rapid response; and stronger local institutions and youth leadership.",
    secondaryText:
      "The seminar paper calls for multi-year cooperation, diplomatic engagement, safe participation, and logistical support—not a one-time contribution tied only to the October event.",
    order: 3,
    featured: true,
  },
  {
    category: "advisory" as const,
    slug: "advisor-khalid-ahsas",
    title: "Khalid Ahsas",
    eyebrow: "Advisory Board",
    role: "Chief Advisor",
    summary:
      "International guests, speaker selection, seminar coordination, and fundraising.",
    body:
      "Invite internationally distinguished guests and dignitaries; assist in selecting speakers; support international seminar coordination; and assist fundraising activities.",
    order: 1,
    featured: true,
  },
  {
    category: "advisory" as const,
    slug: "advisor-phushpita-prasad",
    title: "Phushpita Prasad",
    eyebrow: "Advisory Board",
    role: "Advisor",
    summary:
      "Dignitary invitations, sponsor and partner coordination, international networking, and outreach.",
    body:
      "Invite internationally distinguished guests and dignitaries; coordinate sponsoring organisations and partner institutions; and support international networking and outreach.",
    order: 2,
    featured: true,
  },
  {
    category: "advisory" as const,
    slug: "advisor-sudha-jagannathan",
    title: "Sudha Jagannathan",
    eyebrow: "Advisory Board",
    role: "Advisor",
    summary:
      "Dignitary invitations, institutional coordination, international collaboration, and strategic partnerships.",
    body:
      "Invite internationally distinguished guests and dignitaries; coordinate sponsoring organisations and partner institutions; and expand international collaboration and strategic partnerships.",
    order: 3,
    featured: true,
  },
  {
    category: "advisory" as const,
    slug: "advisor-charan-singh",
    title: "Charan Singh",
    eyebrow: "Advisory Board",
    role: "Advisor",
    summary:
      "Participant coordination across Afghanistan, India, Nepal, and Bangladesh.",
    body:
      "Coordinate participants across South Asia; facilitate cross-border communication; and support participant coordination, travel arrangements, and logistics.",
    order: 4,
    featured: true,
  },
  ...[
    ["richard-benkin", "Dr. Richard L. Benkin", "President", "Lead dignitary invitations, keynote and panel selection, international coordination, fundraising, donor relations, and sponsor coordination."],
    ["anovesh-chakraborty", "Anovesh Chakraborty", "Vice-President", "Invite international guests, assist speaker selection, and support international seminar coordination."],
    ["richa-gautam", "Richa Gautam", "Vice President", "Support dignitary invitations, speaker selection, international coordination, fundraising, sponsors, and institutional partners."],
    ["suvra-dev-kar", "Suvra Dev Kar", "Vice President", "Coordinate participants from the Indian subcontinent, invitations, visas, website development, official email, and ICT activities."],
    ["dipan-mitra", "Dipan Mitra", "Organizing Secretary", "Prepare and manage the budget, coordinate the venue, oversee administration, and supervise local operations."],
    ["sujit-chakrabarty", "Sujit Chakrabarty", "Joint Organizing Secretary", "Assist seminar administration, logistics, participant coordination, and operational implementation."],
    ["mithun-kumar-das", "Mithun Kumar Das", "Joint Organizing Secretary", "Assist seminar administration, logistics, participant coordination, and operational implementation."],
    ["jony-sharma", "Jony Sharma", "Assistant Organising Secretary", "Assist seminar administration, logistics, participant coordination, and operational implementation."],
    ["wahidullah-shirzad", "Dr. Wahidullah Shirzad", "Organizing Executive", "Support administrative implementation, logistics, participant coordination, and operations."],
    ["obaidullah-baweri", "Dr. Obaidullah Baweri", "Organizing Executive", "Support administrative and operational implementation, logistics, and international participant coordination."],
    ["dulal-chandra-das", "Dulal Chandra Das", "Organizing Executive", "Support administrative and operational implementation, logistics, and international participant coordination."],
    ["rahul-kumar-das", "Rahul Kumar Das", "Organizing Executive", "Support administrative and operational implementation, logistics, and international participant coordination."],
    ["gobinda-saha", "Gobinda Saha", "Organizing Executive", "Support administrative implementation, logistics, participant coordination, and operations."],
    ["indranil-bhowmik", "Indranil Bhowmik", "Cultural Affairs Secretary", "Prepare promotional materials, manage digital communications, coordinate the documentary, and lead cultural awareness initiatives."],
    ["aditya-trivedi", "Advocate Aditya Trivedi", "Joint Cultural Affairs Secretary", "Invite South Asian delegates, support visas, coordinate human-rights organisations, and lead outreach campaigns."],
  ].map(([slug, title, role, body], index) => ({
    category: "team" as const,
    slug: `committee-${slug}`,
    title,
    eyebrow: "Organising Committee",
    role,
    summary: body,
    body,
    order: index + 1,
    featured: index < 5,
  })),
  ...[
    ["current-situation", "Assessment of the Current Situation", "Assess security, human rights, religious freedom, social conditions, economic conditions, violence, discrimination, displacement, exclusion, and the effectiveness of existing protections.", "An internationally credible situation assessment; an evidence base for policy recommendations; and increased international awareness."],
    ["victim-testimonies", "Victims’ Testimonies and Field Evidence", "Present survivor testimony, verified observations, photographs, video, and case studies while examining humanitarian, psychological, social, and economic consequences.", "Amplified survivor voices; greater understanding of humanitarian impact; and a reliable evidence base for research, advocacy, and legal initiatives."],
    ["human-rights-standards", "International Human Rights Standards and Commitments", "Review constitutional guarantees and commitments under the UDHR, ICCPR, ICESCR, and other relevant instruments; identify implementation gaps and opportunities for cooperation.", "Policy recommendations aligned with international standards and stronger national–international dialogue."],
    ["early-warning", "Early Warning, Rapid Action, and Prevention", "Develop risk assessment, threat monitoring, rapid information-sharing, GIS and data-analysis capacity, and coordinated preventive responses.", "Earlier identification of risk, stronger preventive capacity, and improved stakeholder coordination."],
    ["access-to-justice", "Access to Justice and Protection of Victims", "Expand legal assistance, professional case documentation, judicial monitoring, fair-process support, and international legal cooperation.", "Improved remedies, stronger legal cooperation, and greater confidence in protection mechanisms."],
    ["international-cooperation", "International Cooperation and Diplomatic Engagement", "Create a permanent coordination platform and engage the UN, EU, diplomatic missions, parliamentarians, universities, civil society, and international organisations.", "A sustainable international partnership network for policy, research, capacity-building, and protection."],
    ["vested-property", "Justice, Property Rights, and Vested Property", "Promote fair implementation of property law, time-bound dispute resolution, legal aid, land-record verification, digital documentation, and due process.", "Stronger property safeguards, transparent dispute resolution, and expanded access to remedies."],
    ["research-centre", "Research, Monitoring, and Early Warning Centre", "Consider an independent civilian centre for nationwide information collection, verification, analysis, secure documentation, risk alerts, and policy support.", "A sustainable monitoring and documentation framework capable of supporting preventive policy."],
    ["annual-reporting", "Documentation, Research, and Annual Reporting", "Develop recognised documentation methods, standard procedures, analytical reports, policy papers, annual human-rights reporting, and academic collaboration.", "Credible documentation, stronger research, and reliable information for policymakers."],
    ["media-advocacy", "Media Engagement and Public Awareness", "Develop international media relationships, documentaries, research publications, multilingual resources, and evidence-based awareness campaigns.", "Broader dissemination of verified information and stronger global public engagement."],
    ["youth-women", "Youth Leadership, Women’s Leadership, and Capacity Building", "Develop education, fellowships, exchanges, technology, research, legal-awareness, advocacy, and organisational leadership programmes.", "A skilled new generation of leaders and stronger participation by women and young people."],
    ["humanitarian-livelihoods", "Humanitarian Assistance, Rehabilitation, and Livelihoods", "Support education, healthcare, psychosocial care, rehabilitation, vocational training, entrepreneurship, employment, and development partnerships.", "Improved rehabilitation, sustainable livelihoods, economic resilience, and social reintegration."],
    ["property-framework", "Implementation of the Vested Property Legal Framework", "Advance legal and administrative reform, free legal assistance, digitised records, claim documentation, case monitoring, due process, and effective remedies.", "Greater transparency, efficiency, and legal protection in property disputes."],
    ["policy-coordination", "Evidence-Based Monitoring and Policy Coordination", "Build an integrated national research, data, technology, civil-society, and policy-support framework governed by impartiality, confidentiality, and data protection.", "Credible policy recommendations, preventive diplomacy, and stronger humanitarian response."],
    ["international-advisory-board", "Establishment of an International Advisory Board", "Create an independent body of human-rights experts, legal scholars, former judges, diplomats, academics, and policy specialists.", "A permanent international advisory mechanism with strategic guidance and implementation review."],
    ["paris-declaration", "Adoption of the Paris Declaration", "Adopt the principal outcome document and reaffirm religious freedom, equality, non-discrimination, dignity, and the rule of law.", "A common international policy framework and lasting reference for advocacy and cooperation."],
    ["long-term-framework", "Long-Term Strategy and Institutional Sustainability", "Develop a five-year plan, a professionally managed institution, annual forums, transparent governance, partnerships, and sustainable resource mobilisation.", "A durable platform for research, advocacy, legal support, capacity-building, and community empowerment."],
  ].map(([slug, title, body, outcomes], index) => ({
    category: "agenda" as const,
    slug: `agenda-${slug}`,
    title,
    eyebrow: `Agenda ${index + 1}`,
    summary: body,
    body,
    secondaryText: `Expected outcomes: ${outcomes}`,
    order: index + 1,
    featured: index < 4,
  })),
  ...[
    ["religious-freedom", "Freedom of Religion or Belief and Equal Rights", "Equal protection, freedom of religion or belief, non-discrimination, and access to justice."],
    ["community-security", "Human Rights and Community Security", "Lawful preventive and community-based measures, coordination, evidence-based policy, and peaceful conflict prevention."],
    ["research-centre", "International Research, Monitoring, and Documentation Centre", "An independent civilian institution for research, policy analysis, monitoring, verified documentation, reporting, and international cooperation."],
    ["property-rights", "Property Rights and Access to Justice", "Fair implementation of law, legal assistance, independent dispute resolution, land-record digitisation, and protection against unlawful deprivation."],
    ["victim-protection", "Legal Assistance and Protection of Victims", "Qualified representation, professional case documentation, fair process, and cooperation among legal, civil-society, and academic institutions."],
    ["humanitarian-rehabilitation", "Humanitarian Assistance and Community Rehabilitation", "Education, healthcare, psychosocial support, rehabilitation, and sustainable livelihood recovery."],
    ["economic-empowerment", "Economic Empowerment and Sustainable Development", "Skills, vocational education, entrepreneurship, employment, women’s empowerment, small business, and development partnerships."],
    ["youth-women", "Youth Leadership and Women’s Participation", "Leadership, participation in public life, human-rights education, civic engagement, fellowships, and training."],
    ["international-dialogue", "International Cooperation and Constructive Dialogue", "Evidence-based cooperation among the UN, governments, missions, universities, civil society, rights institutions, and development partners."],
    ["annual-review", "Annual International Review and Reporting", "An independent annual situation report, periodic reviews, and annual forums to assess implementation."],
    ["advisory-board", "International Advisory Board", "A distinguished expert body providing strategic guidance, independent expertise, and long-term policy recommendations."],
    ["institutional-development", "Long-Term Partnership and Institutional Development", "International partnerships, sustainable institutions, research, capacity building, dialogue, education, transparent governance, and peaceful advocacy."],
  ].map(([slug, title, body], index) => ({
    category: "resolution" as const,
    slug: `resolution-${slug}`,
    title,
    eyebrow: `Resolution ${index + 1}`,
    summary: body,
    body,
    order: index + 1,
    featured: index < 3,
  })),
  {
    category: "resolution" as const,
    slug: "resolution-final-declaration",
    title: "Final Declaration",
    eyebrow: "Shared commitment",
    summary:
      "Human dignity, equality, freedom of religion or belief, non-discrimination, justice, the rule of law, and peaceful international cooperation.",
    body:
      "Lasting protection requires constructive dialogue, evidence-based policymaking, accountable institutions, legal protection, sustainable development, and continued international engagement.",
    secondaryText:
      "Governments, international organisations, civil society, academic institutions, and development partners are encouraged to work together for equal rights, security, and dignity.",
    order: 13,
    featured: true,
  },
  ...[
    ["protection-early-warning", "Human Rights Protection, Security, and Early Warning", "Establish monitoring and early-warning capacity, trained local focal points, verified reporting, risk alerts, and cooperation with researchers, lawyers, and civil society."],
    ["justice-property", "Legal Protection, Justice, and Property Rights", "Expand legal aid, property dispute resolution, digital case monitoring, professional legal networks, and institutional reform."],
    ["international-advocacy", "International Advocacy and Diplomatic Engagement", "Engage UN mechanisms, governments, missions, parliamentarians, experts, rights organisations, and universities."],
    ["research-policy", "Research, Documentation, and Evidence-Based Policy", "Build secure archives, publish reports and thematic studies, and collaborate with universities, institutes, and think tanks."],
    ["economic-livelihoods", "Economic Empowerment and Sustainable Livelihoods", "Develop skills, entrepreneurship, women- and youth-led enterprise, employment partnerships, training, and financial inclusion."],
    ["humanitarian-recovery", "Humanitarian Assistance and Community Rehabilitation", "Expand education, healthcare, psychosocial care, rehabilitation, emergency response, resilience, and humanitarian partnerships."],
    ["youth-women", "Youth Leadership and Women’s Participation", "Create leadership programmes, fellowships, exchanges, civic education, and support for young researchers and community leaders."],
    ["institutional-framework", "Sustainable International Institutional Framework", "Create an International Board of Advisors, permanent Secretariat, annual policy forums, durable partnerships, and sustainable governance and finance."],
  ].map(([slug, title, body], index) => ({
    category: "strategy" as const,
    slug: `strategy-${slug}`,
    title,
    eyebrow: `Strategic goal ${index + 1}`,
    summary: body,
    body,
    dateLabel: "2027–2031",
    order: index + 1,
    featured: index < 3,
  })),
  ...[
    ["united-nations", "United Nations", "Human rights, FoRB, minority rights, SDGs, rule of law, justice, humanitarian support, resilience, and institutional capacity."],
    ["european-union", "European Union", "Human rights, democracy, rule of law, governance, civil society, research, youth leadership, economic empowerment, and capacity building."],
    ["united-states", "United States of America", "Human-rights research, legal assistance, academic exchange, policy dialogue, leadership, documentation, and humanitarian cooperation."],
    ["canada", "Canada", "Human-rights protection, resilience, inclusive governance, youth and women’s empowerment, research, education, and community development."],
    ["rights-organisations", "International Human Rights Organizations", "Independent documentation, capacity-building, legal research, technical assistance, monitoring, and advocacy."],
    ["universities", "Universities, Research Institutions, and Think Tanks", "Independent research, joint publications, policy analysis, fellowships, leadership development, and evidence-based policy."],
    ["development-partners", "Development Partners and Philanthropic Foundations", "Institutional development, humanitarian programmes, education, scholarships, employment, resilience, research, and innovation."],
  ].map(([slug, title, body], index) => ({
    category: "partnership" as const,
    slug: `partnership-${slug}`,
    title,
    eyebrow: "International cooperation",
    summary: body,
    body,
    secondaryText:
      "Expected outcome: stronger institutional cooperation, technical expertise, policy dialogue, and sustainable long-term support.",
    order: index + 1,
    featured: index < 4,
  })),
  {
    category: "partnership" as const,
    slug: "partnership-future-institutional-framework",
    title: "Future Institutional Framework",
    eyebrow: "Implementation and accountability",
    summary:
      "A five-year implementation framework will coordinate, monitor, and evaluate conference recommendations.",
    body:
      "The proposed governance structure includes an Advisory Board, Executive Committee, International Partners Forum, and Annual Review Committee. It will coordinate annual work plans, publish progress reports, support fundraising, and review priorities.",
    secondaryText:
      "Independent reviews will take place annually, with an international review conference every five years to assess progress and approve the next strategic plan.",
    order: 8,
    featured: true,
  },
  {
    category: "strategy" as const,
    slug: "strategy-vision",
    title: "Equal citizenship, durable protection, and a permanent international platform.",
    eyebrow: "Vision",
    summary:
      "A future in which Hindu minorities in Bangladesh can live with dignity, security, equal rights, and meaningful access to justice.",
    body:
      "The five-year plan connects evidence, early warning, legal protection, livelihoods, leadership, humanitarian support, and accountable international cooperation.",
    parentSlug: "vision",
    order: 0,
    featured: true,
  },
  ...[
    ["2027", "Foundation", "Establish governance, secure documentation standards, map partners, and launch the first coordinated annual work plan."],
    ["2028", "Protection", "Expand legal assistance, early-warning capacity, survivor support, and professional case documentation."],
    ["2029", "Partnership", "Deepen university, diplomatic, civil-society, and development partnerships across the international network."],
    ["2030", "Scale", "Extend livelihoods, youth and women’s leadership, research publication, and humanitarian recovery programmes."],
    ["2031", "Review and renew", "Publish the five-year evaluation, hold an international review conference, and agree the next strategic plan."],
  ].map(([year, title, body], index) => ({
    category: "strategy" as const,
    slug: `strategy-timeline-${year}`,
    title,
    eyebrow: "Implementation Timeline",
    summary: body,
    body,
    dateLabel: year,
    parentSlug: "timeline",
    order: 100 + index,
    featured: false,
  })),
] as const

const programmeDays = [
  { slug: "day-one", tabLabel: "Day 01", navigationLabel: "3 October", dateLabel: "Saturday · 3 October 2026", summary: "Evidence enters the public record.", order: 1 },
  { slug: "day-two", tabLabel: "Day 02", navigationLabel: "4 October", dateLabel: "Sunday · 4 October 2026", summary: "Evidence becomes commitment.", order: 2 },
] as const
const programmeSessions = [
  { daySlug: "day-one", slug: "opening-film-keynote", startTime: "09:30", endTime: "11:00", title: "Opening film and keynote", description: "Historical context, documented evidence, and the purpose of the Paris forum.", tag: "Opening", speakers: "Opening contributors", location: "Main assembly hall", order: 1 },
  { daySlug: "day-one", slug: "testimony-protection", startTime: "14:30", endTime: "16:00", title: "Testimony and legal protection", description: "Lived experience meets legal research and practical safeguards.", tag: "Working session", speakers: "Survivors, researchers, legal experts", location: "Main assembly hall", order: 2 },
  { daySlug: "day-two", slug: "policy-roundtable", startTime: "12:00", endTime: "13:30", title: "International policy roundtable", description: "Human-rights standards, property rights, justice, and cooperation.", tag: "Roundtable", speakers: "Policy and institutional delegates", location: "Main assembly hall", order: 1 },
  { daySlug: "day-two", slug: "paris-declaration", startTime: "16:00", endTime: "17:30", title: "Paris Declaration and Agni Sakshi", description: "Adoption of the shared declaration followed by the witnessed closing pledge.", tag: "Closing", speakers: "Summit delegates", location: "Main assembly hall", order: 2 },
] as const
const chartSeries = [
  { slug: "population-share", title: "A shrinking share of the nation.", eyebrow: "Demographic crisis", description: "Historic census markers show a long decline in the Hindu share of the population.", sourceLabel: "Summit concept note and cited census records", sourceUrl: "", unit: "%", order: 1 },
  { slug: "displacement", title: "Displacement accumulates across generations.", eyebrow: "Forced movement", description: "Period markers keep the human scale visible alongside the historical record.", sourceLabel: "Summit concept note and cited research", sourceUrl: "", unit: "M", order: 2 },
] as const
const chartPoints = [
  { seriesSlug: "population-share", label: "1941", sublabel: "Pre-partition census", value: 28, order: 1 },
  { seriesSlug: "population-share", label: "1974", sublabel: "Early Bangladesh", value: 13.5, order: 2 },
  { seriesSlug: "population-share", label: "2022", sublabel: "Recent census", value: 7.95, order: 3 },
  { seriesSlug: "displacement", label: "1964–71", sublabel: "Conflict and upheaval", value: 4.2, order: 1 },
  { seriesSlug: "displacement", label: "1971–2001", sublabel: "Post-independence decades", value: 5.3, order: 2 },
  { seriesSlug: "displacement", label: "2001–25", sublabel: "Continuing movement", value: 2.1, order: 3 },
] as const

export const seedInitialContent = internalMutation({
  args: {},
  returns: v.object({
    countriesInserted: v.number(),
    countriesUpdated: v.number(),
    organizationsInserted: v.number(),
    organizationsUpdated: v.number(),
    mediaSectionsUpserted: v.number(),
    settingsUpserted: v.number(),
    tiersUpserted: v.number(),
    cmsEntriesUpserted: v.number(),
    programmeDaysUpserted: v.number(),
    programmeSessionsUpserted: v.number(),
    chartSeriesUpserted: v.number(),
    chartPointsUpserted: v.number(),
  }),
  handler: async (ctx) => {
    const now = Date.now()
    let countriesInserted = 0
    const countriesUpdated = 0
    let organizationsInserted = 0
    const organizationsUpdated = 0
    let mediaSectionsUpserted = 0
    let settingsUpserted = 0
    let tiersUpserted = 0
    let cmsEntriesUpserted = 0
    let programmeDaysUpserted = 0
    let programmeSessionsUpserted = 0
    let chartSeriesUpserted = 0
    let chartPointsUpserted = 0

    for (const country of regionalCountries) {
      const existing = await ctx.db
        .query("regionalCountries")
        .withIndex("by_slug", (q) => q.eq("slug", country.slug))
        .first()
      const value = { ...country, status: "published" as const, updatedAt: now }

      if (existing) {
        // Seed defaults must never overwrite content edited in the admin panel.
      } else {
        await ctx.db.insert("regionalCountries", value)
        countriesInserted += 1
      }
    }

    for (const organization of organizations) {
      const existing = await ctx.db
        .query("organizations")
        .withIndex("by_slug", (q) => q.eq("slug", organization.slug))
        .first()
      const value = {
        ...organization,
        status: "published" as const,
        updatedAt: now,
      }

      if (existing) {
        // Preserve the live record and any media selected by an administrator.
      } else {
        await ctx.db.insert("organizations", value)
        organizationsInserted += 1
      }
    }

    for (const section of mediaSections) {
      const existing = await ctx.db
        .query("mediaSections")
        .withIndex("by_slug", (q) => q.eq("slug", section.slug))
        .first()
      const value = {
        ...section,
        status: "published" as const,
        updatedAt: now,
      }
      if (!existing) await ctx.db.insert("mediaSections", value)
      mediaSectionsUpserted += 1
    }

    const existingSettings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "primary"))
      .first()
    const settingsValue = {
      ...settings,
      key: "primary",
      updatedAt: now,
    }
    if (!existingSettings) {
      await ctx.db.insert("siteSettings", settingsValue)
    }
    settingsUpserted = 1

    for (const tier of donationTiers) {
      const existing = await ctx.db
        .query("donationTiers")
        .withIndex("by_slug", (q) => q.eq("slug", tier.slug))
        .first()
      const value = {
        ...tier,
        status: "published" as const,
        updatedAt: now,
      }
      if (!existing) await ctx.db.insert("donationTiers", value)
      tiersUpserted += 1
    }

    for (const entry of [...cmsEntries, ...seminarEntries]) {
      const optional = entry as typeof entry & {
        secondaryText?: string
        country?: string
        role?: string
        linkLabel?: string
        linkUrl?: string
        dateLabel?: string
        timeLabel?: string
        parentSlug?: string
      }
      const existing = await ctx.db
        .query("cmsEntries")
        .withIndex("by_slug", (q) => q.eq("slug", entry.slug))
        .first()
      const value = {
        category: entry.category,
        slug: entry.slug,
        title: entry.title,
        eyebrow: entry.eyebrow,
        summary: entry.summary,
        body: entry.body,
        secondaryText: optional.secondaryText ?? "",
        country: optional.country ?? "",
        role: optional.role ?? "",
        email: "",
        phone: "",
        linkLabel: optional.linkLabel ?? "",
        linkUrl: optional.linkUrl ?? "",
        dateLabel: optional.dateLabel ?? "",
        timeLabel: optional.timeLabel ?? "",
        parentSlug: optional.parentSlug ?? "",
        order: entry.order,
        status: "published" as const,
        featured: entry.featured,
        updatedAt: now,
      }
      if (!existing) {
        await ctx.db.insert("cmsEntries", value)
      } else if (
        existing.slug === "overview-community-erasure" &&
        existing.secondaryText ===
          "The supplied seminar paper also places Bangladesh within a regional pattern affecting Hindu and Sikh communities in Pakistan and Afghanistan. All public statistics remain subject to final source approval."
      ) {
        await ctx.db.patch(existing._id, {
          secondaryText: value.secondaryText,
          updatedAt: now,
        })
      } else if (
        existing.slug === "support-the-record" &&
        existing.body ===
          "The Stripe-ready donation experience runs in demo mode until the organisers add live credentials."
      ) {
        await ctx.db.patch(existing._id, { body: value.body, updatedAt: now })
      }
      cmsEntriesUpserted += 1
    }

    for (const item of programmeDays) {
      const existing = await ctx.db.query("programmeDays").withIndex("by_slug", (q) => q.eq("slug", item.slug)).first()
      const value = { ...item, status: "published" as const, updatedAt: now }
      if (!existing) await ctx.db.insert("programmeDays", value)
      programmeDaysUpserted += 1
    }
    for (const item of programmeSessions) {
      const rows = await ctx.db.query("programmeSessions").withIndex("by_day_slug_and_order", (q) => q.eq("daySlug", item.daySlug)).take(50)
      const existing = rows.find((row) => row.slug === item.slug)
      const value = { ...item, status: "published" as const, updatedAt: now }
      if (!existing) await ctx.db.insert("programmeSessions", value)
      programmeSessionsUpserted += 1
    }
    for (const item of chartSeries) {
      const existing = await ctx.db.query("chartSeries").withIndex("by_slug", (q) => q.eq("slug", item.slug)).first()
      const value = { ...item, status: "published" as const, updatedAt: now }
      if (!existing) {
        await ctx.db.insert("chartSeries", value)
      } else if (
        (existing.sourceLabel ===
          "Supplied summit concept note — source approval pending" ||
          existing.sourceLabel ===
            "Supplied summit concept note — methodology approval pending")
      ) {
        await ctx.db.patch(existing._id, {
          sourceLabel: value.sourceLabel,
          description: value.description,
          updatedAt: now,
        })
      }
      chartSeriesUpserted += 1
    }
    for (const item of chartPoints) {
      const rows = await ctx.db.query("chartPoints").withIndex("by_series_slug_and_order", (q) => q.eq("seriesSlug", item.seriesSlug)).take(100)
      const existing = rows.find((row) => row.label === item.label)
      const value = { ...item, updatedAt: now }
      if (!existing) await ctx.db.insert("chartPoints", value)
      chartPointsUpserted += 1
    }

    return {
      countriesInserted,
      countriesUpdated,
      organizationsInserted,
      organizationsUpdated,
      mediaSectionsUpserted,
      settingsUpserted,
      tiersUpserted,
      cmsEntriesUpserted,
      programmeDaysUpserted,
      programmeSessionsUpserted,
      chartSeriesUpserted,
      chartPointsUpserted,
    }
  },
})

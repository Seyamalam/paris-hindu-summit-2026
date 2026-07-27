# Product specification checklist

Last reviewed: 27 July 2026
Source of truth: `Paris_Website_Spec.pdf`, supplied 26 July 2026
Target launch: August 2026
Event: 3–4 October 2026

This is the living delivery checklist for the public website, admin panel, content
model, integrations, and launch. Update a checkbox only when the behaviour has
been implemented and verified in both the development and production Convex
deployments where data is involved.

For the full delivered-feature inventory, see
[`COMPLETED_WORK_CHECKLIST.md`](COMPLETED_WORK_CHECKLIST.md).
For the exact boundary between editable editorial copy and code-owned interface
text, see [`CONTENT_EDITABILITY_AUDIT.md`](CONTENT_EDITABILITY_AUDIT.md).

## Status legend

- `[x]` Implemented and verified
- `[ ]` Not yet implemented
- `Partial` exists, but does not yet meet the supplied specification
- `Decision` requires organiser/client approval

## Confirmed product decisions

- [x] Theme Showcase No. 06 is the visual direction, with matching light and dark modes.
- [x] Nepal is included in Beyond Bangladesh alongside Pakistan, Afghanistan, and Myanmar.
- [x] Beyond Bangladesh is data-driven: admins can add more countries and edit their details.
- [x] Partners and sponsors use a stationary, tiered institutional wall rather than a slider or marquee.
- [x] Convex is the central content store and file/image storage service.
- [x] Public content changes must publish without a new frontend deployment.
- [x] Donation will use Stripe; payment credentials and final account setup are pending.
- [x] Registration and donation entry points remain visible in desktop and mobile navigation.
- [x] Working delivery decision: retain the complete homepage plus detail pages for deep content and SEO.
- [x] Working delivery decision: retain “Paris Assembly” as the short public brand while preserving the formal forum name in settings.
- [x] Admin access uses named Better Auth email/password accounts, role records, and an audit trail.
- [x] Public account creation is disabled after bootstrap; administrators provision and suspend named team accounts from the protected Team Access panel.
- [x] Public-page rendering is independent from admin authentication lookups, so an auth delay cannot block the entire website.
- [x] Performance pass covers stable initial layout, reduced homepage JavaScript, off-screen rendering containment, efficient reveal observers, and visibility-aware countdown timers.

## Public website

### Global shell and navigation

- [x] Fixed navigation remains available while scrolling.
- [x] Light/dark theme control is available on all routes and remembers preference.
- [x] Responsive desktop and mobile navigation.
- [x] Admin-editable announcement strip is visible above the fixed public header.
- [x] Event logo/brand links to Home.
- [x] About dropdown includes the specified detailed routes.
- [x] Dynamic Programme dropdown is generated from published programme days.
- [x] Beyond Bangladesh entry links to the regional section.
- [x] Dynamic Media dropdown is generated from published media records. `Partial`: final client-approved category content remains.
- [x] Dynamic Engage dropdown is generated from published engagement cards.
- [x] Donate is available in desktop and mobile navigation; Register is available in the mobile menu and participation routes. `Partial`: add a second desktop Register button after client approval.

### Homepage section order and content

- [x] Design 06 hero foundation, event date/location, headline, primary CTAs, and responsive typography.
- [x] Live countdown prototype.
- [x] Dynamic hero information bar: Venue, Format, Delegates, Languages.
- [x] Admin-managed “Why This Summit” rationale cards.
- [x] Featured-speaker teaser is driven by the admin Featured flag and enforces a maximum of three published records.
- [x] When no speaker is marked Featured, the homepage shows up to the first three published speaker records instead of stale code fixtures.
- [x] Partners & Sponsors institutional wall; no slider.
- [x] Editable demographic chart, source note, tooltip, and accessible data table. `Partial`: approved citations remain.
- [x] Editable displacement chart, note, tooltip, and accessible data table.
- [x] Admin-managed dark Challenges section.
- [x] Beyond Bangladesh includes Pakistan, Afghanistan, Myanmar, and Nepal.
- [x] Regional cards are backed by an extensible Convex country model.
- [x] Dedicated animated Donate and Support pages with server-backed demo behaviour and Stripe-ready architecture.
- [x] Full persistent Registration section with required fields, consent, reference, and admin inbox workflow.
- [x] Footer foundation.
- [x] Footer navigation, managed email, registration, donate, social and legal links.

### Detailed content

- [x] Overview is editable from Admin.
- [x] About includes the client-approved hero copy and an editable six-card “Present Moment” section.
- [x] Organizing Team is editable from Admin.
- [x] Advisory Board is editable from Admin and published on the Committee page.
- [x] Proposed Agenda is editable from Admin and published on `/agenda`.
- [x] Paris Resolution 2026 is editable from Admin and published on `/resolution`.
- [x] Five-Year Strategic Plan is editable from Admin and published on `/strategy`.
- [x] International Partnership Framework is editable from Admin and published on `/partnership-framework`.
- [x] Why This Summit is editable from Admin.
- [x] Beyond Bangladesh content is modelled as editable country records.

## Registration

- [x] Registration includes both programme days, printed materials, listed meals, and closing gala dinner.
- [x] Facts show dates, full venue address, and English/French/Bengali interpretation.
- [x] First name is required.
- [x] Last name is required.
- [x] Email is required.
- [x] WhatsApp contact number is required.
- [x] Organisation is optional.
- [x] “Attending as” options match Survivor, Delegate, Audience, Researcher-Speaker, defaulting to Delegate.
- [x] Registrations persist to Convex and can be exported as CSV from Admin.
- [x] Success confirmation UI exists.
- [x] Privacy draft, consent language, honeypot and per-email rate protection, admin reference and inbox workflow exist. `Partial`: client approval, retention period and external email notifications remain.
- [x] Header, mobile menu, Engage and footer registration links reach the registration route.

## Donation and Stripe

- [x] Demonstration donation flow exists and records demo contributions in Convex.
- [x] Donation headings and supporting copy are admin-editable.
- [x] Admin-managed tiers for €25, €100, €500, and Other amount.
- [x] Stripe Checkout session is created server-side; secret key is never exposed to the browser or stored in content records.
- [x] Stripe webhook verifies signatures and records completed or expired Checkout sessions. `Partial`: refund/dispute event handling remains before launch.
- [x] Payment price identifiers are stored behind authorised admin mutations.
- [x] Custom amount has client and server minimum/maximum validation.
- [x] Stripe success/cancel return routes and a clear demo result state.
- [ ] Donation receipt and organiser notification.
- [ ] Currency, tax/charity wording, refund policy, privacy wording, and legal entity are approved before activation.

## Admin panel

### Security and publishing

- [x] `/admin` has a dedicated Better Auth email/password sign-in and account setup screen.
- [x] Admin mutations verify Better Auth identity and an active role record on the server.
- [x] Passwords are handled by Better Auth and never stored in application tables.
- [x] Roles: Administrator and Editor.
- [x] Invitation-only Team Access panel supports account creation, role selection, suspension, restoration, and last-administrator safeguards.
- [x] Draft/published status for public content.
- [x] Audit events and update timestamps for editorial operations.
- [x] Destructive content actions require confirmation; referenced files cannot be deleted until detached.
- [x] Admin opens into a visual Page Studio with a live public-page canvas and adjacent page-specific inspector.
- [x] Desktop, tablet, and mobile canvas controls render the selected public page at its target viewport width.
- [x] Website pages and operational tools are separated into clear navigation groups.
- [x] Home-page settings can be published from the inspector or the global Publish Changes action, with automatic preview refresh.
- [x] Programme, people, regional, partner, media, engagement, support, evidence, and extended content editors are available beside their corresponding live pages.
- [x] Forms, donations, media storage, team access, dashboard metrics, and activity are retained in a separate Operations workspace.
- [x] All Convex-backed saves update public queries reactively without a code deployment.
- [x] Global Site Settings are bound to the public hero, event facts, rationale, donation invitation, registration/donation availability, header, and footer rather than duplicated static copy.
- [x] Page titles, eyebrows, and introductory paragraphs for all principal public pages are editable through a dedicated Page Titles & Intros inspector.
- [x] All remaining visible editorial headings, paragraphs, captions, fixed list items, calls to action, shared header/footer language, and operational content notices are editable through page-grouped Editorial Sections records.
- [x] Record switching in the right-hand inspector uses labelled dropdowns instead of horizontally scrolling record chips.
- [x] Privacy and Terms records are reachable through the Other Content inspector.

### General tab — dynamic

- [x] Event name, theme/tagline, date/time/timezone, venue, full address, format, delegates, and languages. `Partial`: logo selection from the media library remains.
- [x] Admin-managed event start time drives the public countdown.
- [x] Announcement content and enabled state.
- [x] Contact, registration and press emails, phone, and WhatsApp.
- [x] Facebook, X/Twitter, Instagram, and YouTube links.
- [x] Donation tier labels and optional Stripe price references.
- [x] Footer title/body. `Partial`: legal-link records remain.

### Programme tab — dynamic

- [x] Add, edit, remove, reorder, draft, and publish day tabs.
- [x] Day fields include tab label, navigation label, date, summary, and order.
- [x] Add, edit, remove, reorder, draft, and publish sessions per day.
- [x] Admin can publish every prepared programme draft in one explicit action; public queries continue to exclude drafts.
- [x] Admin session editors are grouped by programme day; each editor has a locked day assignment and cannot display another day’s sessions.
- [x] Session fields include start/end time, title, description, tag, speakers, location, and order.

### Engage tab — dynamic

- [x] Add, edit, remove, reorder, draft, and publish engagement cards.
- [x] Fields: title, description, supporting copy, link text, link destination, featured flag, and order. `Partial`: selectable icons remain.

### Speakers tab — dynamic

- [x] Add, edit, remove, reorder, draft, and publish speaker records.
- [x] Purpose-built speaker editor uses client-facing fields: name, short introduction shown below the name, country, biography, direct profile-picture upload/selection, order, and publication state.
- [x] The public Speakers page now reads published speaker records from Convex instead of a code-only list.
- [x] Featured toggle drives the homepage teaser and the backend enforces the approved maximum of three.
- [x] Speaker views do not substitute removed or unpublished records with hard-coded fallback people.

### Organizing Team and Advisory Board tabs — dynamic

- [x] One purpose-built “Organizing Team and Advisory Board” editor switches between both groups.
- [x] Team and Advisory Board fields support name, short introduction, biography, direct profile-picture upload/selection, order, and publication state.
- [x] Published portraits and biographies render on the public committee page.

### Partners & Sponsors tab — dynamic

- [x] Data model supports partner/sponsor type, tier, description, order, draft/published state, optional website, and optional Convex logo storage ID.
- [x] Admin CRUD, order, and publish controls.
- [x] Authenticated Convex media upload exists, with direct logo upload and managed-logo selection inside the partner editor.
- [x] Public presentation is a stable tiered institutional wall, not a slider, and displays both an attached logo and the organisation name.

### Media & Publications tab — dynamic

- [x] Public and admin navigation label is “Media & Publication”.
- [x] Admin can create, order, draft, publish, and remove submenu sections such as Books, Government Reports, and Research & Briefings.
- [x] Every publication belongs to a submenu section and supports title, description, optional cover image, uploaded file, order, and publication state.
- [x] Direct cover and PDF/Word/PowerPoint upload uses Convex storage; stored IDs, not expiring URLs, are persisted.
- [x] The public Media & Publication page renders published sections and downloadable files reactively.
- [x] Media covers and publication files cannot be deleted while referenced.

### Purpose-built About document editors

- [x] About inspector exposes only Overview and Present Moment records, with page-relevant labels and without unrelated contact, date, link, and parent fields.
- [x] Present Moment cards support heading, body, order, draft, and publication state.
- [x] Proposed Agenda editor exposes agenda number, title, discussion points, and expected outcome.
- [x] Paris Resolution editor exposes resolution number, title, summary, and expected outcomes; published outcomes appear after the resolution list.
- [x] 5-Year Strategic Plan editor supports a Vision above all goals, numbered strategic goals, key actions, expected outcomes, and year-based “Implementation Timeline” cards.
- [x] International Partnership Framework editor exposes country/institution name, area of cooperation, and expected outcomes.

### Population and displacement tabs — dynamic

- [x] Chart series: title, description, unit, source and order.
- [x] Population points: census year, context, numeric value and order.
- [x] Displacement points: period, sublabel, numeric value and order.
- [x] Charts validate non-negative values and remain accessible as data tables.

### Beyond Bangladesh tab — dynamic

- [x] Country fields: slug, name, code, eyebrow, headline, summary, detail, source link, optional Convex image, order, and draft/published state.
- [x] Seed includes Pakistan, Afghanistan, Myanmar, and Nepal.
- [x] Admin CRUD, order, draft, and publish controls with the public Regional page visible alongside the editor.
- [ ] Approved source/citation URLs for every published country. `Partial`: the field is editable, but existing supplied country records do not yet include approved sources and remain publishable while citations are prepared.

## Convex content and file architecture

- [x] `regionalCountries`, `organizations`, and `assets` initial schema.
- [x] Public reads use indexed queries and return resolved storage URLs rather than persisting URLs.
- [x] File records store `Id<"_storage">`; temporary storage URLs are never stored.
- [x] Authenticated upload URL generation.
- [x] Upload validates extension, MIME type, byte size, minimum image dimensions and mandatory custom alt text.
- [x] Allowlist: JPEG, PNG, WebP, AVIF and PDF; SVG is rejected.
- [ ] Image transformations/thumbnail strategy.
- [x] Referenced files are protected from deletion; safe replacement still requires client workflow testing.
- [x] General settings, flexible CMS, programme days/sessions, chart series/points, donation tiers, submissions, donations, admin users and audit events are modelled.

## Static vs dynamic boundary

Keep these in code:

- [x] Design tokens, typography, responsive grid, reusable components, accessibility behaviour, route/layout shell, and validation rules.
- [x] Convex schema, secure server functions, Stripe integration code, and role enforcement.

Move these to Convex and expose through Admin:

- [x] Event facts, contact/social links, announcement, footer content, and donation tiers.
- [x] Principal public-page hero labels, titles, and introductions.
- [x] Navigation labels are generated from programme, media, engage, and detailed content.
- [x] People, partners/sponsors, regional countries, media, programme, chart series, and detailed editorial copy are supported.
- [x] Logos, portraits, thumbnails, downloadable files, and alt text/metadata can be stored in the Convex media library. `Partial`: polished attachment pickers remain.
- [x] Remaining editorial section framing is represented by named, layout-safe Convex records rather than a generic unstructured page builder.

Never make these editable as plain content:

- [x] Secrets, Stripe secret/webhook keys, auth signing keys, admin role enforcement, database validators, and executable code.

## Delivery operations

- [x] `.env.local` is ignored by Git.
- [x] Development and production Convex deployments are configured.
- [x] Separate ignored development and production deploy-key files allow
  Convex commands to run without the active CLI account session.
- [x] Package scripts explicitly select the intended deployment and prevent a
  production deploy from accidentally targeting development.
- [x] Every schema/function change passes `bun run typecheck`.
- [x] Every app change passes `bun run lint` and `bun run build`.
- [x] After every Git commit, run `bun run convex:deploy:prod`.
- [x] If fixture/seed data changes in development, run the same idempotent seed in production and verify counts.
- [x] Production seeds contain no registrations, donor data, credentials, tokens, or personal accounts.
- [ ] Production backup/export and restore drill before launch.
- [x] Automated and manual accessibility pass covers keyboard navigation, focus, contrast, reduced motion, form errors and chart data-table alternatives. `Partial`: final third-party audit remains a launch-day check.
- [x] Responsive QA covers compact mobile, tablet and desktop layouts. `Partial`: final physical-device and Safari/Firefox sign-off remains.
- [x] All 20 public routes are browser-verified without horizontal overflow at 320px, 390px, 768px, 1024px, and 1280px.
- [x] Mobile navigation fits a 320px viewport, scrolls vertically, wraps long labels, preserves touch targets, and exposes Programme and Partners.
- [x] Support forms, public document layouts, long editorial headings, shared footer content, and homepage record grids have explicit compact and tablet treatments.
- [x] Hero countdown digits, separators, labels, live indicator, and date row fit without clipping at 320px and 360px compact-phone widths.
- [x] Visitor-facing placeholder sweep completed; empty states are neutral and operational “coming soon” messages remain intentionally tied to availability settings.
- [ ] Content approval, legal/privacy approval, Stripe live-mode test, analytics/consent decision, and launch checklist.

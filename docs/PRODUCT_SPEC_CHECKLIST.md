# Product specification checklist

Last reviewed: 26 July 2026  
Source of truth: `Paris_Website_Spec.pdf`, supplied 26 July 2026  
Target launch: August 2026  
Event: 3–4 October 2026

This is the living delivery checklist for the public website, admin panel, content
model, integrations, and launch. Update a checkbox only when the behaviour has
been implemented and verified in both the development and production Convex
deployments where data is involved.

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
- [ ] Decision: reconcile the PDF’s single-page anchored navigation with the existing eight-page build. Recommended: a complete anchored homepage plus optional detail pages for deep content and SEO.
- [ ] Decision: confirm final public brand name. The PDF specifies “Global Forum on Religious Freedom and Hindu Minority Rights in Bangladesh”; the current UI uses “Paris Assembly”.
- [ ] Decision: confirm whether admin access uses named organiser accounts or one shared password. Recommended: named password-based accounts with an explicit admin allowlist and audit trail.

## Public website

### Global shell and navigation

- [x] Fixed navigation remains available while scrolling.
- [x] Light/dark theme control is available on all routes and remembers preference.
- [x] Responsive desktop and mobile navigation.
- [ ] Announcement strip: “Delegate registration open”.
- [ ] Event logo/brand links to Home.
- [ ] About dropdown: Overview, Organizing Team, Advisory Council, Proposed Agenda, Paris Resolution 2026, Five-Year Strategic Plan, International Partnership Framework.
- [ ] Dynamic Programme dropdown generated from programme-day data.
- [x] Beyond Bangladesh entry links to the regional section.
- [ ] Media & Publication dropdown: Books, Research Papers, Government Reports, Videos and Images, Articles.
- [ ] Dynamic Engage dropdown generated from engage-card data.
- [ ] Dedicated Donate and Register header buttons on desktop and mobile.

### Homepage section order and content

- [x] Design 06 hero foundation, event date/location, headline, primary CTAs, and responsive typography.
- [x] Live countdown prototype.
- [ ] Hero info bar: Venue, Format, Delegates, Languages.
- [ ] “Why This Summit” with the three specified rationale cards.
- [x] Featured-speaker teaser exists. `Partial`: must be driven by the admin Featured flag and enforce the approved maximum.
- [x] Partners & Sponsors institutional wall; no slider.
- [ ] Demographic Crisis statistics plus editable historical chart and source note. `Partial`: statistics exist; chart and approved sourcing are missing.
- [ ] Displacement chart with editable period data and note.
- [ ] Dark Challenges section.
- [x] Beyond Bangladesh includes Pakistan, Afghanistan, Myanmar, and Nepal.
- [x] Regional cards are backed by an extensible Convex country model.
- [ ] Full Donate / Support section matching supplied copy and Stripe behaviour. `Partial`: mock donation interaction exists.
- [ ] Full Registration section matching supplied fields and confirmation behaviour. `Partial`: registration form exists on `/participate`.
- [x] Footer foundation.
- [ ] Footer navigation columns, approved email, registration desk link, donate link, and social links.

### Detailed content

- [ ] Overview is editable from Admin.
- [ ] Organizing Team is editable from Admin.
- [ ] Advisory Council is editable from Admin.
- [ ] Proposed Agenda is editable from Admin.
- [ ] Paris Resolution 2026 is editable from Admin.
- [ ] Five-Year Strategic Plan is editable from Admin.
- [ ] International Partnership Framework is editable from Admin.
- [ ] Why This Summit is editable from Admin.
- [x] Beyond Bangladesh content is modelled as editable country records.

## Registration

- [ ] Section heading and inclusions match the specification: both programme days, printed materials, listed meals, and closing gala dinner.
- [ ] Facts show dates, full venue address, and English/French/Bengali interpretation.
- [x] First name is required.
- [x] Last name is required.
- [x] Email is required.
- [ ] WhatsApp contact number is required.
- [x] Organisation is optional.
- [ ] “Attending as” options exactly match Survivor, Delegate, Audience, Researcher-Speaker, with a valid default.
- [ ] Form submissions persist to the approved backend. Recommended: Convex registration records rather than a Google Form endpoint, with export capability for organisers.
- [x] Success confirmation UI exists.
- [ ] Privacy notice, consent language, retention period, spam protection, and organiser notification workflow are approved.
- [ ] Hero, header, mobile menu, and footer registration links all deep-link to the form.

## Donation and Stripe

- [x] Mock donation flow exists for design/interaction review.
- [ ] Display the approved “Support the Summit” copy.
- [ ] Admin-managed tiers for €25, €100, €500, and Other amount.
- [ ] Stripe Checkout session is created server-side; secret key is never exposed to the browser or stored in content records.
- [ ] Stripe webhook verifies signatures and records successful, failed, refunded, and disputed states idempotently.
- [ ] Payment links/product or price identifiers are editable only by authorised admins.
- [ ] Custom amount has client and server minimum/maximum validation.
- [ ] Success and cancel states.
- [ ] Donation receipt and organiser notification.
- [ ] Currency, tax/charity wording, refund policy, privacy wording, and legal entity are approved before activation.

## Admin panel

### Security and publishing

- [ ] `/admin` has a dedicated sign-in screen and route protection.
- [ ] Admin mutations verify identity and an admin allowlist on the server; hiding buttons is not access control.
- [ ] Passwords are handled by the selected auth provider and never stored directly in Convex tables.
- [ ] Roles: at minimum Administrator and Editor.
- [ ] Draft/published status for public content.
- [ ] Audit fields: created by, updated by, created at, updated at.
- [ ] Destructive actions require confirmation; referenced files cannot be silently orphaned.
- [ ] Preview before publish.
- [ ] All saves update the public site reactively without a code deployment.

### General tab — dynamic

- [ ] Event name, theme/tagline, logo, date/time/timezone, venue, full address, format, delegates, and languages.
- [ ] Event date/time drives countdown.
- [ ] Announcement strip content and enabled state.
- [ ] Contact email.
- [ ] Facebook, X/Twitter, Instagram, and YouTube links.
- [ ] Donation tier labels and Stripe configuration references.
- [ ] Footer copy and legal links.

### Programme tab — dynamic

- [ ] Add, edit, remove, reorder, draft, and publish day tabs.
- [ ] Day fields include tab label, navigation label, date, summary, and order.
- [ ] Add, edit, remove, and reorder sessions per day.
- [ ] Session fields include time, end time, title, description, tag, speakers, location, and order.

### Engage tab — dynamic

- [ ] Add, edit, remove, reorder, draft, and publish engagement cards.
- [ ] Fields: title, description, link text, link destination, icon, and order.

### Speakers tab — dynamic

- [ ] Add, edit, remove, reorder, draft, and publish speakers.
- [ ] Fields: name, tag/role, professional role, country, biography, photo, and photo alt text.
- [ ] Featured toggle controls homepage teaser and enforces the client-approved maximum.

### Organizing Team and Advisory Council tabs — dynamic

- [ ] Team fields: name, role, biography, photo, alt text, duties, and order.
- [ ] Advisory fields: icon, title/name, role, biography, and order.

### Partners & Sponsors tab — dynamic

- [x] Data model supports partner/sponsor type, tier, description, order, draft/published state, optional website, and optional Convex logo storage ID.
- [ ] Admin CRUD, reorder, publish controls, and logo upload.
- [x] Public presentation is a stable tiered institutional wall, not a slider.

### Media & Publications tab — dynamic

- [ ] Categories: Books, Research Papers, Government Reports, Videos and Images, Articles.
- [ ] Fields: title, description, metadata/date, category, external link, optional download file, thumbnail, alt text, and order.
- [ ] Safe file replacement and deletion workflow.

### Population and displacement tabs — dynamic

- [ ] Crisis statistics: value, label, source, order.
- [ ] Population chart points: census year, value, source/note.
- [ ] Displacement points: period, sublabel, value, source/note.
- [ ] Charts validate numeric ranges and remain accessible as data tables.

### Beyond Bangladesh tab — dynamic

- [x] Country fields: slug, name, code, eyebrow, headline, summary, detail, source link, optional Convex image, order, and draft/published state.
- [x] Seed includes Pakistan, Afghanistan, Myanmar, and Nepal.
- [ ] Admin CRUD, reorder, preview, and publish controls.
- [ ] Source/citation fields are required before a country can be published.

## Convex content and file architecture

- [x] `regionalCountries`, `organizations`, and `assets` initial schema.
- [x] Public reads use indexed queries and return resolved storage URLs rather than persisting URLs.
- [x] File records store `Id<"_storage">`; temporary storage URLs are never stored.
- [ ] Authenticated upload URL generation.
- [ ] Upload completion validates MIME type, extension, byte size, dimensions, and required alt text before creating an asset record.
- [ ] Allowlist initial formats: JPEG, PNG, WebP, AVIF for images; PDF for documents; SVG only after an explicit sanitisation decision.
- [ ] Image transformations/thumbnail strategy.
- [ ] Orphan-file cleanup and safe reference checks.
- [ ] Remaining content tables: general settings, announcements, pages/sections, programme days/sessions, engage cards, people, media entries, chart series/points, donation tiers, registrations, donations, and audit events.

## Static vs dynamic boundary

Keep these in code:

- [x] Design tokens, typography, responsive grid, reusable components, accessibility behaviour, route/layout shell, and validation rules.
- [x] Convex schema, secure server functions, Stripe integration code, and role enforcement.

Move these to Convex and expose through Admin:

- [ ] Event facts, contact/social links, announcement, footer content, and donation tiers.
- [ ] Navigation labels generated from programme, media, engage, and detailed content.
- [ ] All programme sessions, people, partners/sponsors, regional countries, media, charts, and detailed editorial copy.
- [ ] Logos, portraits, thumbnails, downloadable files, and their alt text/metadata.

Never make these editable as plain content:

- [x] Secrets, Stripe secret/webhook keys, auth signing keys, admin role enforcement, database validators, and executable code.

## Delivery operations

- [x] `.env.local` is ignored by Git.
- [x] Development and production Convex deployments are configured.
- [x] Every schema/function change passes `bun run typecheck`.
- [x] Every app change passes `bun run lint` and `bun run build`.
- [x] After every Git commit, run `bunx convex deploy`.
- [x] If fixture/seed data changes in development, run the same idempotent seed in production and verify counts.
- [ ] Never seed registrations, donor data, credentials, tokens, or other personal information.
- [ ] Production backup/export and restore drill before launch.
- [ ] Accessibility review: keyboard navigation, focus, contrast, reduced motion, form errors, chart alternatives.
- [ ] Cross-browser and responsive QA.
- [ ] Content approval, legal/privacy approval, Stripe live-mode test, analytics/consent decision, and launch checklist.

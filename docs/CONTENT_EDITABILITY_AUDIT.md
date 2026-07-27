# Content editability audit

Last reviewed: 27 July 2026

This document records which visitor-facing text is editable in the Page Studio,
which text intentionally belongs to the interface, and which editorial sections
are still maintained in code.

## Current issue and placeholder status

- No open GitHub issues were present when checked on 27 July 2026.
- No Lorem Ipsum, TBD, sample-event, developer-note, or implementation-note copy
  remains on public pages.
- Empty programme, publication, and legal states use neutral availability
  messages instead of “being prepared” placeholder copy.
- “Registration coming soon” and “Contribution desk coming soon” are intentional
  operational states. They are controlled by the registration and donation
  availability settings rather than unfinished page content.
- Donation wording remains deliberately non-transactional until the organiser
  approves the legal entity, currency, receipt, refund, and payment-provider
  configuration.

## Editable in Page Studio

- Global event name, theme, date, venue, format, delegate count, languages, and
  countdown target.
- Announcement, contact details, social links, footer copy, registration state,
  donation state, and donation tiers.
- The eyebrow, page title, and introductory paragraph for About, Context,
  Programme, Speakers, Committee, Media, Participate, Engage, Regional,
  Partners, Support, Donate, Agenda, Resolution, Strategy, and Partnership
  Framework.
- Homepage rationale, Present Moment, programme, speakers, team, Advisory Board,
  partners and sponsors, media and publications, engagement cards, support
  options, regional countries, population evidence, displacement evidence,
  Agenda, Resolution, Strategic Plan, and Partnership Framework records.
- Privacy Notice and Terms and Conditions bodies through the Other Content
  editor.
- Uploaded portraits, partner logos, publication covers and files, and their
  alternative text.

## Intentional interface text kept in code

These labels describe product behaviour rather than event content and should not
be exposed as free-form CMS fields:

- Navigation mechanics, theme controls, form field labels, validation messages,
  save/delete confirmations, loading states, accessibility labels, and empty
  states.
- Registration and donation button verbs, payment-state labels, authentication
  labels, role names, publication states, and admin workflow instructions.
- Structural labels such as “Day”, “Read more”, “Download”, and chart/table
  accessibility vocabulary.

## Editorial text still maintained in code

The following is approved-looking content rather than placeholder copy, but it
does not yet have a dedicated admin editor:

- Homepage section framing labels/headlines and the static evidence summary band.
- About outcomes heading and outcomes list.
- Context chapter cards, seven charter labels/details, evidence framing, and
  image-band caption.
- Committee responsibility-group headings and descriptions.
- Speaker nomination call-to-action.
- Participate support-option descriptions and contact-section framing.
- Support page section introduction.
- Regional and partner section framing copy around the dynamic records.
- Page metadata titles and descriptions used by search engines and link previews.

If the client needs every one of these phrases editable, model them as named
page-section records rather than adding a generic unstructured text editor. That
keeps the visual layout stable while allowing safe editorial changes.

## Outstanding content decisions

- Final approved regional citation URLs.
- Final Media & Publication material.
- Final privacy, terms, retention, donation, refund, tax/charity, and legal-entity
  wording.
- Registration opening date and donation activation date.
- Final metadata and social-preview copy.


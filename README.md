# Paris Assembly · 2026

Production-shaped, responsive website for the **Global Solidarity Summit for Bangladeshi Hindus**, taking place on **3–4 October 2026** at Salle des Princes in Drancy, Paris.

The visual system develops the client-selected **Design 06 · Paris Assembly** direction: paper and cobalt civic architecture, signal-red actions, monumental institutional typography, strict rules, and editorial serif support.

The complete website includes matching **light and dark modes**. The header control follows the visitor across every route, defaults to their system preference, and remembers their selection.

## Preview

![Design 06 light homepage](public/reference/design-06-implementation-light.png)

![Design 06 dark homepage](public/reference/design-06-implementation-dark.png)

## Pages

| Route          | Purpose                                                                             |
| -------------- | ----------------------------------------------------------------------------------- |
| `/`            | Summit overview, evidence, programme preview, speakers, countdown, and donation CTA |
| `/about`       | Mission, principles, outcomes, and seven-point charter                              |
| `/context`     | Historical, demographic, legal, and recent-incident context                         |
| `/programme`   | Interactive two-day summit schedule                                                 |
| `/speakers`    | Confirmed and proposed contributors                                                 |
| `/committee`   | Organising committee and responsibilities                                           |
| `/media`       | Research, publication, documentary, press, and media resources                      |
| `/participate` | Registration, volunteering, sponsorship, media accreditation, contact, and donation |
| `/engage`      | Convex-managed ways to attend, support, volunteer, partner, and amplify              |
| `/regional`    | Dynamic Beyond Bangladesh regional forum, including Nepal                           |
| `/partners`    | Non-carousel institutional partner and sponsor wall                                |
| `/support`     | Persistent support, contact, volunteer, sponsor, and media enquiry forms             |
| `/donate`      | Stripe-ready contribution flow with a safe demonstration mode                       |
| `/admin`       | Better Auth-protected editorial control room                                         |

The client’s living delivery requirements, implementation state, admin-panel
scope, dynamic-content boundary, and launch checks are maintained in
[`docs/PRODUCT_SPEC_CHECKLIST.md`](docs/PRODUCT_SPEC_CHECKLIST.md).

## Functional prototype flows

- Responsive desktop and mobile navigation
- Persistent light/dark mode with a visible theme control
- Tuned compact-phone, large-phone, tablet, small-laptop, and desktop layouts
- Two-day programme tabs
- Delegate registration form with a realistic success state
- Contact and participation entry points
- Donation dialog with selectable euro amounts, email validation, and a mock success state
- Dedicated Stripe Checkout-ready donation page with server-side amount validation, a Convex contribution ledger, signed webhook handling, and a safe demo mode while payment keys are absent
- Better Auth email/password login; the first verified account can establish the initial administrator, and later accounts require an assigned role
- Administrator and editor roles enforced inside Convex mutations
- Global settings editor for event identity, dates, venue, format, audience numbers, languages, announcement, email addresses, phone/WhatsApp, social links, hero, donation, and footer copy
- Structured CMS editor for overview, agenda, resolution, strategy, partnership, summit rationale, challenges, engagement, speakers, team, advisory council, programme, media, and FAQs
- Editable regional-country and partner/sponsor directories
- Support, contact, sponsorship, volunteer, and media forms with a protected admin inbox
- Convex file library for managed images and PDF documents
- Donation tiers and contribution ledger, plus editorial activity logs
- Generated witness-flame favicon and Apple touch icon
- Convex-backed Beyond Bangladesh section with Pakistan, Afghanistan, Myanmar, and Nepal
- Admin-extensible regional-country model with draft/published ordering
- Stationary, tiered partner and sponsor wall (no carousel)
- Convex storage-ready asset records for logos, portraits, media, and documents

## Local development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Quality checks:

```bash
bun run typecheck
bun run lint
bun run build
```

Convex workflow:

```bash
bunx convex dev
```

### Initial administrator

1. Open `/admin`.
2. Create an account using an organiser-owned email address and a password of at least 10 characters.
3. While no administrator exists, sign in and choose **Become administrator**.
4. Subsequent accounts do not receive access automatically.

Better Auth signing secrets and payment credentials stay in Convex environment
variables. Never add them to CMS fields or commit them to Git.

### Stripe activation

The donation journey is intentionally usable in demonstration mode. To enable
real payments, add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to the
production Convex deployment, register the `/stripe/webhook` endpoint in
Stripe, and replace the production `SITE_URL` placeholder with the deployed
frontend origin.

Every commit must be followed by a production backend deploy:

```bash
bunx convex deploy
```

When seed content changes, run the idempotent seed in both environments and
verify the resulting row counts. Never seed personal, donor, registration, or
credential data.

## Source material

The content architecture and factual event details were developed from the supplied summit documents in the parent folder, including `Paris Website.pdf`, the event concept note, the conference committee document, and the speaker/committee profiles.

Before publication, the organisers should approve final speaker status, programme timings, contact destinations, source links, privacy language, and the selected payment provider.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui with Base UI primitives
- Bun
- Convex database and file storage

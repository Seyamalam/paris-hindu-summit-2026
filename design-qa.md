# Design QA

## Evidence

- Source visual truth: `public/reference/design-09-night-testimony.png`
- Desktop implementation: `public/reference/implementation-home-desktop.png`
- Mobile implementation: `public/reference/implementation-home-mobile.png`
- Source pixels: 1487 × 1058
- Desktop implementation pixels: 1425 × 1013
- Mobile implementation pixels: 345 × 767
- CSS viewports: 1440 × 1024 desktop and 360 × 800 compact mobile
- Density: browser and source evaluated at 1×; the desktop comparison normalized both images to 720 × 512 with an identical top-aligned cover crop
- State: homepage, default navigation state

## Full-view comparison

The source and desktop implementation were placed together in a single side-by-side comparison. The implementation preserves the selected direction’s near-black auditorium, large left-aligned testimony, editorial serif hierarchy, wine-red actions, compact metadata, negative space, and illuminated chair/microphone composition.

The implementation intentionally contains more specific summit copy, a larger display treatment, and the client-requested witness-flame brand mark, but the hierarchy and visual thesis remain faithful. There are no actionable P0, P1, or P2 desktop fidelity differences.

## Focused responsive evidence

Focused review was required because the user specifically requested stronger responsiveness. Every route was checked at:

- 360 × 800
- 412 × 915
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 1024

The mobile homepage, compact committee hero, tablet About, tablet Context, tablet Programme, small-laptop homepage, mobile navigation, and mobile payment dialog were visually inspected. All eight routes were also measured for horizontal document overflow.

## Required fidelity surfaces

- **Typography:** Bodoni Moda retains the reference’s editorial voice; compact page heroes now reduce safely before long words clip. Display/body/utility roles remain distinct at every breakpoint.
- **Spacing and layout:** Section shells use scrollbar-safe auto sizing. Tablet grids reflow to two columns, then one column on phones. Footer, image/text splits, forms, countdowns, schedules, and CTA panels retain usable rhythm.
- **Colors and tokens:** Near-black, parchment, wine, and amber tokens remain consistent with the reference and maintain readable contrast.
- **Image quality:** The hero uses the generated stage photograph with controlled crops by breakpoint. Speaker portraits preserve useful aspect ratios without stretching. The generated favicon has a strong silhouette at 32px.
- **Copy and content:** All supplied event details remain intact; compact layouts wrap headings and actions without truncating meaning.

## Interaction and accessibility

- Mobile navigation opens, exposes semantic links, navigates, and closes
- Mobile menu target is 44 × 44px
- Programme Day 1 / Day 2 tabs work and wrap without overflow
- Delegate registration success state works
- Donation amount, email validation, mock payment, and success state work
- Mobile payment dialog stays within the viewport and scrolls if necessary
- Labels, image alt text, heading hierarchy, keyboard focus, and reduced-motion handling reviewed
- Browser console and Next.js issue overlay checked

## Comparison history

### Iteration 1

- **P2:** Context cards, About cards, and Programme tabs exceeded tablet widths.
- **P2:** Compact committee heading clipped the word “Responsibility.”
- **P2:** Mobile menu button was below the recommended 44px target.
- **P2:** Mobile Sheet navigation rendered action semantics instead of link semantics.

Fixes:

- Added scrollbar-safe section sizing and intermediate two-column grids.
- Allowed programme tabs to wrap with zero minimum track width.
- Added compact heading scaling and portrait aspect-ratio rules.
- Increased the menu control to 44 × 44px.
- Converted controlled Sheet navigation items to semantic Next.js links.
- Reflowed footer, image/text sections, forms, donation panel, and dialog at tablet/mobile breakpoints.

Post-fix evidence:

- All eight routes report no horizontal overflow at all six test widths.
- Compact committee heading is fully visible at 360 × 800.
- Mobile menu links navigate and close the Sheet.
- Mobile mock checkout fits inside 360 × 800.

### Iteration 2

- Replaced the temporary letter mark with the approved witness-flame artwork in the desktop header, mobile header, mobile navigation title, footer identity, favicon, and Apple touch icon.
- Refreshed the desktop and mobile implementation screenshots.
- Verified the optimized logo asset loads at its intended compact sizes without layout overflow or browser-console errors.

## Remaining findings

No actionable P0, P1, or P2 findings remain. A future production pass should validate the final translated copy, approved speaker list, real payment provider, privacy wording, and final source citations.

final result: passed

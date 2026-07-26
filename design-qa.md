# Design QA

## Evidence

- Source visual truth: `public/reference/design-09-night-testimony.png`
- Desktop implementation: `public/reference/implementation-home-desktop.png`
- Mobile implementation: `public/reference/implementation-home-mobile.png`
- Source pixels: 1487 × 1058
- Desktop implementation pixels: 1425 × 1013
- Mobile implementation pixels: 345 × 639
- CSS viewports: 1440 × 1024 desktop and 360 × 667 compact mobile
- Density: browser and source evaluated at 1×; the desktop comparison normalized both images to 720 × 512 with an identical top-aligned cover crop
- State: homepage, default navigation state

## Full-view comparison

The source and desktop implementation were placed together in a single side-by-side comparison. The implementation preserves the selected direction’s near-black auditorium, large left-aligned testimony, editorial serif hierarchy, wine-red actions, compact metadata, negative space, and illuminated chair/microphone composition.

The implementation intentionally contains more specific summit copy and the client-requested witness-flame brand mark. Its revised three-line headline now follows the reference’s proportions more closely, while the cloth summit credential adds a compact, subject-specific interaction without competing with the testimony. There are no actionable P0, P1, or P2 desktop fidelity differences.

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

- **Typography:** Bodoni Moda retains the reference’s editorial voice; the desktop landing headline resolves to three balanced lines and compact page heroes reduce safely before long words clip. Display/body/utility roles remain distinct at every breakpoint.
- **Spacing and layout:** The full desktop hero and its metadata fit inside the first 1440 × 1024 viewport. Section shells use scrollbar-safe auto sizing. Tablet grids reflow to two columns, then one column on phones. Footer, image/text splits, forms, countdowns, schedules, and CTA panels retain usable rhythm.
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
- The cloth credential is non-essential, has an accessible outer label, respects reduced motion, pauses off-screen, and retains a styled static fallback where experimental HTML-in-canvas support is unavailable
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

### Iteration 3

- **P2:** The mobile landing hero exceeded the first viewport because desktop-scale headline spacing, two stacked actions, and event metadata created an intrinsically taller hero.
- **P2:** The homepage programme preview placed its description as a separate grid item, forcing body copy into the narrow Day-label column and producing word-by-word vertical text.

Fixes:

- Rebalanced the mobile hero’s display scale, spacing, action height, metadata layout, and viewport-based minimum height.
- Grouped each programme title and description into one content column.
- Reduced the mobile programme heading scale and converted Day 01/02 into compact label-plus-content rows.

Post-fix evidence:

- The complete headline, theme, both primary actions, and event metadata fit inside 360 × 667, 360 × 800, 390 × 844, and 430 × 932 viewports.
- Each programme day now occupies approximately 222px at 360px width instead of more than 520px.
- The programme preview decreased from approximately 1610px to 858px at 360px width.
- No horizontal overflow or browser-console errors were introduced.

### Iteration 4

- **P2:** Adding the cloth credential initially pushed the desktop hero metadata below the 1440 × 1024 first viewport.
- **P2:** The inherited oversized desktop headline formed five lines, diverging from the selected design’s broad three-line editorial composition.

Fixes:

- Rebalanced the desktop hero’s top/bottom spacing and component gaps.
- Widened the testimony column and reduced only the desktop display scale, preserving the existing compact-mobile treatment.
- Installed the shadcn Canvas UI cloth component as a restrained summit credential rather than placing essential hero content inside the experimental canvas effect.
- Added a deliberate fabric-texture fallback so the credential remains visually complete in mainstream browsers.

Post-fix evidence:

- At 1440 × 1024, the hero ends at 900px, the headline uses three lines, and event metadata ends at approximately 785px.
- At 360 × 667, the headline, both actions, and event metadata remain visible; the page reports no horizontal overflow.
- Desktop and mobile checks report no browser-console errors.
- The final source/implementation comparison used an identical 720 × 512 top-aligned cover crop; no actionable P0/P1/P2 mismatch remains.

## Remaining findings

No actionable P0, P1, or P2 findings remain. A future production pass should validate the final translated copy, approved speaker list, real payment provider, privacy wording, and final source citations.

final result: passed

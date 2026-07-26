# Design QA · Design 06 Paris Assembly

## Evidence

- Source visual truth: `public/reference/design-06-source-live.png`
- Light desktop implementation: `public/reference/design-06-implementation-light.png`
- Dark desktop implementation: `public/reference/design-06-implementation-dark.png`
- Light mobile implementation: `public/reference/design-06-mobile-light.png`
- Dark mobile implementation: `public/reference/design-06-mobile-dark.png`
- Source pixels: 1440 × 1024
- Desktop implementation pixels: 1425 × 1013
- Mobile implementation pixels: 345 × 639
- CSS viewports: 1440 × 1024 desktop and 360 × 667 mobile
- Density: 1× browser capture
- State: homepage, default navigation, light and dark themes

## Normalization

The source image includes 34px of concept-viewer chrome above the live site and a bottom design switcher below it. The full-view comparison therefore used:

- Source crop: x 0, y 34, 1440 × 856
- Implementation crop: x 0, y 0, 1425 × 846
- Both normalized to 720 × 428 and placed in one side-by-side comparison input

This removes the unrelated concept selector while preserving the full visible Design 06 header and hero. The date changed from the early concept’s 19–20 placeholder to the approved 3–4 October 2026 event dates.

## Full-view comparison

The implementation reproduces the source’s defining composition: a paper field and cobalt date panel split on a strong vertical rule, monumental uppercase Inter typography, compact institutional navigation, signal-red action, small monospaced metadata, and an immediate red Paris banner.

The supplied witness-flame logo remains in the lockup because the client separately requested it. Copy, dates, routes, donation entry, and event metadata use the approved project content rather than the concept placeholder copy. These are intentional product requirements, not fidelity drift.

No actionable P0, P1, or P2 desktop fidelity differences remain.

## Focused evidence

Focused comparison was required for:

- Header: persistent navigation, logo lockup, active route, red reservation action, and 44 × 44px theme control
- Hero: headline wrapping, vertical split, 03 → 04 date lockup, CTA alignment, and first-viewport fit
- Mobile: 360 × 667 hero, 68px fixed header, 44 × 44px controls, menu sheet, and long interior-page headings
- Themes: identical structure and hierarchy in light and dark; only semantic tokens change
- Payment: themed mock donation dialog at mobile width

The desktop light/dark pair was also placed in one side-by-side comparison input. Both retain the same grid, typography, red action hierarchy, cobalt date panel, and content density.

## Required fidelity surfaces

- **Fonts and typography:** Inter provides the source’s monumental civic headline and navigation voice. Bodoni Moda is retained only for supporting editorial headings, matching Design 06’s serif secondary layer. Utility labels use Geist Mono. Desktop and mobile headings were checked for wrapping and clipping.
- **Spacing and layout rhythm:** The desktop hero uses the source’s approximately two-thirds/one-third split. The mobile hero reflows into one complete first-viewport content panel followed by the date panel. Rules, square controls, section padding, grids, and card edges consistently follow the institutional system.
- **Colors and visual tokens:** Light mode uses paper `#f4f5f2`, cobalt `#173f91`, signal red `#df313b`, and white. Dark mode maps paper to ink `#08111f`, foreground to `#edf3ff`, and surfaces to navy without changing the cobalt/red hierarchy.
- **Image quality and asset fidelity:** The supplied witness-flame logo is used at its intended compact size. Existing event and speaker photography remains sharp, uses controlled crops, and is treated consistently with the cobalt institutional palette. No placeholder or code-drawn image assets were introduced.
- **Copy and content:** All eight routes retain the approved summit content, 3–4 October date, venue, programme, speakers, committee, evidence, participation flows, and provider-ready mock donation language.

## Interaction and accessibility

- Theme toggle works in both directions, follows system preference by default, and persists through `next-themes`
- Keyboard shortcut `D` toggles themes outside text-entry controls
- Fixed navigation remains visible while scrolling
- Mobile menu opens in both themes and retains 44 × 44px controls
- All eight routes have no horizontal overflow at 1440px or 360px
- Programme Day 1 / Day 2 tabs retain working selected states
- Registration and contact success states remain functional
- Donation amount selection, email gate, mock checkout, and success state remain functional
- Reduced-motion behavior, focus visibility, alt text, labels, and heading hierarchy retained
- Browser console checked with no warnings or errors

## Comparison history

### Iteration 1

- **P2:** The initial desktop 03 → 04 lockup extended slightly beyond the cobalt panel.
- **P2:** Long mobile interior-page titles, especially “Declaration,” clipped at 360px.
- **P2:** The imported desktop header height overrode the intended compact mobile height.

Fixes:

- Reduced the desktop date numerals and panel gap while retaining the source’s oversized date treatment.
- Added a dedicated compact interior-page display scale and safe wrapping at mobile widths.
- Restored the mobile fixed header to 68px and matched both hero offsets to that value.

Post-fix evidence:

- The final desktop date lockup ends at approximately x 1394 inside a 1425px page capture.
- All eight routes report zero horizontal overflow at 360px and 1440px.
- Every mobile page heading ends inside the 345px content viewport.
- The mobile header measures 68px, its controls measure 44 × 44px, and the homepage content panel ends exactly at the 667px first viewport.

## Remaining findings

No actionable P0, P1, or P2 findings remain. Final production review should still confirm approved source citations, speaker status, privacy wording, translations, and the selected payment provider.

final result: passed

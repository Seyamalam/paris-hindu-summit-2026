# Mobile responsive QA report

Date: 27 July 2026
Target: `http://localhost:3000`
Widths: 320px, 390px, 768px, 1024px, and 1280px

## Verification result

All findings below are fixed. Every tested public route now reports a document
width equal to the viewport at all five target widths:

- `/`, `/about`, `/context`, `/programme`, `/speakers`, `/committee`
- `/media`, `/participate`, `/engage`, `/regional`, `/partners`, `/support`
- `/donate`, `/agenda`, `/resolution`, `/strategy`
- `/partnership-framework`, `/privacy`, and `/terms`

The 320px navigation drawer was also tested open. It remains within the
viewport, allows vertical scrolling, wraps long labels, exposes 44px-or-larger
touch targets, and now includes Programme and Partners.

The Support form was scrolled into view and visually checked at 320px. Its
container is 284px wide inside 18px page gutters, with no clipped controls.

## Findings before fixes

### ISSUE-001 — Mobile navigation exceeds the viewport

- Status: Fixed and verified
- Severity: High
- Category: Responsive navigation
- Route: All public routes

At 320px the open navigation expands the document to 414px. Long destinations
such as “Organizing Team and Advisory Board” and “International partnerships”
are clipped or force horizontal overflow.

### ISSUE-002 — Support page uses a desktop-width inner column

- Status: Fixed and verified
- Severity: High
- Category: Responsive layout
- Route: `/support`

The page expands to 380px at a 320px viewport. The introduction and form are
362px wide and the form’s inner controls remain 308px wide after parent padding.

### ISSUE-003 — Shared footer introduces horizontal overflow

- Status: Fixed and verified
- Severity: Medium
- Category: Shared layout
- Route: All public routes

At 320px the shared footer expands the document to 325px. The callout kicker
and heading extend five pixels past the viewport because a desktop width rule
survives the compact breakpoint.

### ISSUE-004 — Long editorial headings do not wrap safely

- Status: Fixed and verified
- Severity: Medium
- Category: Typography
- Routes: `/speakers`, `/context`, `/committee`, and document pages

Several headings have intrinsic widths larger than their containers. The
speaker participation heading reaches 322px inside a 284px content box, and
Context chapter headings similarly exceed their cards.

### ISSUE-005 — Dense document layouts need compact-phone treatment

- Status: Fixed and verified
- Severity: Medium
- Category: Responsive content
- Routes: `/agenda`, `/resolution`, `/strategy`, and `/committee`

Large display headings, numbered document rows, vision cards, and timeline
labels preserve desktop proportions at 320px, producing clipping risk and
unnecessarily tall, difficult-to-scan pages.

### ISSUE-006 — Homepage record grids overflow at tablet width

- Status: Fixed and verified
- Severity: High
- Category: Tablet layout
- Route: `/`

At 768px, three-column record grids retained min-content column sizing and
expanded the document to 1096px. Their tracks now use zero-minimum grid columns
and collapse to a single readable column below 900px. The homepage now remains
exactly 768px wide.

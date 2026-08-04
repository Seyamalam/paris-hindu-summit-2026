<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project delivery rules

- Treat `docs/PRODUCT_SPEC_CHECKLIST.md` as the living product-requirements and
  delivery checklist. Update it whenever scope, implementation status, or an
  organiser decision changes.
- Convex is the only application content store and the storage service for
  uploaded images and files. Store Convex storage IDs in data records and resolve
  URLs when reading.
- Never expose an unauthenticated admin write, upload, seed, or destructive
  function.
- After every Git commit, run `bun run convex:deploy:prod`. This uses the
  ignored production deploy-key file and does not depend on a logged-in Convex
  CLI session.
- Production is established and all live content is Admin-owned. Never run a
  seed, fixture sync, repair mutation, or reusable content migration against
  production. Use an authenticated Admin mutation for editorial changes and
  verify that production content-table fingerprints are unchanged by releases.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

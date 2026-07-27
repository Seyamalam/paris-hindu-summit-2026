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
- If development seed/fixture content changes, run the same idempotent seed in
  production and verify both environments. Never seed personal or secret data.

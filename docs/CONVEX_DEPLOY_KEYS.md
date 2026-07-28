# Convex deploy-key operations

The project uses deployment-scoped deploy keys so local and CI commands do not
depend on whichever Convex account is currently logged into the CLI.

## Local secret files

These files are intentionally ignored by Git and must never be committed:

- `.env.convex.development` — key scoped to `befitting-oyster-615`
- `.env.convex.production` — key scoped to `amiable-dogfish-765`
- `.env.local` — public development endpoints only; it does not contain a
  deploy key

The two key files are stored with owner-only file permissions.

## Safe commands

```bash
# Continuous development
bun run convex:dev

# One development push
bun run convex:dev:once

# Refresh generated Convex types
bun run convex:codegen

# Production deployment
bun run convex:deploy:prod

# Full snapshots, including stored files
bun run convex:backup:dev
bun run convex:backup:prod

# Development/bootstrap content seed
bun run convex:seed:dev
```

Each command uses `scripts/convex-key.mjs` to read the selected ignored file and
pass its key directly to the Convex subprocess. It works when the Convex CLI is
logged out and prevents the production command from silently using the
development deployment.

`convex:deploy:prod` automatically creates and checksums a full production
snapshot before doing anything else. Snapshots include database documents,
Better Auth records, and Convex file storage. They are written outside the Git
repository under `../../convex-backups/automatic/<timestamp>/`.

Production seeding fails closed. Retired content migrations and repair mutations
are removed from the deployed API. Make live editorial changes only through
authenticated Admin functions; a release must leave every production content
table and stored file unchanged.

Production is always the editorial source of truth. Never copy development data
into production. When development needs current client content, export
production, back up development separately, and import the production snapshot
into development with `--replace`. Do not run a seed during this workflow.

## Vercel

Add the production deploy key as a sensitive Vercel environment variable only
if Vercel itself runs `convex deploy`:

```text
CONVEX_DEPLOY_KEY=<contents of .env.convex.production>
```

The application runtime still needs:

```text
NEXT_PUBLIC_CONVEX_URL=https://amiable-dogfish-765.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://amiable-dogfish-765.convex.site
```

Do not expose `CONVEX_DEPLOY_KEY` with a `NEXT_PUBLIC_` prefix.

## Rotation

Create replacement keys while authenticated, update the corresponding ignored
file and Vercel secret, verify a deployment, and only then delete the old key.
Deleting a deploy key immediately revokes it without affecting the database or
stored files.

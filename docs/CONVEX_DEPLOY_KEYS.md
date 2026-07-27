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

# Idempotent content seeds
bun run convex:seed:dev
bun run convex:seed:prod
```

Each command loads the deployment-specific key before starting Convex. It works
when the Convex CLI is logged out and prevents the production command from
silently using the development deployment.

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

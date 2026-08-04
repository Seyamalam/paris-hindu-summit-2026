# Paris Hindu Summit Mail Desk

A focused Expo app for the Paris Hindu Summit 2026 mail team. It uses the same Better Auth accounts, Convex data, role checks, Brevo delivery endpoint, contacts, and message history as the website administration panel.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Install dependencies with `bun install`.
3. Start with `bun start`, then open iOS, Android, or web from Expo.

The committed example points at the production Summit backend so authorized users see the real shared mailbox. Use a development Convex deployment in `.env.local` when testing data-changing work.

## Access

Only existing `administrator` and `mail_manager` accounts can query or modify mail data. New accounts are created and assigned from the website administration panel; the mobile app intentionally has no sign-up flow.

## Validation

```bash
bun run lint
npx tsc --noEmit -p tsconfig.json
npx expo export --platform ios
```

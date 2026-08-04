# Summit mail router

This Email Routing Worker archives incoming mail in Convex and forwards a copy
to every verified address in `FORWARD_TO`.

To add another recipient:

1. Verify it in Cloudflare Dashboard → Email Routing → Destination addresses.
2. Add it to the comma-separated `FORWARD_TO` Worker variable.
3. Deploy this Worker again.

`MAIL_INGEST_SECRET` is a Worker secret and must match the production Convex
environment variable with the same name. Never commit it.

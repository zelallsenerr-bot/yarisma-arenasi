# Private site statistics — deployment checklist

This change is prepared for the existing GitHub Pages site. It does not introduce Google Analytics or modify game files. Collection remains disabled while `site104/metrics-config.js` has empty values. Do not describe the panel or email login as live before completing the checks below.

## Backend setup

1. Connect the owner's Supabase account and select an owner-controlled project. Apply the two migrations in filename order. No service-role key belongs in GitHub, browser files or chat.
2. Create the owner's Auth account, confirm the email through that owner's mailbox, then bind that account's verified UUID to `arena_private.settings.owner_user_id` using trusted server access. Confirm which owner email to use before binding. The public support email is not by itself proof of ownership.
3. Disable public signup. Allow email magic-link login for the existing owner only (`create_user: false` is already set in the client). Set the Auth site URL to `https://yarismaatolyesi.com` and exact allowed redirect URLs to `https://yarismaatolyesi.com/yonetici.html` and `https://www.yarismaatolyesi.com/yonetici.html`. Verify email delivery with the project's configured mail provider; default provider restrictions may require SMTP configuration.
4. Enable pg_cron and schedule daily `select arena_private.purge_expired_events();` using a trusted database role. Confirm the job actually runs and old rows are removed. Browser roles cannot invoke this function.
5. Set only the public project URL and publishable/legacy anon key in `metrics-config.js`. Keep `collectInWebView: false`. Never use a secret/service-role key. Keep the private schema out of exposed API schemas.
6. Test the deployed API: anonymous and a different verified user cannot read reports or tables; the configured verified owner can read aggregate reports. Test the real magic-link round trip and logout. Test consent refusal and withdrawal in an ordinary browser. Confirm Android WebView makes no measurement requests.
7. Update the privacy notice's preparation/inactive text to reflect the actual deployment, verify the snapshot hashes, and merge/deploy through the existing Pages workflow only after the above checks pass.

## What the panel reports

Visits, distinct browser identifiers, game opens and approximate foreground play time, grouped by game and Istanbul calendar day. Only consented activity after activation is available. Browser identifiers are not exact counts of people; browser changes, storage clearing, rejected consent and ad blockers affect totals. No pre-activation historical data is reconstructed. Public collectors can be spoofed: origin filtering and per-identifier rate limits reduce mistakes but do not prove identity or prevent all fabricated events.

Raw identifiers and owner settings have no browser grants. The owner UUID check occurs in a SECURITY DEFINER database function with an empty search path; hiding the page URL is not the access control. A different authenticated account has no report access. The browser retains the short-lived owner token only in tab session storage, strips the magic-link fragment, and does not persist a refresh token.

The Android wrapper is excluded by default. Do not change its data-safety declarations merely because this web-only draft exists.

## Validation

`node --check site104/metrics.js` and `node --check site104/yonetici.js` check syntax. `tests/database.mjs` runs the real SQL in PGlite and checks anonymous, non-owner and unverified-owner denial, raw-table denial, event validation, deduplication, calendar results and aggregate correctness. Run `npm install` and `npm test` to execute the database and collector checks. Run `python3 migration104/verify_snapshot.py` from this project root to verify every imported site file and the approved changes/additions.

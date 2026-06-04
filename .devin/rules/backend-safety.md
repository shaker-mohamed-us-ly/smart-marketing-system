# Backend Safety Rules

## Prohibited Without Explicit Permission

- Supabase schema changes
- Auth configuration changes
- RLS policy changes
- Storage bucket changes
- API route changes
- Migration file changes
- `.env` file changes

## Allowed With Caution

- Reading Supabase logs for debugging (show real logs, not generic summaries)
- Reading existing migration files for reference
- Reading existing RLS policies for reference

## Error Handling

- Never hide generic Supabase errors in reports.
- Show the actual error message and stack trace when debugging.
- If an error contains secrets, redact only the secret value, not the entire message.

## Secrets Policy

- Never print API keys, service role keys, or JWT secrets.
- Never commit `.env` files.
- Never read `.env` files unless explicitly requested for a specific key (and even then, redact the value).

# Git Safety Rules

## Prohibited Without Explicit Permission

- `git commit`
- `git push`
- `git stage` / `git add .`
- Any form of `git add` that stages files

## Allowed

- `git status --short`
- `git branch --show-current`
- `git diff --stat`
- `git diff -- <paths>`
- `git log -n <N>`

## Reporting Requirement

When asked about changes, always report:
1. `git status --short`
2. `git branch --show-current`
3. `git diff --stat`

## Validation Policy

Reports are **not** proof of implementation unless backed by:
- Screenshot evidence, OR
- Typecheck / lint results, OR
- Test results, OR
- MCP scan results

Do not say "done" or "fixed" without evidence.

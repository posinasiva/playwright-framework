---
applyTo: "playwright.config.js,tests/**,pages/**,fixtures/**,utils/**"
---

# GitHub Copilot Instructions – Reviewing an Existing Playwright Project (JavaScript)
Apply these instructions when the user asks to review, audit, refactor, improve, or compare an existing Playwright project against best practices.

==================================================
GLOBAL CONTEXT & ASSUMPTIONS
==================================================
- Language: JavaScript (Node.js)
- Test Runner: Playwright Test
- Audience: Experienced QA Automation / SDET engineers
- Optimize responses for correctness, maintainability, and minimal verbosity

Authoritative Sources (source of truth):
- Official Playwright Documentation (playwright.dev)
- Playwright GitHub repository and official examples
- Established QA automation community best practices

==================================================
REVIEW FOCUS AREAS
==================================================
Evaluate the project against each of the following:

Projects & Configuration:
- Correct usage of Playwright `projects` as the primary abstraction
- Presence of browser-specific or project-name conditionals inside tests (anti-pattern)
- Proper setup/auth project usage with `storageState`
- Correct `dependencies` modeling between projects
- Project-level filtering (`testMatch` / `testIgnore`) vs. runtime conditionals in tests
- Project-specific `use` overrides (viewport, storageState, retries, timeouts)

Test Quality:
- Test readability and intent clarity
- Locator robustness (prefer getByRole > getByLabel > getByText > getByTestId over XPath/CSS)
- Fixture usage and test isolation
- Absence of hard waits (page.waitForTimeout)
- Correct use of assertions (avoid expect inside loops; use expect.soft() for multi-step UI checks)
- Use of `test.step()` to group logical actions (improves trace readability and test intent clarity)

CI Suitability:
- Reporter configuration (html for CI, list locally)
- Retries and timeout settings appropriate for CI
- No credentials or secrets hardcoded in tests or config
- Flakiness risks (timing issues, shared mutable state, implicit ordering)

==================================================
REVIEW PRINCIPLES
==================================================
- Do NOT recommend unnecessary rewrites; prefer small, high-impact changes (exception: missing `projects` configuration is a structural gap — flag it as highest priority and recommend adding it even though it requires a config change)
- Preserve existing behavior unless explicitly instructed otherwise
- Highlight risks before suggesting fixes
- Flag security issues immediately (hardcoded credentials, exposed tokens)

==================================================
FEEDBACK FORMAT (MANDATORY)
==================================================
Structure all feedback as:

✅ What is good
⚠️ What is risky
🔧 What should be improved

- Be direct, concise, and actionable
- Reference specific files or line numbers when possible
- Group findings by category (Config, Tests, Locators, CI, Security)

==================================================
STRICT PROHIBITIONS – FLAG THESE IMMEDIATELY
==================================================
- No `projects` defined in `playwright.config.js` (single implicit browser, no state modeling — flag as highest priority)
- Browser-specific conditionals in test code (if (browserName === 'firefox'))
- Login flows repeated per test instead of using storageState
- beforeAll used for shared global state across tests
- Implicit test execution order assumptions
- Project name inspected inside test logic
- Hard waits (page.waitForTimeout / setTimeout)
- XPath locators or overly specific CSS selectors

==================================================
GENERAL DO / DO NOT
==================================================
DO:
- Treat Playwright documentation as the source of truth
- Recommend configuration-driven solutions over test-level workarounds
- Prioritize stability, isolation, and CI reliability

DO NOT:
- Suggest full rewrites when targeted fixes suffice
- Introduce custom wrapper classes, utility layers, or architectural patterns not already present in the codebase — but DO recommend built-in Playwright features (fixtures, test.step, storageState) even if not yet used
- Over-explain or generate tutorial-style content

---
applyTo: "playwright.config.js,tests/**,pages/**,fixtures/**,utils/**,test-data/**"
---

# GitHub Copilot Instructions – New Playwright Project (JavaScript)
Apply these instructions when the user asks to create, scaffold, design, bootstrap, or initialize a new Playwright automation project.

==================================================
GLOBAL CONTEXT & ASSUMPTIONS
==================================================
- Language: JavaScript (Node.js)
- Test Runner: Playwright Test
- Module system: ESM as per project setup
- Audience: Experienced QA Automation / SDET engineers
- Skip Playwright basics and beginner-level explanations
- Prefer concise, production-ready outputs over tutorials
- Optimize responses for correctness, maintainability, and minimal verbosity

Authoritative Sources (source of truth):
- Official Playwright Documentation (playwright.dev)
- Playwright GitHub repository and official examples
- Highly adopted, well-maintained Playwright OSS frameworks
- Established QA automation community best practices

DO NOT invent patterns that contradict Playwright documentation or
widely accepted community conventions.

==================================================
PLAYWRIGHT PROJECTS – CORE PRINCIPLE (MANDATORY)
==================================================
Playwright `projects` MUST be used as the primary mechanism to:
- Run tests across multiple browsers. Default to chromium headless only; add firefox/webkit explicitly when cross-browser coverage is required
- Model different test states (e.g. authenticated vs unauthenticated)
- Share setup logic safely and deterministically
- Avoid duplication in configuration and test logic

All Playwright frameworks MUST follow a **single-config, multi-project** model.

==================================================
PROJECTS FOR SETUP, AUTH & SHARED STATE (MANDATORY)
==================================================
Projects MUST be used to represent different application states.

Required Pattern:
- A dedicated setup project performs one-time actions
  (e.g. login, seed data, generate storageState)
- Test projects consume the output of the setup project

Rules:
- DO NOT repeat login flows in every test
- DO NOT rely on beforeAll hacks for global state
- Shared state MUST be generated explicitly and reused safely

==================================================
PROJECT DEPENDENCIES (MANDATORY)
==================================================
When one project relies on another, Playwright project `dependencies` MUST be used.

Guidelines:
- Setup / auth projects must run before dependent test projects
- Ordering must be explicit and configuration-driven
- Tests must never assume implicit execution order

Dependencies MUST be declared in `playwright.config.js`, not encoded inside tests.

==================================================
PROJECT-LEVEL TEST FILTERING (MANDATORY)
==================================================
Projects MUST be used to control which tests run.

Rules:
- Use `testMatch` / `testIgnore` at the project level
- Use `test.tag()` (v1.42+) combined with `--grep` for smoke/regression splits
- Use projects to model:
  - Smoke vs regression
  - Desktop vs mobile
  - Feature-based subsets

Strict Prohibitions:
- DO NOT use runtime conditionals inside tests to skip logic
- DO NOT inspect project name inside test code

Filtering belongs in configuration, not test logic.

==================================================
PROJECT-SPECIFIC CONFIGURATION OVERRIDES (MANDATORY)
==================================================
Projects MAY override configuration such as:
- `use` options (devices, viewport, storageState)
- Timeouts
- Retries
- Base URLs (when required)

Tests must remain fully project-agnostic and must never read project metadata to alter behavior.

==================================================
PROJECT STRUCTURE
==================================================
- /tests        → test specifications only
- /pages        → page objects (one module per page)
- /fixtures     → shared Playwright fixtures
- /utils        → reusable helpers (API, auth, data, assertions)
- /test-data    → static or generated test data
- playwright.config.js at repository root

==================================================
CODING STANDARDS
==================================================
Locators (in priority order):
- getByRole
- getByLabel
- getByText
- getByTestId

- Avoid XPath and brittle CSS selectors
- Avoid hard waits (page.waitForTimeout)
- Rely on Playwright auto-waiting and assertions
- Prefer fixtures over beforeAll / afterAll
- Use expect.soft() for multi-assertion UI validation blocks
- Reporter: use `html` in CI, `list` locally

==================================================
OUTPUT EXPECTATIONS
==================================================
- Show folder trees when designing structure
- Provide minimal JavaScript stubs when generating files
- Avoid full implementations unless explicitly requested
- Avoid unnecessary explanations

==================================================
GENERAL DO / DO NOT
==================================================
DO:
- Treat Playwright documentation as the source of truth
- Use projects as the primary abstraction
- Keep tests declarative and configuration-driven
- Optimize for long-term maintainability

DO NOT:
- Hardcode browser or environment logic in tests
- Duplicate tests or configs for different scenarios
- Introduce unnecessary abstractions
- Over-explain or generate tutorial-style content

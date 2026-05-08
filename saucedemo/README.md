# SauceDemo Playwright Test Framework

Automated test suite for [SauceDemo](https://www.saucedemo.com) built with [Playwright](https://playwright.dev).

## Project Structure

```
saucedemo/
├── fixtures/               # Custom Playwright fixtures
│   └── page-fixtures.js
├── pages/                  # Page Object Models
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   └── CartPage.js
├── test-data/              # External test data (users, etc.)
│   └── users.json
├── tests/                  # Test specs
│   ├── login.spec.js
│   ├── products.spec.js
│   └── cart.spec.js
├── .env.example            # Environment variable template
├── playwright.config.js
├── package.json
├── Dockerfile
└── docker-compose.yml
```

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Configuration

Copy `.env.example` to `.env` and update values as needed:

```bash
cp .env.example .env
```

| Variable   | Default                        | Description                  |
|------------|--------------------------------|------------------------------|
| `BASE_URL` | `https://www.saucedemo.com`    | Base URL for the application |

## Running Tests

| Command                    | Description                        |
|----------------------------|------------------------------------|
| `npm test`                 | Run all tests                      |
| `npm run test:smoke`       | Run smoke tests (`@smoke`)         |
| `npm run test:regression`  | Run regression tests (`@regression`) |
| `npm run test:showreport`  | Open the HTML report               |

### Filter by tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep @cart
npx playwright test --grep "@smoke|@cart"
```

### Filter by spec file

```bash
npx playwright test tests/login.spec.js
```

## Docker

```bash
# Build and run tests in Docker
npm run docker:start

# Stop and remove containers
npm run docker:stop
```

## CI/CD

Tests run automatically on GitHub Actions on pushes and pull requests to `main`, `master`, and `develop` branches. HTML and JUnit reports are uploaded as artifacts after each run.

## Test Tags

| Tag           | Description                     |
|---------------|---------------------------------|
| `@smoke`      | Critical path / happy path      |
| `@regression` | Full regression coverage        |
| `@cart`       | Cart-related tests              |

## Architecture

### Page Object Model (POM)

All page interactions are encapsulated in `pages/`. Every page object extends `BasePage`, which provides shared locator-based utilities (`click`, `fill`, `getText`, `isVisible`).

### Fixtures (`fixtures/page-fixtures.js`)

| Fixture              | Description                                                  |
|----------------------|--------------------------------------------------------------|
| `loginPage`          | Navigates to the login page; no authentication               |
| `authenticatedPage`  | Logs in as `standard_user`; lands on the inventory page      |
| `productsPage`       | Authenticated `ProductsPage` instance on inventory page      |
| `cartPage`           | Authenticated `CartPage` instance on empty cart page         |
| `populatedCartPage`  | Authenticated `CartPage` with one item pre-added             |

### Test Data

User credentials are stored in `test-data/users.json` under three categories:
- `validUsers` — users that can log in successfully
- `lockedUsers` — users with valid credentials but locked out
- `invalidUsers` — users with wrong credentials

// Login Test Cases

const { test, expect } = require('../fixtures/page-fixtures');
const users = require('../test-data/users.json');

// Clear storageState so these tests always start unauthenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {

  test('Successful login with valid credentials', async ({ loginPage }) => {
    const { username, password } = users.validUsers[0];
    await loginPage.login(username, password);
    await expect(loginPage.page).toHaveTitle('Swag Labs');
    await expect(loginPage.page).toHaveURL(/inventory/);
  });

  test('Login fails with invalid credentials', async ({ loginPage }) => {
    const { username, password } = users.invalidUsers[0];
    await loginPage.login(username, password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('Login fails with locked out user', async ({ loginPage }) => {
    const { username, password } = users.lockedUsers[0];
    await loginPage.login(username, password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('Password field is masked', async ({ loginPage }) => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });
});


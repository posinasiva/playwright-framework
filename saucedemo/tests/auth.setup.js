// Authentication Setup — runs once before all test projects
// Saves browser storage state so tests skip the login UI

const { test: setup } = require('@playwright/test');
const { mkdir } = require('fs/promises');
const path = require('path');
const LoginPage = require('../pages/LoginPage');
const users = require('../test-data/users.json');

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate as standard user', async ({ page }) => {
  await mkdir(path.dirname(authFile), { recursive: true });
  const loginPage = new LoginPage(page);
  await loginPage.goto('/');
  await loginPage.login(users.validUsers[0].username, users.validUsers[0].password);
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: authFile });
});

// Custom Page Fixtures

const { test: custom } = require('@playwright/test');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

const test = custom.extend({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },


  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // Authenticated page fixture
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('https://www.saucedemo.com');
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');
    await use(page);
  },
});

module.exports = { test, expect };
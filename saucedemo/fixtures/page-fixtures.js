// Custom Page Fixtures

const { test: base, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const users = require('../test-data/users.json');

const test = base.extend({

  // Login page fixture — unauthenticated, lands on login page
  // Login spec tests must override storageState to clear auth:
  //   test.use({ storageState: { cookies: [], origins: [] } })
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/');
    await use(loginPage);
  },

  // Authenticated page — storageState is applied at project level, so no UI login needed
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/inventory.html');
    await use(page);
  },

  // Products page — wraps the authenticated page
  productsPage: async ({ authenticatedPage }, use) => {
    await use(new ProductsPage(authenticatedPage));
  },

  // Cart page — authenticated, navigates directly to empty cart
  cartPage: async ({ authenticatedPage }, use) => {
    await authenticatedPage.goto('/cart.html');
    await use(new CartPage(authenticatedPage));
  },

  // Populated cart — adds one product then navigates to cart
  populatedCartPage: async ({ authenticatedPage }, use) => {
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.clickCart();
    await use(new CartPage(authenticatedPage));
  },
});

module.exports = { test, expect };


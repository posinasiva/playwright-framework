// Products Page Test Cases

const { test, expect } = require('../fixtures/page-fixtures');

test.describe('Products Tests', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // TODO: Login before each test
  });

  test('Display products list', async ({ page }) => {
    // TODO: Implement test
  });

  test('Add product to cart', async ({ productsPage }) => {
    // TODO: Implement test
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('Remove product from cart', async ({ page }) => {
    // TODO: Implement test
  });

  test('Filter products by price', async ({ page }) => {
    // TODO: Implement test
  });

  test('Sort products', async ({ page }) => {
    // TODO: Implement test
  });
});

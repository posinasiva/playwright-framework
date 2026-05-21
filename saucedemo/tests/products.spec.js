// Products Page Test Cases

const { test, expect } = require('../fixtures/page-fixtures');

test.describe('Products Tests', () => {

  test('Display all products on inventory page', async ({ productsPage }) => {
    await expect(productsPage.productItems).toHaveCount(6);
  });

  test('Add single product to cart', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('Add multiple products to cart', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await expect(productsPage.cartBadge).toHaveText('2');
  });

  test.skip('Filter products by price (low to high)', async ({ productsPage }) => {
    // TODO: Implement sort validation
  });

  test.skip('Sort products by name (Z to A)', async ({ productsPage }) => {
    // TODO: Implement sort validation
  });
});


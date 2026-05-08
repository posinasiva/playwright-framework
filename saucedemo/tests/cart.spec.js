// Cart Page Test Cases

const { test, expect } = require('../fixtures/page-fixtures');

test.describe('Cart Tests', { tag: '@cart' }, () => {

  test('Display empty cart after login', { tag: '@smoke' }, async ({ cartPage }) => {
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('Display cart with added item', { tag: '@smoke' }, async ({ populatedCartPage }) => {
    await expect(populatedCartPage.cartItems).toHaveCount(1);
  });

  test('Remove item from cart', { tag: '@regression' }, async ({ populatedCartPage }) => {
    await populatedCartPage.removeItemFromCart('Sauce Labs Backpack');
    await expect(populatedCartPage.cartItems).toHaveCount(0);
  });

  test('Proceed to checkout from cart', { tag: '@regression' }, async ({ populatedCartPage }) => {
    await populatedCartPage.clickCheckout();
    await expect(populatedCartPage.page).toHaveURL(/checkout/);
  });

  test('Continue shopping from cart', { tag: '@regression' }, async ({ cartPage }) => {
    await cartPage.clickContinueShopping();
    await expect(cartPage.page).toHaveURL(/inventory/);
  });
});


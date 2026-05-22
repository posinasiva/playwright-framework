// Cart Page Object

const BasePage = require('./BasePage');

class CartPage extends BasePage {

  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // Remove a cart item by product name
  async removeItemFromCart(itemName) {
    await this.cartItems
      .filter({ hasText: itemName })
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }
}

module.exports = CartPage;

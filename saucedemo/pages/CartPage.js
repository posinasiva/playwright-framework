// Cart Page Object

const BasePage = require('./BasePage');

class CartPage extends BasePage {
  // Selectors
  cartItems = '.cart_item';
  removeButton = 'button[name="remove"]';
  checkoutButton = 'button[name="checkout"]';
  continueShoppingButton = 'button[name="continue-shopping"]';
  cartBadge = '.shopping_cart_badge';

  // Get all cart items
  async getCartItems() {
    return await this.page.$$('.cart_item');
  }

  // Remove item from cart
  async removeItemFromCart(itemName) {
    const items = await this.page.$$('.cart_item');
    for (const item of items) {
      const name = await item.$('.inventory_item_name');
      const text = await name.textContent();
      if (text.includes(itemName)) {
        const button = await item.$('button');
        await button.click();
        break;
      }
    }
  }

  // Click checkout
  async clickCheckout() {
    await this.click(this.checkoutButton);
  }

  // Click continue shopping
  async clickContinueShopping() {
    await this.click(this.continueShoppingButton);
  }

  // Get number of items in cart
  async getItemCount() {
    const items = await this.getCartItems();
    return items.length;
  }
}

module.exports = CartPage;

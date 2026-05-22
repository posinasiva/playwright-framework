// Products Page Object

const BasePage = require('./BasePage');

class ProductsPage extends BasePage {

  constructor(page) {
    super(page);
    this.productItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('a.shopping_cart_link');
  }

  // Add product to cart by name
  async addProductToCart(productName) {
    await this.productItems
      .filter({ hasText: productName })
      .getByRole('button', { name: /add to cart/i })
      .click();
  }

  // Get cart badge count
  async getCartCount() {
    return await this.cartBadge.textContent();
  }

  // Click on cart
  async clickCart() {
    await this.cartLink.click();
  }
}

module.exports = ProductsPage;

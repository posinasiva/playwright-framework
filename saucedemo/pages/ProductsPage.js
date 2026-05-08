// Products Page Object

const BasePage = require('./BasePage');

class ProductsPage extends BasePage {

  constructor(page) {
    super(page);
    this.productItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('a.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  // Returns a locator for all product name elements
  getProductNames() {
    return this.page.locator('.inventory_item_name');
  }

  // Add product to cart by name
  async addProductToCart(productName) {
    await this.productItems
      .filter({ hasText: productName })
      .getByRole('button', { name: /add to cart/i })
      .click();
  }

  // Navigate to cart
  async clickCart() {
    await this.cartLink.click();
  }

  // Sort products by dropdown option value
  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }
}

module.exports = ProductsPage;

// Products Page Object

const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  // Selectors
  productList = '.inventory_list';
  productItem = '.inventory_item';
  addToCartButton = 'button[name="add-to-cart"]';
  cartBadge = '.shopping_cart_badge';
  cartLink = 'a.shopping_cart_link';

  // Get all products
  async getProducts() {
    return await this.page.$$('.inventory_item_name');
  }

  // Add product to cart by name
  async addProductToCart(productName) {
    const products = await this.page.$$('.inventory_item');
    for (const product of products) {
      const name = await product.$('.inventory_item_name');
      const text = await name.textContent();
      if (text.includes(productName)) {
        const button = await product.$('button');
        await button.click();
        break;
      }
    }
  }

  // Get cart badge count
  async getCartCount() {
    return await this.getText(this.cartBadge);
  }

  // Click on cart
  async clickCart() {
    await this.click(this.cartLink);
  }
}

module.exports = ProductsPage;

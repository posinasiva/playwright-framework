// Base Page Object - Contains common methods for all pages

class BasePage {
  
  constructor(page) {
    this.page = page;
  }

  // Navigate to URL
  async goto(url) {
    await this.page.goto(url);
  }

  // Wait for selector and click
  async click(selector) {
    await this.page.click(selector);
  }

  // Wait for selector and fill text
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  // Get text from element
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  // Check if element is visible
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  // Wait for navigation
  async waitForNavigation() {
    await this.page.waitForNavigation();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }
}

module.exports = BasePage;

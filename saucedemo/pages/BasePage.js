// Base Page Object - Provides shared navigation and screenshot utilities

class BasePage {

  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }
}

module.exports = BasePage;

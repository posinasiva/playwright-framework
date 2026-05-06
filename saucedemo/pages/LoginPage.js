// Login Page Object

const BasePage = require('./BasePage');

class LoginPage extends BasePage {

  constructor(page) {
    super(page);
  }
  
  // Selectors
  userNameInput = 'input[placeholder="Username"]';
  passwordInput = 'input[placeholder="Password"]';
  loginButton = 'input[type="submit"]';
  errorMessage = '.error-message-container';

  // Login method
  async login(username, password) {
    await this.fill(this.userNameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  // Get error message
  //Test message
  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  // Check if error is displayed
  async isErrorDisplayed() {
    return await this.isVisible(this.errorMessage);
  }
}

module.exports = LoginPage;

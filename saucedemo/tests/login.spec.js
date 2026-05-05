// Login Test Cases

const { test, expect } = require('../fixtures/page-fixtures');


test.describe('Login Tests', () => {

  // test.beforeEach(async ({ authenticatedPage }) => {
  //   // authenticatedPage is already logged in from the fixture
  //   await expect(authenticatedPage).toHaveTitle('Swag Labs');
  // });

 test('Successful login with valid credentials', async ({ authenticatedPage }) => {
    // authenticatedPage is already logged in from the fixture
       await expect(authenticatedPage).toHaveTitle('Swag Labs');
    
  });

  test('Login fails with invalid credentials', async ({ loginPage }) => {
    // TODO: Implement test
    await loginPage.goto('https://www.saucedemo.com');
    await loginPage.login('invalid_user', 'invalid_password');
  });

  test('Login fails with locked out user', async ({ page }) => {
    // TODO: Implement test
    //ToDo: Implement test
  });

  test('Password field is masked', async ({ page }) => {
    // TODO: Implement test
  });
});

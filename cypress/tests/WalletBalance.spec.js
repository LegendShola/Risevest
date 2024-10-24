import walletBalancePage from '../pageObjects/walletBalancePage'; // Import the walletBalancePage class
import viewWalletPage from '../pageObjects/viewWalletPage'; // Import the viewWalletPage class
import signInPage from '../pageObjects/signinPage'; // Import the signInPage class
const data = require('../fixtures/testData.json'); // Import test data from JSON file

xdescribe('Show/Hide Wallet Balance', () => {
    
    // Instantiate Page Objects for easy access to methods and elements
    const viewWallet = new viewWalletPage();
    const signIn = new signInPage();
    const walletBalance = new walletBalancePage();

    // Variables for user credentials
    const email = data.validEmail; // Fetch valid email from test data
    const password = data.password; // Fetch password from test data

    // Before each test, clear cookies and local storage, then sign in and open the wallet
    beforeEach(() => {
        cy.clearCookies(); // Clear cookies before each test
        cy.clearLocalStorage(); // Clear local storage before each test
        cy.visit(''); // Visit the base URL of the application
        signIn.signIn(email, password); // Sign in using valid credentials
        viewWallet.openWallet(); // Navigate to the wallet page
    })

    // Test case to verify the user can hide the wallet balance
    it('Verify user is able to hide wallet balance', () => {
        walletBalance.clickEyeIcon(); // Click the eye icon to hide the balance
        walletBalance.assertHideBalance(); // Assert that the balance is hidden
    });

    // Test case to verify the user can show the wallet balance
    it('Verify user is able to show wallet balance', () => {
        walletBalance.clickEyeIcon(); // Click the eye icon to hide the balance first
        walletBalance.clickEyeIcon(); // Click the eye icon again to show the balance
        walletBalance.assertShowBalance(); // Assert that the balance is visible
    });

});

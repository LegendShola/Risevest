import viewWalletPage from '../pageObjects/viewWalletPage'; // Import the viewWalletPage class
import signInPage from '../pageObjects/signinPage'; // Import the signInPage class
const data = require('../fixtures/testData.json'); // Import test data from JSON file

describe('User view wallet process', () => {
    
    // Instantiate Page Objects for easy access to methods and elements
    const viewWallet = new viewWalletPage();
    const signIn = new signInPage();

    // Variables for user credentials
    const email = data.validEmail; // Fetch valid email from test data
    const password = data.password; // Fetch password from test data

    // Before each test, clear cookies and local storage, then sign in
    beforeEach(() => {
        cy.clearCookies(); // Clear cookies before each test
        cy.clearLocalStorage(); // Clear local storage before each test
        cy.visit(''); // Visit the base URL of the application
        signIn.signIn(email, password); // Sign in using valid credentials
    })

    // Test case to verify the user can view their wallet successfully
    it('Verify user is able to view wallet successfully', () => {
        viewWallet.openWallet(); // Navigate to the wallet page
        viewWallet.assertBalance(); // Assert that the wallet balance is displayed correctly
    });

});

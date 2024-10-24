import viewPlansPage from '../pageObjects/viewPlansPage';
import signInPage from '../pageObjects/signinPage'; // Import the signInPage class from pageObjects
const data = require('../fixtures/testData.json');

xdescribe('View plans', () => {

    // Instantiate Page Objects for signInPage and viewPlansPage
    const signIn = new signInPage();
    const viewPlans = new viewPlansPage();

    // Test credentials from fixture data
    const email = data.validEmail;
    const password = data.password;

    beforeEach(() => {
        // Clear cookies and local storage before each test
        cy.clearCookies();
        cy.clearLocalStorage();
        // Visit the base URL
        cy.visit('');
        // Sign in with valid credentials
        signIn.signIn(email, password);
    });

    // Test case for verifying the user can view plans
    it('Verify user is able to view plans', () => {
        // Click on the plans button to navigate to the plans page
        viewPlans.clickPlansButton();
        // Assert that plans are displayed successfully
        viewPlans.assertPlans();
    });
});

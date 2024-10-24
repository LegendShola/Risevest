// Importing required modules
import signInPage from '../pageObjects/signinPage'; // Import the signInPage class from pageObjects
const data = require('../fixtures/testData.json'); // Import test data from a JSON file

// Define the test suite for the user sign in process
xdescribe('User sign in process', () => {

    // Instantiate the signInPage object to use in the tests
    const signIn = new signInPage();

    // Hook to visit the sign-in page before each test
    beforeEach(() => {
        cy.visit(''); // Visit the base URL of the sign-in page
    });

    // Test case: Verify user can sign in successfully with valid credentials
    it('Verify user is able to sign in successfully', () => {
        const email = data.validEmail; // Get valid email from test data
        const password = data.password; // Get valid password from test data
        signIn.signIn(email, password); // Perform sign-in action
        signIn.assertSuccess(); // Assert successful sign-in
    });

    // Test case: Verify user cannot sign in with a wrong email address
    it('Verify user is unable to sign in with a wrong email address', () => {
        const email = data.wrongEmail; // Get wrong email from test data
        const password = data.password; // Get valid password from test data
        signIn.signIn(email, password); // Perform sign-in action
        signIn.assertFailure(); // Assert failure due to wrong email
    });

    // Test case: Verify user cannot sign in with an invalid email format
    it('Verify user is unable to sign in with an invalid email address', () => {
        const email = data.invalidEmail; // Get invalid email from test data
        const password = data.password; // Get valid password from test data
        signIn.signIn(email, password); // Perform sign-in action
        signIn.assertInvalidEmail(); // Assert failure due to invalid email format
    });

    // Test case: Verify user cannot sign in with an invalid password
    it('Verify user is unable to sign in with invalid password', () => {
        const email = data.validEmail; // Get valid email from test data
        const password = data.invalidPassword; // Get invalid password from test data
        signIn.signIn(email, password); // Perform sign-in action
        signIn.assertFailure(); // Assert failure due to invalid password
    });

    // Test case: Verify user cannot sign in with an empty password field
    it('Verify user is unable to sign in with an empty password field', () => {
        const email = data.validEmail; // Get valid email from test data
        const password = data.invalidPassword; // Get any password to clear later
        signIn.signInEmptyPassword(email, password); // Perform sign-in with empty password
        signIn.assertEmptyPassword(); // Assert failure due to empty password
    });

    // Test case: Verify user cannot sign in with an empty email field
    it('Verify user is unable to sign in with an empty email field', () => {
        const email = data.validEmail; // Get any email to clear later
        const password = data.password; // Get valid password from test data
        signIn.signInEmptyEmail(email, password); // Perform sign-in with empty email
        signIn.assertEmptyEmail(); // Assert failure due to empty email
    });

    // Test case: Verify user cannot sign in with both empty email and password fields
    it('Verify user is unable to sign in with an empty email and password field', () => {
        const email = data.validEmail; // Get any email to clear later
        const password = data.password; // Get valid password from test data
        signIn.signInEmptyEmailAndPassword(email, password); // Perform sign-in with both fields empty
        signIn.assertEmptyEmail(); // Assert failure due to empty email
        signIn.assertEmptyPassword(); // Assert failure due to empty password
    });

});
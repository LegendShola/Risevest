class signInPage {

    // Elements object containing Cypress locators for the form fields and buttons
    elements = {
        // Getters for form fields and buttons using Cypress commands
        emailField: () => cy.get('#email'), // Get the email input field by its ID
        passwordField: () => cy.get('#password'), // Get the password input field by its ID
        signinBtn: () => cy.get("button[type='submit']"), // Get the Sign in button by its type attribute
        referEarnButton: () => cy.contains('span', 'Refer & earn!'), // Get the "Refer & earn" button by its text content
    }

    // Method to perform sign-in with email and password
    signIn(email, password) {
        this.elements.emailField().type(email); // Type email into the email field
        this.elements.passwordField().type(password); // Type password into the password field
        this.elements.signinBtn().click(); // Click the Sign in button
        cy.wait(6000); // Wait for 6 seconds to allow page navigation or response (can be adjusted)
    }

    // Method to sign in with an empty password field
    signInEmptyPassword(email, password) {
        this.elements.emailField().type(email); // Type email into the email field
        this.elements.passwordField().type(password).clear(); // Type password then clear the input
        this.elements.signinBtn().click(); // Click the Sign in button
    }

    // Method to sign in with an empty email field
    signInEmptyEmail(email, password) {
        this.elements.emailField().type(email).clear(); // Type email then clear the input
        this.elements.passwordField().type(password); // Type password into the password field
        this.elements.signinBtn().click(); // Click the Sign in button
    }

    // Method to sign in with both empty email and password fields
    signInEmptyEmailAndPassword(email, password) {
        this.elements.emailField().type(email).clear(); // Type email then clear the input
        this.elements.passwordField().type(password).clear(); // Type password then clear the input
        this.elements.signinBtn().click(); // Click the Sign in button
    }

    // Assertions to check if sign in was successful (for valid credentials)
    assertSuccess() {
        this.elements.referEarnButton().should('be.visible'); // Assert that the "Refer & earn" button is visible after a successful login
    }

    // Assertions to check if sign in failed (for invalid credentials)
    assertFailure() {
        cy.contains('div', 'Invalid email or password.') // Find error message containing the text
            .should('contain', 'Invalid email or password.'); // Assert the error message is displayed
    }

    // Assertions for an invalid email format
    assertInvalidEmail() {
        cy.get('#email-helper-text') // Get the helper text element for email field
            .should('contain', 'Enter a valid email address'); // Assert that the invalid email message is displayed
    }

    // Assertions for an empty password field
    assertEmptyPassword() {
        cy.get('#password-helper-text') // Get the helper text element for password field
            .should('contain', 'Enter your password'); // Assert that the empty password message is displayed
    }

    // Assertions for an empty email field
    assertEmptyEmail() {
        cy.get('#email-helper-text') // Get the helper text element for email field
            .should('contain', 'Enter your email address'); // Assert that the empty email message is displayed
    }
}

export default signInPage; // Export the signInPage class for use in tests
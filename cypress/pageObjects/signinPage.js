class signInPage {

    elements = {
        // Getters for form fields and buttons
        emailField: () => cy.get('#email'),
        passwordField: () => cy.get('#password'),
        signinBtn: () => cy.get("button[type='submit']"),
        referEarnButton: () => cy.contains('span', 'Refer & earn!'),

    }
  
    // Method to sign in
    signIn(email, password) {
        this.elements.emailField().type(email); // Enter email
        this.elements.passwordField().type(password); // Enter password
        this.elements.signinBtn().click(); // Click Sign in button
        cy.wait(6000);
    }

    signInEmptyPassword(email, password) {
        this.elements.emailField().type(email); // Enter email
        this.elements.passwordField().type(password).clear(); // Enter password
        this.elements.signinBtn().click(); // Click Sign in button
    }

    signInEmptyEmail(email, password) {
        this.elements.emailField().type(email).clear(); // Enter email
        this.elements.passwordField().type(password) // Enter password
        this.elements.signinBtn().click(); // Click Sign in button
    }

    signInEmptyEmailAndPassword(email, password) {
        this.elements.emailField().type(email).clear(); // Enter email
        this.elements.passwordField().type(password).clear(); // Enter password
        this.elements.signinBtn().click(); // Click Sign in button
    }
  
    // Assertions
    assertSuccess() {
        this.elements.referEarnButton().should('be.visible');
    }
    
    assertFailure() {
        cy.contains('div', 'Invalid email or password.').should('contain', 'Invalid email or password.');
    }

    assertInvalidEmail() {
        cy.get('#email-helper-text').should('contain', 'Enter a valid email address');
    }

    assertEmptyPassword() {
        cy.get('#password-helper-text').should('contain', 'Enter your password');
    }

    assertEmptyEmail() {
        cy.get('#email-helper-text').should('contain', 'Enter your email address');
    }

  
  }
  
  export default signInPage;
  
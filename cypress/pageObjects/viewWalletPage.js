class viewWalletPage {
    // Define elements using getters for easy access to UI components
    elements = {
        // Getter for the wallet button
        walletButton: () => cy.xpath("//span[normalize-space()='Wallet']"),
        // Getter for the password field
        passwordField: () => cy.get('#password'),
        // Getter for the sign-in button
        signinBtn: () => cy.get("button[type='submit']"),
        // Getter for the refer and earn button
        referEarnButton: () => cy.contains('span', 'Refer & earn!'),
    }
  
    // Method to navigate to the wallet section
    openWallet() {
        this.elements.walletButton().click(); // Click the wallet button to open the wallet page
    }

    // Assertion to verify that the user is on the wallet page and has a balance of $0.00
    assertBalance() {
        cy.url().should('eq', 'https://app.risevest.com/wallet'); // Assert that the current URL matches the expected wallet URL
        cy.get('.mt-3', { timeout: 10000 }).should('have.text', '$0.00'); // Assert that the displayed balance is $0.00, with a timeout of 10 seconds
    }
}
  
export default viewWalletPage; // Export the class for use in other modules

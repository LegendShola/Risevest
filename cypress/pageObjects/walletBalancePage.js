class walletBalancePage {

    // Define elements using getters for easy access to UI components
    elements = {
        // Getter for the eye icon button, which toggles the visibility of the balance
        eyeIcon: () => cy.get('button.text-primary'),
    }
  
    // Method to click the eye icon to toggle balance visibility
    clickEyeIcon() {
        this.elements.eyeIcon().click({force:true}); // Click the eye icon button
    }

    // Assertion to verify that the balance is hidden
    assertHideBalance() {
        cy.contains('p', '******') // Assert that the hidden balance is represented by asterisks
            .should('be.visible'); // Check that the hidden balance is visible
    }

    // Assertion to verify that the balance is displayed
    assertShowBalance() {
        cy.get('.mt-3', { timeout: 10000 }) // Wait for the balance element to appear
            .should('have.text', '$0.00'); // Assert that the displayed balance is $0.00
    }
}
  
export default walletBalancePage; // Export the class for use in other modules

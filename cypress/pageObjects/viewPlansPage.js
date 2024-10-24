class viewPlansPage {
    // Define elements using getters for easy access to UI components
    elements = {
        // Getter for the plans button
        plansButton: () => cy.get('[href="/plans"]'),
    }
  
    // Method to navigate to the plans page
    clickPlansButton() {
        this.elements.plansButton().click({force : true}); // Click the plans button to navigate
    }

    // Assertion to verify that the user is on the plans page
    assertPlans() {
        cy.url() // Check the current URL
            .should('eq', 'https://app.risevest.com/plans'); // Assert that it matches the expected URL
    }
}
  
export default viewPlansPage; // Export the class for use in other modules

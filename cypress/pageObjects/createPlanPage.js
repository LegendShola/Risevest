import data from '../fixtures/testData.json'; // Import test data from a JSON file

class createPlanPage {
    // Define elements using getters for form fields and buttons
    elements = {
        homeButton: () => cy.xpath("//span[normalize-space()='Home']"),
        plansButton: () => cy.get('[href="/plans"]'),
        businessPlanButton: () => cy.get('[href="/plans/goal/business"]'),
        schoolPlanButton: () => cy.get('[href="/plans/goal/school"]'),
        realEstatePlanButton: () => cy.get('[href="/plans/new/real-estate"]'),
        fixedIncomePlanButton: () => cy.get("a[href='/plans/new/fixed-income']"),
        continueButton: () => cy.xpath("//button[normalize-space()='Continue']"),
        planName: () => cy.get('#name'),
        USDCurrency: () => cy.contains('span', 'US Dollar'),
        nairaCurrency: () => cy.contains('span', 'Nigerian Naira'),
        amount: () => cy.get('input[inputmode="decimal"]'),
        startDate: () => cy.get('input[placeholder="DD-MM-YYYY"]'),
        agreeAndContinue: () => cy.get('button[type="submit"]'),
        getStartedButton: () => cy.contains('button', 'Get started'),
        createPlanButton: () => cy.contains('button', 'Create plan'),
        seeAllPlans: () => cy.xpath("//p[normalize-space()='See all plans']"),
        investmentPlanButton: () => cy.xpath("//a[@href='/plans/new/build-wealth']"),
        startInvestingButton: () => cy.xpath("//button[normalize-space()='Start Investing']"),
        percentInput: () => cy.get("#mui-1"),
        retirementAgeField: () => cy.get("#mui-2"),
        agreeNdContinue: () => cy.xpath("//button[normalize-space()='Agree & Continue']"),
        createPlanBtn: () => cy.xpath("//button[normalize-space()='Create Plan']"),
    }

    // Function to generate a random plan name
    generatePlanName() {
        // Fetch plan names from the test data JSON file
        const planNames = data.planNames;
        // Select a random plan name from the array
        const randomPlanName = planNames[Math.floor(Math.random() * planNames.length)];
        return `${randomPlanName}`;
    }

    // Function to generate a random amount
    generateRandomAmount() {
        // Fetch amounts from the test data JSON file
        const amounts = data.amounts;
        // Select a random amount from the array
        const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
        return `${randomAmount}`;
    }

    // Function to generate a random future date
    generateRandomFutureDate() {
        // Fetch future dates from the test data JSON file
        const futureDates = data.futureDates;
        // Select a random future date from the array
        const randomFutureDate = futureDates[Math.floor(Math.random() * futureDates.length)];
        return `${randomFutureDate}`;
    }

    // Function to select a random radio option
    selectRandomRadioOption() {
        const radioOptions = data.investmentOptions;
        // Select a random index from the array of radio options
        const randomIndex = Math.floor(Math.random() * radioOptions.length);
        // Click the randomly selected radio option
        cy.xpath(radioOptions[randomIndex]).click();
        cy.wait(2000);
        this.elements.continueButton().click();
        cy.wait(2000);
    }

    // Function to generate a random percentage
    getRandomPercentage(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to generate a random retirement age
    getRandomRetirementAge(min = 29, max = 65) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to randomly select and click one of the two child elements (currencies)
    selectRandomCurrency() {
        // Get all the list items within the <ul> element
        cy.get('ul.divide-y.divide-default.mt-5 li').then($listItems => {
            // Ensure there are exactly two list items
            if ($listItems.length === 2) {
                // Generate a random index (0 or 1)
                const randomIndex = Math.floor(Math.random() * 2);
                // Select and click the randomly chosen list item
                cy.wrap($listItems[randomIndex]).click();
            } else {
                throw new Error('Expected exactly 2 list items, but found ' + $listItems.length);
            }
        });
    }

    // Method to create an investment plan
    investmentPlan(name, amount, percent, age) {
        cy.wait(3000); // Wait for any necessary loading
        this.elements.investmentPlanButton().click(); // Navigate to the investment plan page
        cy.wait(3000);
        this.elements.startInvestingButton().click(); // Start the investing process
        this.selectRandomCurrency(); // Select a random currency
        this.elements.planName().type(name); // Enter the plan name
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.amount().type(amount); // Enter the investment amount
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.percentInput().type(percent); // Enter the percentage
        cy.wait(2000);
        this.elements.continueButton().click(); // Continue to the next step
        this.elements.retirementAgeField().click().type(age); // Enter the retirement age
        this.elements.continueButton().first().click(); // Continue to the next step
        this.selectRandomRadioOption(); // Select a random investment option
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.agreeNdContinue().click(); // Agree and continue to the next step
        this.elements.createPlanBtn().click(); // Click to create the plan
    }

    // Method to create a USD business plan
    usdBusinessPlan(name, amount, date) {
        this.elements.businessPlanButton().click(); // Navigate to business plan
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.planName().type(name); // Enter the plan name
        cy.wait(2000);
        this.elements.continueButton().click(); // Continue to the next step
        this.elements.USDCurrency().click(); // Select USD currency
        this.elements.amount().type(amount); // Enter the investment amount
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.startDate().type(date); // Enter the start date
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.agreeAndContinue().click(); // Agree and continue to create the plan
    }

    // Method to create a Naira business plan
    nairaBusinessPlan(name, amount, date) {
        this.elements.businessPlanButton().click(); // Navigate to business plan
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.planName().type(name); // Enter the plan name
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.nairaCurrency().click(); // Select Naira currency
        this.elements.amount().type(amount); // Enter the investment amount
        cy.wait(2000); // Wait for
        this.elements.continueButton().click(); // Continue to the next step
        this.elements.startDate().type(date); // Enter the start date
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.agreeAndContinue().click(); // Agree and continue to create the plan
    }

    // Method to create a USD school plan
    usdSchoolPlan(name, amount, date) {
        this.elements.schoolPlanButton().click(); // Navigate to school plan
        cy.wait(3000); // Wait for any necessary loading
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.planName().type(name); // Enter the plan name
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.USDCurrency().click(); // Select USD currency
        this.elements.amount().type(amount); // Enter the investment amount
        cy.wait(2000); // Wait for
        this.elements.continueButton().click(); // Continue to the next step
        this.elements.startDate().type(date); // Enter the start date
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.agreeAndContinue().click(); // Agree and continue to create the plan
    }

    // Method to create a Naira school plan
    nairaSchoolPlan(name, amount, date) {
        this.elements.schoolPlanButton().click(); // Navigate to school plan
        cy.wait(3000); // Wait for any necessary loading
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.planName().type(name); // Enter the plan name
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.nairaCurrency().click(); // Select Naira currency
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.amount().type(amount); // Enter the investment amount
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.startDate().type(date); // Enter the start date
        this.elements.continueButton().first().click(); // Continue to the next step
        this.elements.agreeAndContinue().click(); // Agree and continue to create the plan
    }

    // Method to create a real estate plan
    realEstatePlan(name) {
        this.elements.realEstatePlanButton().click(); // Navigate to real estate plan
        cy.wait(3000); // Wait for any necessary loading
        this.elements.getStartedButton().click(); // Start the process
        this.elements.planName().type(name); // Enter the plan name
        this.elements.continueButton().first().click(); // Continue to the next step        
    }

    // Method to click on a specific month option (3, 6, or 12)
    selectMonth(month) {
        cy.contains('label', month).click(); // Click the month label
    }

    // Method to assert the correct percentage after selecting a month
    assertPercentage(expectedPercentage) {
        cy.get('[data-test-id="est-returns"]').should('have.text', expectedPercentage + '%'); // Assert the expected percentage
    }

    // Full method to integrate the entire flow including the month selection and percentage assertion
    completeRealEstatePlan(name, month, expectedPercentage) {
        this.realEstatePlan(name); // Start the real estate plan
        this.selectMonth(month);   // Select the month (3, 6, or 12)
        this.assertPercentage(expectedPercentage); // Assert the percentage based on the month
        this.elements.createPlanButton().click(); // Click to create the plan
    }

    // Method to create a fixed income plan
    fixedIncomePlan(name) {
        this.elements.fixedIncomePlanButton().click(); // Navigate to fixed income plan
        cy.wait(3000); // Wait for any necessary loading
        this.elements.getStartedButton().click(); // Start the process
        this.elements.planName().type(name); // Enter the plan name
        this.elements.continueButton().first().click(); // Continue to the next step        
    }

    // Full method to integrate the entire flow for fixed income plan
    completeFixedIncomePlan(name, month, expectedPercentage) {
        this.fixedIncomePlan(name); // Start the fixed income plan
        this.selectMonth(month);   // Select the month (3, 6, or 12)
        this.assertPercentage(expectedPercentage); // Assert the percentage based on the month
        this.elements.createPlanButton().click(); // Click to create the plan
    }

    // Method to delete plans
    deletePlans() {
        cy.wait(3000); // Wait for any necessary loading
        this.elements.plansButton().click(); // Navigate to the plans page
        this.elements.seeAllPlans().click(); // See all plans
        cy.wait(3000); // Wait for any necessary loading
        cy.get('a[data-test-id="user-plan"]', { timeout: 15000 }).then($cards => {
            if ($cards.length > 0) {
                cy.wrap($cards[0]).within(() => {
                    cy.get('p').first().invoke('text').then((planName) => {
                        cy.log(`Deleting Plan: ${planName}`); // Log the plan name being deleted
                    });
                    cy.wrap($cards[0]).click(); // Click on the plan to delete
                });
                cy.contains('button', 'No, later').click({ force: true }); // Click to dismiss any confirmation
                cy.xpath("//header//button[2]").click(); // Click to delete the plan
                cy.xpath("//span[normalize-space()='Delete Plan']").click(); // Confirm deletion
                cy.xpath("//button[normalize-space()='Yes']").click(); // Final confirmation to delete
                cy.wait(2000); // Wait for any necessary loading
            }
        });        
    }

    // Assertions
    assertSuccess() {
        cy.get('h1.text-center.text-xl') // Check for success message
            .should('be.visible')
            .and('include.text', 'You just created your');
        cy.get('.circular-container') // Ensure the circular container is visible
            .should('be.visible');
    }

    assertDateFailure() {
        cy.xpath("//div[contains(text(),'Your request body is invalid')]") // Assert for invalid request body error
            .should('contain', 'Your request body is invalid');
    }
}

export default createPlanPage; // Export the class for use in other modules

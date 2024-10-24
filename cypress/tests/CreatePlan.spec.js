import viewPlansPage from '../pageObjects/viewPlansPage'; // Import the viewPlansPage class from pageObjects
import createPlanPage from '../pageObjects/createPlanPage'; // Import the createPlanPage class from pageObjects
import signInPage from '../pageObjects/signinPage'; // Import the signInPage class from pageObjects
const data = require('../fixtures/testData.json'); // Import the testData

describe('Create plan', () => {

    // Instantiate Page Objects for signInPage, viewPlansPage, and createPlanPage
    const signIn = new signInPage();
    const viewPlans = new viewPlansPage();
    const createPlan = new createPlanPage();

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
        // Click on the plans button to navigate to the plans page
        viewPlans.clickPlansButton();
    });

    // Test case for creating a business USD plan
    it('Verify user is able to create a business USD plan successfully', () => {
        const name = createPlan.generatePlanName(); // Generate a random plan name
        const amount = createPlan.generateRandomAmount(); // Generate a random amount
        const date = createPlan.generateRandomFutureDate(); // Generate a random future date

        // Create the USD business plan with generated values
        createPlan.usdBusinessPlan(name, amount, date);
        // Assert that the success message appears
        createPlan.assertSuccess();
        // Delete the created plans for cleanup
        createPlan.deletePlans();
    });

    // Test case for creating a business Naira plan
    it('Verify user is able to create a business naira plan successfully', () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = createPlan.generateRandomFutureDate();

        createPlan.nairaBusinessPlan(name, amount, date);
        createPlan.assertSuccess();
        createPlan.deletePlans();
    });

    // Test case for creating a new investment plan
    it('Verify user is able to create a new investment plan', () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const percent = createPlan.getRandomPercentage(); // Generate random percentage
        const age = createPlan.getRandomRetirementAge(); // Generate random retirement age
               
        createPlan.investmentPlan(name, amount, percent, age);
        createPlan.assertSuccess(); // Assert success message
        createPlan.deletePlans(); // Clean up by deleting created plans
    });

    // Test case for creating a school Naira plan
    it('Verify user is able to create a School naira plan successfully', () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = createPlan.generateRandomFutureDate();
        
        createPlan.nairaSchoolPlan(name, amount, date);
        createPlan.assertSuccess();
        createPlan.deletePlans();
    });

    // Test case for creating a school USD plan
    it('Verify user is able to create a School USD plan successfully', () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = createPlan.generateRandomFutureDate();
        
        createPlan.usdSchoolPlan(name, amount, date);
        createPlan.assertSuccess();
        createPlan.deletePlans();
    });

    // Test cases for real estate plans based on tenor
    const estateTestCases = data.realEstateTenor;
    estateTestCases.forEach(({ months, expectedPercentage }) => {
        it(`User is able to create real estate plan and display correct percentage for ${months} months`, () => {
            const name = `Real estate plan test case for ${months} months`;
            const planName = createPlan.generatePlanName();

            // Log the values being used for clarity
            cy.log(`Creating a plan with name: ${name}`);
            cy.log(`Selecting month: ${months} and expecting percentage: ${expectedPercentage}%`);
        
            // Complete the plan flow, select the month, and assert the percentage
            createPlan.completeRealEstatePlan(planName, months, expectedPercentage);
            createPlan.assertSuccess();
            createPlan.deletePlans();
        });
    });

    // Test cases for fixed income plans based on tenor
    const incomeTestCases = data.fixedIncomeTenor;
    incomeTestCases.forEach(({ months, expectedPercentage }) => {
        it(`User is able to create fixed income plan and display correct percentage for ${months} months`, () => {
            const name = `Fixed income plan test case for ${months} months`;
            const planName = createPlan.generatePlanName();

            // Log the values being used
            cy.log(`Creating a plan with name: ${name}`);
            cy.log(`Selecting month: ${months} and expecting percentage: ${expectedPercentage}%`);
        
            // Complete the plan flow, select the month, and assert the percentage
            createPlan.completeFixedIncomePlan(planName, months, expectedPercentage);
            createPlan.assertSuccess();
            createPlan.deletePlans();
        });
    });

    // Test case for creating a plan with a past date
    it('Verify user is unable to create plan with a past date', () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = data.pastDate; // Past date
        
        createPlan.nairaBusinessPlan(name, amount, date);
        createPlan.assertDateFailure(); // Assert failure due to past date
    });

    // Test case for creating a plan with an invalid date
    it('Verify user is unable to create plan with a invalid date', () => {
        const name = createPlan.generatePlanName();
        const amount = createPlan.generateRandomAmount();
        const date = data.invalidDate; // Invalid date format
        
        createPlan.nairaBusinessPlan(name, amount, date);
        createPlan.assertDateFailure(); // Assert failure due to invalid date
    });


});

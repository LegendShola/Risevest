// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import '@shelex/cypress-allure-plugin';

// Overwrite the default click command to always use { force: true }
Cypress.Commands.overwrite('click', (originalFn, subject, options) => {
    options = { ...options, force: true };
    return originalFn(subject, options);
});

// Overwrite the default type command to always use { force: true }
Cypress.Commands.overwrite('type', (originalFn, subject, text, options) => {
    options = { ...options, force: true };
    return originalFn(subject, text, options);
});

// Custome command to click Continue Button
Cypress.Commands.add('clickContinue', () => {
    cy.wait(3000); // Wait for necessary loading
    cy.xpath("//button[normalize-space()='Continue']").click({force:true});
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
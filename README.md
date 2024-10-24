# Risevest Web App Automation

This project automates the end-to-end testing of the Risevest web application using Cypress. The automation suite is built with the Page Object Model (POM) design pattern and follows data-driven testing techniques. The test suite leverages different sets of input data to ensure comprehensive coverage and validate the expected behavior of the application through assertions.

## Table of Contents
- [Key Features](#key-features)
- [Test Scripts](#test-scripts)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Cypress Configuration](#cypress-configuration)
- [Contributing](#contributing)
- [License](#license)

## Key Features
- **Page Object Model (POM) Design Pattern:** Each page of the application has a corresponding class in the `pageObjects` directory, encapsulating page-specific elements and actions.
- **Data-Driven Testing:** Test cases use external data from JSON files, allowing the suite to validate multiple input scenarios.
- **Assertions:** Verifies expected behavior by comparing actual application outcomes with expected results, ensuring that the application functions correctly.
- **Automated CI/CD Integration:** Automated testing pipeline using GitHub Actions, which runs tests on each push, pull request, or scheduled interval.

## Test Scripts
The project includes several test scripts to cover various functionalities:

- **Create Plans:** Tests for creating different types of investment plans.
- **User Sign-In:** Tests for verifying the sign-in process with various credential scenarios.
- **View Plans:** Tests for viewing existing investment plans.
- **View Wallet:** Tests for viewing wallet details and balance functionality.
- **Show/Hide Wallet Balance:** Tests for toggling the visibility of the wallet balance.

## Project Structure

```
risevest-automation/
├── cypress/
│   ├── fixtures/
│   │   └── testData.json           # Test data for data-driven tests
│   ├── pageObjects/
│   │   ├── createPlanPage.js       # Page Object for creating plans
│   │   ├── signinPage.js           # Page Object for sign-in process
│   │   ├── viewPlansPage.js        # Page Object for viewing plans
│   │   ├── viewWalletPage.js       # Page Object for viewing wallet
│   │   └── walletBalancePage.js    # Page Object for wallet balance interactions
│   ├── reports/
│   │   └── mochawesome/            # Directory for storing test reports
│   ├── results/
│   ├── tests/
│   │   ├── CreatePlans.spec.js     # Test spec for plan creation
│   │   ├── Signin.spec.js          # Test spec for sign-in process
│   │   ├── ViewPlans.spec.js       # Test spec for viewing plans
│   │   ├── ViewWallet.spec.js      # Test spec for viewing wallet
│   │   └── WalletBalance.spec.js   # Test spec for wallet balance show/hide
│   └── support/
│       ├── commands.js             # Custom Cypress commands
│       └── e2e.js                  # Cypress test configuration
├── .github/
│   └── workflows/
│       └── risevest-web-app-automation.yml  # GitHub Actions workflow
├── node_modules/                   # Node.js dependencies
├── config.js                       # Cypress configuration file
├── package.json                    # Project metadata and dependencies
└── README.md                       # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v20+)
- Cypress (v13.15.0)
- GitHub Actions for CI/CD integration

### Installing Dependencies
Clone the repository and install the dependencies using the following command:

```bash
npm install
```

### Running Tests
To open Cypress Test Runner:

```bash
npm run cypress:open
```

To run tests in headless mode and generate reports:

```bash
npm test
```

### Viewing Reports
After running tests, Mochawesome and Allure reports are generated:

- **Mochawesome** reports can be found in `cypress/reports/mochawesome/`.
- **Allure** reports are generated and uploaded via GitHub Actions.

### CI/CD Integration
The project is configured to run Cypress tests automatically on each push, pull request, or on a schedule (every 3 hours) via GitHub Actions. Test results are published and artifacts such as Allure reports are uploaded as part of the pipeline.

### Custom Commands
The project includes custom Cypress commands in the `commands.js` file:

```javascript
Cypress.Commands.add('clickContinue', () => {
    cy.wait(3000);
    cy.xpath("//button[normalize-space()='Continue']").click();
});
```

### Cypress Configuration
The Cypress configuration is managed via `config.js`. Key configurations include:

- `baseUrl`: [The base URL for the Risevest web app](https://app.risevest.com/).
- `viewportWidth` and `viewportHeight`: 1280 by 720.
- `defaultCommandTimeout`: Timeout for Cypress commands.
- `chromeWebSecurity`: Disabled to prevent Chrome's security warnings.

## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push to your branch and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
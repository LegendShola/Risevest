const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://app.risevest.com/",
    specPattern: 'cypress/tests/**/*.spec.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    failOnStatusCode: false
  },
  reporter: 'mochawesome',  
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',  
    overwrite: false,
    html: true,
    json: true,
  },
  env: {
    allure: true,
  }
});

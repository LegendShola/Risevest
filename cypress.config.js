const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      console.log('Allure plugin initialized');
      allureWriter(on, config);
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--allow-insecure-localhost');
        }

        if (browser.name === 'firefox') {
          launchOptions.preferences['network.proxy.no_proxies_on'] = '';
          launchOptions.preferences['network.stricttransportsecurity.preloadlist'] = false;
          launchOptions.preferences['network.http.speculative-parallel-limit'] = 0;
          launchOptions.preferences['security.fileuri.strict_origin_policy'] = false;
        }

        return launchOptions;
      });

      return config;
    },
    baseUrl: "https://app.risevest.com/",
    specPattern: 'cypress/tests/**/*.spec.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    failOnStatusCode: false,
    defaultCommandTimeout: 12000,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    quiet: true,
    timestamp: 'mmddyyyy_HHMMss',
  },
  env: {
    allureOutputPath: 'cypress/reports/allure-results',
    allure: true,
  }
});

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const {addMatchImageSnapshotPlugin} = require('cypress-image-snapshot/plugin');
const path = require("path");
const gmail_tester = require("gmail-tester");

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('file:preprocessor', webpackPreprocessor());

  on("task", {
    "gmail:check": async args => {
      const { from, to, subject } = args;
      const email = await gmail_tester.check_inbox(
        path.resolve(__dirname, "gt-credentials.json"), // credentials.json is inside plugins/ directory.
        path.resolve(__dirname, "gt-token.json"), // gmail_token.json is inside plugins/ directory.
        {
          subject: subject,
          from: from,
          to: to,
          wait_time_sec: 10,
          max_wait_time_sec: 30,
          include_body: true
        }
      );
      return email;
    },
    "gmail:get-messages": async args => {
      const messages = await gmail_tester.get_messages(
        path.resolve(__dirname, "gt-credentials.json"),
        path.resolve(__dirname, "gt-token.json"),
        args.options
      );
      return messages;
    }
  });

  addMatchImageSnapshotPlugin(on, config);

  require('cypress-react-unit-test/plugins/react-scripts')(on, config);
  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
}

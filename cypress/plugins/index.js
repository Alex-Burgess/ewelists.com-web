const {addMatchImageSnapshotPlugin} = require('cypress-image-snapshot/plugin');
const debug = require('debug')('cypress:server:protocol')
const CRI = require('chrome-remote-interface')
// const webpackPreprocessor = require('@cypress/webpack-preprocessor')
// const path = require("path");
// const gmail_tester = require("gmail-tester");

// Global Variables
let port = 0
let client = null

// Function Required to setup pseudo hover
function ensureRdpPort (args) {
  const existing = args.find((arg) => arg.slice(0, 23) === '--remote-debugging-port')

  if (existing) {
    return Number(existing.split('=')[1])
  }

  const port = 40000 + Math.round(Math.random() * 25000)

  args.push(`--remote-debugging-port=${port}`)

  return port
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Required for matchImageSnapshot() which is used for visual snapshot tests.
  addMatchImageSnapshotPlugin(on, config);

  // I believe this is part of setting up Pseudo Hover
  on('before:browser:launch', (browser, launchOptionsOrArgs) => {
    debug('browser launch args or options %o', launchOptionsOrArgs)
    const args = Array.isArray(launchOptionsOrArgs) ? launchOptionsOrArgs : launchOptionsOrArgs.args

    port = ensureRdpPort(args)
    debug('ensureRdpPort %d', port)
    debug('Chrome arguments %o', args)
  })

  on('task', {
    // Reset CRI resets the Chrome Remote Interface.
    // We need to do this when testing components with Pseudo Hover (i.e. activateHoverPseudo)
    resetCRI: async () => {
      if (client) {
        debug('resetting Chrome Remote Interface client')
        await client.close()
        client = null
      }

      return Promise.resolve(true)
    },
    // activateHoverPseudo is used to solve a problem where cypress doesn't provide hover functionality (https://docs.cypress.io/api/commands/hover.html)
    activatePrintMediaQuery: async () => {
      debug('activatePrintMediaQuery')
      client = client || await CRI({ port })

      return client.send('Emulation.setEmulatedMedia', { media: 'print' })
    },
    activateHoverPseudo: async ({ selector }) => {
      debug('activateHoverPseudo')
      client = client || await CRI({ port })
      await client.DOM.enable()
      await client.CSS.enable()
      // as the Window consists of two IFrames, we must retrieve the right one
      const allRootNodes = await client.DOM.getFlattenedDocument()
      const isIframe = (node) => node.nodeName === 'IFRAME' && node.contentDocument
      const filtered = allRootNodes.nodes.filter(isIframe)
      // The first IFrame is our App
      const root = filtered[0].contentDocument
      const { nodeId } = await client.DOM.querySelector({
        nodeId: root.nodeId,
        selector,
      })

      return client.CSS.forcePseudoState({
        nodeId,
        forcedPseudoClasses: ['hover'],
      })
    }
  })

  // on('file:preprocessor', webpackPreprocessor());

  // on("task", {
  //   "gmail:check": async args => {
  //     const { from, to, subject } = args;
  //     const email = await gmail_tester.check_inbox(
  //       path.resolve(__dirname, "gt-credentials.json"), // credentials.json is inside plugins/ directory.
  //       path.resolve(__dirname, "gt-token.json"), // gmail_token.json is inside plugins/ directory.
  //       {
  //         subject: subject,
  //         from: from,
  //         to: to,
  //         wait_time_sec: 10,
  //         max_wait_time_sec: 30,
  //         include_body: true
  //       }
  //     );
  //     return email;
  //   },
  //   "gmail:get-messages": async args => {
  //     const messages = await gmail_tester.get_messages(
  //       path.resolve(__dirname, "gt-credentials.json"),
  //       path.resolve(__dirname, "gt-token.json"),
  //       args.options
  //     );
  //     return messages;
  //   }
  // });

  // require('cypress-react-unit-test/plugins/react-scripts')(on, config);

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
}

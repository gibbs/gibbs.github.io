// https://nightwatchjs.org/gettingstarted/configuration/
module.exports = {
  src_folders: [],
  page_objects_path: ['test/e2e/pages'],
  custom_commands_path: ['node_modules/nightwatch/examples/custom-commands/'],
  custom_assertions_path: '',
  plugins: [],
  globals_path: 'test/config.js',
  webdriver: {},
  test_settings: {
    testing: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          args: [
            '--no-sandbox',
            '--ignore-certificate-errors',
            '--allow-insecure-localhost',
            '--headless',
            '--disable-gpu'
          ]
        }
      },
      webdriver: {
        start_process: true,
        server_path: '/usr/bin/chromedriver',
        cli_args: [
          // --verbose
        ]
      }
    },
    default: {
      disable_error_log: false,
      // eslint-disable-next-line no-template-curly-in-string
      launch_url: '${APP_URL}',
      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },
      desiredCapabilities: {
        browserName: 'firefox'
      },
      webdriver: {
        start_process: true,
        server_path: ''
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        alwaysMatch: {
          acceptInsecureCerts: true,
          'moz:firefoxOptions': {
            args: [
              '-headless',
              '-verbose'
            ]
          }
        }
      },
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ]
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            '--no-sandbox',
            '--ignore-certificate-errors',
            '--allow-insecure-localhost',
            '--headless',
            '--disable-gpu'
          ]
        }
      },
      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },
    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
        'ms:edgeOptions': {
          w3c: true,
          // More info on EdgeDriver: https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options
          args: [
            '--headless'
          ]
        }
      },
      webdriver: {
        start_process: true,
        // Download msedgedriver from https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/
        //  and set the location below:
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    }
  }
}

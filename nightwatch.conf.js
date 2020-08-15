const process = require('process');
const _ = require('lodash');
const env = require('./src/shared/env');
const {ONE_SECOND} = require('./src/constants/waits');

const localFirefoxArgs = [];
const headlessFirefoxArgs = [
  '-headless',
  `--window-size=${env.getEnv().NIGHTWATCH_HEADLESS_WIDTH},${
    env.getEnv().NIGHTWATCH_HEADLESS_HEIGHT
  }`
];

const localChromeArgs = ['disable-gpu'];
const headlessChromeArgs = [
  'headless',
  `window-size=${env.getEnv().NIGHTWATCH_HEADLESS_WIDTH},${
    env.getEnv().NIGHTWATCH_HEADLESS_HEIGHT
  }`,
  'disable-dev-shm-usage'
];

const dockerChromeArgs = [];

const getExtraFirefoxArgs = () => {
  if (!env.getEnv().NIGHTWATCH_GECKODRIVER_ARGS) {
    return [];
  }
  const args = env.getEnv().NIGHTWATCH_GECKODRIVER_ARGS.split(',');
  return args;
};

const getExtraChromeArgs = () => {
  if (!env.getEnv().NIGHTWATCH_CHROMEDRIVER_ARGS) {
    return [];
  }
  const args = env.getEnv().NIGHTWATCH_CHROMEDRIVER_ARGS.split(',');
  return args;
};

const makeDefaultEnv = () => ({
  launch_url: env.getEnv().NIGHTWATCH_LAUNCH_URL,
  end_session_on_fail: false,
  skip_testcases_on_fail: false,
  screenshots: {
    enabled: true,
    on_failure: true,
    on_error: true,
    path: `${env.getEnv().NIGHTWATCH_OUTPUT_FOLDER}/screenshots`
  },
  webdriver: {
    log_path: false
  },
  desiredCapabilities: {
    acceptSslCerts: true,
    acceptInsecureCerts: true
  }
});

const makeLocalFirefoxEnv = (args) => ({
  webdriver: {
    start_process: true,
    server_path:
      env.getEnv().NIGHTWATCH_GECKODRIVER_PATH ||
      env.getEnv().NPM_GECKODRIVER_PATH,
    host: 'localhost',
    port: 4444
  },
  desiredCapabilities: {
    browserName: 'firefox',
    'mox:firefoxOptions': {
      args: [...args, ...getExtraFirefoxArgs()]
    }
  }
});

const makeLocalChromeEnv = (args) => ({
  webdriver: {
    start_process: true,
    server_path:
      env.getEnv().NIGHTWATCH_CHROMEDRIVER_PATH ||
      env.getEnv().NPM_CHROMEDRIVER_PATH,
    host: 'localhost',
    port: 9515
  },
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      w3c: false,
      args: [...args, ...getExtraChromeArgs()]
    }
  }
});

const makeDockerChromeEnv = (args) => ({
  selenium: {
    host: env.getEnv().HUB_HOST,
    port: env.getEnv().HUB_PORT
  },
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      w3c: false,
      args: [...args, ...getExtraChromeArgs()]
    }
  }
});

const makeTestSettings = () => {
  const testSettings = {
    default: makeDefaultEnv()
  };
  switch (env.getEnv().NIGHTWATCH_ENVIRONMENT) {
    case 'LOCAL_FIREFOX_HEADLESS':
      testSettings.default = _.merge(
        testSettings.default,
        makeLocalFirefoxEnv([...localFirefoxArgs, ...headlessFirefoxArgs])
      );
      // Even with the -headless arg, firefox does not run in headless mode
      // unless you set this env var.
      process.env.MOZ_HEADLESS = '1';
      break;
    case 'LOCAL_FIREFOX':
      testSettings.default = _.merge(
        testSettings.default,
        makeLocalFirefoxEnv([...localFirefoxArgs])
      );
      break;
    case 'LOCAL_CHROME_HEADLESS':
      testSettings.default = _.merge(
        testSettings.default,
        makeLocalChromeEnv([...localChromeArgs, ...headlessChromeArgs])
      );
      break;
    case 'DOCKER_CHROME_HEADLESS':
      testSettings.default = _.merge(
        testSettings.default,
        makeDockerChromeEnv([...dockerChromeArgs, ...headlessChromeArgs])
      );
      break;
    default:
      // LOCAL_CHROME
      testSettings.default = _.merge(
        testSettings.default,
        makeLocalChromeEnv(localChromeArgs)
      );
      break;
  }
  return testSettings;
};

// Ref: https://github.com/nightwatchjs/nightwatch/blob/master/lib/settings/defaults.js
module.exports = {
  // An object which will be made available on the main test api,
  // throughout the test execution.
  globals: {
    // This controls whether to abort the test execution when an assertion
    // failed and skip the rest.
    // It's being used in waitFor commands and expect assertions.
    abortOnAssertionFailure: true,

    // This will overwrite the default polling interval (currently 500ms) for
    // waitFor commands and expect assertions that use retry.
    waitForConditionPollInterval: 500,

    // Default timeout value in milliseconds for waitFor commands and implicit
    // waitFor value for expect assertions.
    waitForConditionTimeout: 5 * ONE_SECOND,

    // This will cause waitFor commands on elements to throw an error if
    // multiple elements are found using the given locate strategy
    // and selector.
    throwOnMultipleElementsReturned: false,

    // By default a warning is printed if multiple elements are found using the
    // given locate strategy and selector; set this to true to suppress
    // those warnings.
    suppressWarningsOnMultipleElementsReturned: false,

    // Automatically retrying failed assertions.
    // You can tell Nightwatch to automatically retry failed assertions until
    // a given timeout is reached, before the test runner gives up and fails
    // the test.
    retryAssertionTimeout: 5 * ONE_SECOND
  },

  // Location of an external globals module which will be loaded and made
  // available to the test as a property globals on the main client instance.
  globals_path: 'globals.js',

  // The location where the JUnit XML report files will be saved.
  // Set this to false if you want to disable XML reporting.
  output_folder: `${env.getEnv().NIGHTWATCH_OUTPUT_FOLDER}/report`,

  // An array of folders (excluding subfolders) where your tests are located.
  // If this is not specified, the test source must be passed as the second
  // argument to the test runner.
  src_folders: ['src/tests'],

  // Location(s) where page object files will be loaded from.
  page_objects_path: ['src/page_objects'],

  // Location(s) where custom commands will be loaded from.
  custom_commands_path: ['src/commands'],

  // Location(s) where custom assertions will be loaded from.
  custom_assertions_path: ['src/assertions'],

  // Whether or not to run individual test suites (files) in parallel using a
  // test worker for each.
  // If set to true, runs the tests in parallel and determines the number of
  // workers automatically.
  test_workers: {
    enabled: env.getEnv().NIGHTWATCH_PARALLEL,
    workers: env.getEnv().NIGHTWATCH_PARALLEL_WORKERS
  },

  // An object in which all the test environments are defined, each overwriting
  // test settings as needed.
  // A default environment is always required, from which the other
  // environments inherit settings from.
  test_settings: makeTestSettings()
};

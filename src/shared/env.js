const process = require('process');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
require('dotenv').config({path: '.env'});

let env = {};

const convertToBoolean = (val) => {
  if (val === 'true' || val === true) {
    return true;
  }
  return false;
};

const convertToIntegerIfInteger = (val) => {
  const parsed = Number.parseInt(val, 10);
  if (Number.isInteger(parsed)) {
    return parsed;
  }
  return val;
};

const setEnv = () => {
  env = {
    NIGHTWATCH_LAUNCH_URL:
      process.env.NIGHTWATCH_LAUNCH_URL === undefined
        ? 'http://localhost:5000'
        : process.env.NIGHTWATCH_LAUNCH_URL,
    NIGHTWATCH_ENVIRONMENT:
      process.env.NIGHTWATCH_ENVIRONMENT === undefined
        ? 'LOCAL_CHROME'
        : process.env.NIGHTWATCH_ENVIRONMENT,
    NIGHTWATCH_HEADLESS_WIDTH:
      process.env.NIGHTWATCH_HEADLESS_WIDTH === undefined
        ? '1920'
        : process.env.NIGHTWATCH_HEADLESS_WIDTH,
    NIGHTWATCH_HEADLESS_HEIGHT:
      process.env.NIGHTWATCH_HEADLESS_HEIGHT === undefined
        ? '1080'
        : process.env.NIGHTWATCH_HEADLESS_HEIGHT,
    NIGHTWATCH_OUTPUT_FOLDER:
      process.env.NIGHTWATCH_OUTPUT_FOLDER === undefined
        ? 'tests_output'
        : process.env.NIGHTWATCH_OUTPUT_FOLDER,
    NIGHTWATCH_PARALLEL: convertToBoolean(
      process.env.NIGHTWATCH_PARALLEL === undefined
        ? false
        : process.env.NIGHTWATCH_PARALLEL
    ),
    NIGHTWATCH_PARALLEL_WORKERS: convertToIntegerIfInteger(
      process.env.NIGHTWATCH_PARALLEL_WORKERS === undefined
        ? 'auto'
        : process.env.NIGHTWATCH_PARALLEL_WORKERS
    ),
    NIGHTWATCH_GECKODRIVER_ARGS: process.env.NIGHTWATCH_GECKODRIVER_ARGS,
    NIGHTWATCH_GECKODRIVER_PATH: process.env.NIGHTWATCH_GECKODRIVER_PATH,
    NPM_GECKODRIVER_PATH: geckodriver.path,
    NIGHTWATCH_CHROMEDRIVER_ARGS: process.env.NIGHTWATCH_CHROMEDRIVER_ARGS,
    NIGHTWATCH_CHROMEDRIVER_PATH: process.env.NIGHTWATCH_CHROMEDRIVER_PATH,
    NPM_CHROMEDRIVER_PATH: chromedriver.path,
    // The following env vars are only used by Selenium Grid
    HUB_HOST: process.env.HUB_HOST,
    HUB_PORT: process.env.HUB_PORT
  };
};

const getEnv = () => {
  setEnv();
  return env;
};

module.exports = {
  getEnv
};

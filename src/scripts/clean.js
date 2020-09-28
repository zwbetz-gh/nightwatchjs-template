const process = require('process');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');
const env = require('../shared/env');

const main = () => {
  const outputDir = path.resolve(
    process.cwd(),
    env.getEnv().NIGHTWATCH_OUTPUT_FOLDER
  );
  console.log(`Removing dir ${chalk.cyan(outputDir)}`);
  rimraf(outputDir, (error) => {
    if (error) {
      console.error(`Error when removing dir ${chalk.cyan(outputDir)}`, error);
    }
  });
};

main();

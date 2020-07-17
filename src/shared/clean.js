const process = require('process');
const path = require('path');
const rimraf = require('rimraf');
const env = require('./env');

const clean = () => {
  const outputDir = path.resolve(
    process.cwd(),
    env.getEnv().NIGHTWATCH_OUTPUT_FOLDER
  );
  console.log(`Removing dir ${outputDir}`);
  rimraf(outputDir, (error) => {
    if (error) {
      console.error(`Error when removing dir ${outputDir}`, error);
    }
  });
};

const main = () => {
  clean();
};

main();

module.exports = clean;

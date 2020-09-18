const process = require('process');
const path = require('path');
const env = require('../shared/env');

/**
 * Take a screenshot and save it to the output dir
 *
 * @param {string} filename - An optional filename
 */
const command = function (filename = 'screenshot') {
  this.perform(() => {
    const filePath = path.resolve(
      process.cwd(),
      env.getEnv().NIGHTWATCH_OUTPUT_FOLDER,
      'screenshots',
      `${filename}-${Date.now()}.png`
    );
    console.log(`Saving screenshot to ${filePath}`);
    this.saveScreenshot(filePath);
  });

  return this;
};

module.exports.command = command;

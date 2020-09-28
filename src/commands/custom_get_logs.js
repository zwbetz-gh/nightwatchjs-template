const chalk = require('chalk');

/**
 * Get browser or driver logs.
 *
 * @param {string} logType - An optional logType, must be one of: browser, driver
 * @param {function()} callback - An optional callback
 */
const command = function (logType = 'browser', callback) {
  this.perform(() => {
    this.getLog(logType, (logEntriesArray) => {
      console.log(
        `${chalk.cyan(logType)} logs length: ${chalk.cyan(
          logEntriesArray.length
        )}`
      );
      logEntriesArray.forEach((log) => {
        console.log(
          `[${chalk.cyan(log.level)}] [${chalk.cyan(
            log.timestamp
          )}] ${chalk.cyan(log.message)}`
        );
      });
      callback && callback();
    });
  });

  return this;
};

module.exports.command = command;

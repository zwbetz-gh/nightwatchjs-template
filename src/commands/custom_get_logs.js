/**
 * Get browser or driver logs.
 *
 * @param {string} logType - An optional logType, must be one of: browser, driver
 * @param {function()} callback - An optional callback
 */
const command = function (logType = 'browser', callback) {
  this.perform(() => {
    this.getLog(logType, (logEntriesArray) => {
      console.log(`${logType} logs length: ${logEntriesArray.length}`);
      logEntriesArray.forEach((log) => {
        console.log(`[${log.level}] [${log.timestamp}] ${log.message}`);
      });
      callback && callback();
    });
  });

  return this;
};

module.exports.command = command;

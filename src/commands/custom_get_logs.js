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

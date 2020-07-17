const nightwatchConfig = require('../../nightwatch.conf');
const {makePrettyJson} = require('../shared/shared');

const main = () => {
  const string = makePrettyJson(nightwatchConfig);
  console.log(string);
};

main();

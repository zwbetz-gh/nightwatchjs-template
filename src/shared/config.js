const nightwatchConfig = require('../../nightwatch.conf');
const {makePrettyJson} = require('./shared');

const main = () => {
  const string = makePrettyJson(nightwatchConfig);
  console.log(string);
};

main();

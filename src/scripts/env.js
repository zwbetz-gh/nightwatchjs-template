const env = require('../shared/env');
const {makePrettyJson} = require('../shared/shared');

const main = () => {
  const string = makePrettyJson(env.getEnv());
  console.log(string);
};

main();

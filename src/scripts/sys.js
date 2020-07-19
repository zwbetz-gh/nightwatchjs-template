const sys = require('../shared/sys');
const {makePrettyJson} = require('../shared/shared');

const main = () => {
  const string = makePrettyJson(sys.getSys());
  console.log(string);
};

main();

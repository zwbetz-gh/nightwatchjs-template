const store = require('./store');
const {makePrettyJson} = require('./shared');

const beforeEach = (browser) => {
  browser.maximizeWindow();
};

const afterEach = (browser) => {
  browser.end();
  const string = makePrettyJson(store.getData());
  console.log('Data store', string);
};

module.exports = {
  beforeEach,
  afterEach
};

const store = require('./store');
const {makePrettyJson} = require('./shared');

const beforeEach = (browser) => {
  const maximizeWindowCallback = () => {
    console.log('Window maximized');
  };
  browser.maximizeWindow(maximizeWindowCallback);
};

const afterEach = (browser) => {
  const endCallback = () => {
    console.log('Browser session ended');
  };
  browser.end(endCallback);
  const string = makePrettyJson(store.getData());
  console.log('Data store', string);
};

module.exports = {
  beforeEach,
  afterEach
};

const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');
const {makePseudoRandom} = require('../shared/shared');
const helper = require('../shared/helper');

module.exports = {
  '@disabled': false,

  '@tags': ['ADD', 'PSEUDO', 'RANDOM'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'make pseudo random': (browser) => {
    const pages = getPages(browser);

    const number1 = Number.parseInt(makePseudoRandom(5, 'numeric'), 10);
    const number2 = Number.parseInt(makePseudoRandom(5, 'numeric'), 10);
    const result = number1 + number2;

    pages.template_page.navigate();

    pages.template_page.calculateResult(String(number1), '+', String(number2));

    helper.assertValue(browser, pages.template_page.result, String(result));
  }
};

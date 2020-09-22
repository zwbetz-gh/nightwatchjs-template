const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');
const env = require('../shared/env');

module.exports = {
  '@disabled': false,

  '@tags': ['PLAYGROUND'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'api playground for assert': (browser) => {
    const pages = getPages(browser);

    pages.template_page.navigate();

    browser.assert.attributeContains(
      pages.template_page.number1,
      'class',
      'form-control'
    );

    browser.assert.attributeEquals(
      pages.template_page.number1,
      'class',
      'form-control form-control-lg'
    );

    browser.assert.containsText('h1', 'Sample');

    browser.getText('h1', (result) => {
      const actual = result.value;
      const expected = 'Sample Calculator App';
      browser.assert.strictEqual(actual, expected);
    });

    browser.assert.cssClassPresent(pages.template_page.number1, [
      'form-control',
      'form-control-lg'
    ]);

    browser.assert.cssProperty(pages.template_page.number1, 'display', 'block');

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      browser.assert.cssProperty(
        pages.template_page.number1,
        'color',
        'rgba(73, 80, 87, 1)' // #495057
      );
    }

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('FIREFOX')) {
      browser.assert.cssProperty(
        pages.template_page.number1,
        'color',
        'rgb(73, 80, 87)' // #495057
      );
    }

    browser.assert.domPropertyContains(
      pages.template_page.number1,
      'tagName',
      'INPUT'
    );

    browser.assert.domPropertyEquals(
      pages.template_page.operation,
      'tagName',
      'SELECT'
    );

    browser.assert.elementPresent(pages.template_page.number1);

    browser.assert.title('Sample Calculator App');

    browser.assert.urlContains('http');

    browser.assert.visible(pages.template_page.number1);
  }
};

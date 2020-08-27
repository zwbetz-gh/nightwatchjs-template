const hooks = require('../shared/hooks');

module.exports = {
  '@disabled': false,

  '@tags': ['PLAYGROUND'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'api playground': (browser) => {
    browser.page.template_page().navigate();

    browser.page
      .template_page()
      .assert.attributeContains('@number1', 'class', 'form-control');

    browser.page
      .template_page()
      .assert.attributeEquals(
        '@number1',
        'class',
        'form-control form-control-lg'
      );

    browser.assert.containsText('h1', 'Sample');

    browser.getText('h1', (result) => {
      const actual = result.value;
      const expected = 'Sample Calculator App';
      browser.assert.strictEqual(actual, expected);
    });

    browser.page
      .template_page()
      .assert.cssClassPresent('@number1', ['form-control', 'form-control-lg']);

    browser.page
      .template_page()
      .assert.cssProperty('@number1', 'display', 'block');

    browser.page.template_page().assert.cssProperty(
      '@number1',
      'color',
      'rgba(73, 80, 87, 1)' // #495057
    );

    browser.page
      .template_page()
      .assert.domPropertyContains('@number1', 'tagName', 'INPUT');

    browser.page
      .template_page()
      .assert.domPropertyEquals('@operation', 'tagName', 'SELECT');

    browser.page.template_page().assert.elementPresent('@number1');

    browser.assert.title('Sample Calculator App');

    browser.assert.urlContains('http');

    browser.page.template_page().assert.visible('@number1');
  }
};

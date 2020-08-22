const hooks = require('../shared/hooks');
const template_page = require('../page_objects/template_page');

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

    browser.assert.attributeContains(
      template_page.elements.number1,
      'class',
      'form-control'
    );

    browser.assert.attributeEquals(
      template_page.elements.number1,
      'class',
      'form-control form-control-lg'
    );

    browser.assert.containsText('h1', 'Sample');

    browser.assert.cssClassPresent(template_page.elements.number1, [
      'form-control',
      'form-control-lg'
    ]);

    browser.assert.cssProperty(
      template_page.elements.number1,
      'display',
      'block'
    );

    browser.assert.cssProperty(
      template_page.elements.number1,
      'color',
      'rgba(73, 80, 87, 1)' // #495057
    );

    browser.assert.domPropertyContains(
      template_page.elements.number1,
      'tagName',
      'INPUT'
    );

    browser.assert.domPropertyEquals(
      template_page.elements.operation,
      'tagName',
      'SELECT'
    );

    browser.assert.elementPresent(template_page.elements.number1);

    browser.assert.title('Sample Calculator App');

    browser.assert.urlContains('http');

    browser.assert.visible(template_page.elements.number1);
  }
};

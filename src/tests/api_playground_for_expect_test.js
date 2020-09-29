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

  'api playground for expect': (browser) => {
    const pages = getPages(browser);

    pages.template_page.navigate();

    browser.expect.element(pages.template_page.number1).to.be.an('input');

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      browser.expect.element(pages.template_page.number1).to.not.be.active;

      pages.template_page.clickNumber1();

      browser.expect.element(pages.template_page.number1).to.be.active;
    }

    browser.expect
      .element(pages.template_page.number1)
      .to.have.attribute('class')
      .which.equals('form-control form-control-lg');

    browser.expect
      .element(pages.template_page.number1)
      .to.have.css('display')
      .which.equals('block');

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      browser.expect
        .element(pages.template_page.number1)
        .to.have.css('color')
        .which.equals('rgba(73, 80, 87, 1)'); // #495057
    }

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('FIREFOX')) {
      browser.expect
        .element(pages.template_page.number1)
        .to.have.css('color')
        .which.equals('rgb(73, 80, 87)'); // #495057
    }

    browser.expect.element(pages.template_page.number1).to.be.enabled;

    browser.expect.element(pages.template_page.number1).to.be.present;

    browser.expect.element(pages.template_page.number1).to.not.be.selected;

    browser.expect.element('h1').text.to.equal('Sample Calculator App');

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      browser.expect.element(pages.template_page.number1).value.to.equal('');

      pages.template_page.setNumber1('1');

      browser.expect.element(pages.template_page.number1).value.to.equal('1');
    }

    browser.expect.element(pages.template_page.number1).to.be.visible;

    browser.expect.elements(pages.template_page.operation).count.to.equal(1);

    browser.expect.title().to.contain('Sample Calculator App');

    browser.expect.url().to.contain('http');
  }
};

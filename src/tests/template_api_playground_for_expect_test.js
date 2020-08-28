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

  'api playground for expect': (browser) => {
    browser.page.template_page().navigate();

    browser.page.template_page().expect.element('@number1').to.be.an('input');

    browser.page.template_page().expect.element('@number1').to.not.be.active;

    browser.page.template_page().clickNumber1();

    browser.page.template_page().expect.element('@number1').to.be.active;

    browser.page
      .template_page()
      .expect.element('@number1')
      .to.have.attribute('class')
      .which.equals('form-control form-control-lg');

    browser.page
      .template_page()
      .expect.element('@number1')
      .to.have.css('display')
      .which.equals('block');

    browser.page
      .template_page()
      .expect.element('@number1')
      .to.have.css('color')
      .which.equals('rgba(73, 80, 87, 1)'); // #495057

    browser.page.template_page().expect.element('@number1').to.be.enabled;

    browser.page.template_page().expect.element('@number1').to.be.present;

    browser.page.template_page().expect.element('@number1').to.not.be.selected;

    browser.page
      .template_page()
      .expect.element('h1')
      .text.to.equal('Sample Calculator App');

    browser.page.template_page().expect.element('@number1').value.to.equal('');

    browser.page.template_page().setNumber1('1');

    browser.page.template_page().expect.element('@number1').value.to.equal('1');

    browser.page.template_page().expect.element('@number1').to.be.visible;

    browser.page
      .template_page()
      .expect.elements('@operation')
      .count.to.equal(1);

    browser.page
      .template_page()
      .expect.title()
      .to.contain('Sample Calculator App');

    browser.page.template_page().expect.url().to.contain('http');
  }
};

const hooks = require('../shared/hooks');
const {makePrettyJson} = require('../shared/shared');

module.exports = {
  '@disabled': false,

  '@tags': ['PLAYGROUND'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'api playground for various': (browser) => {
    browser.page.template_page().navigate();

    const element = '@operation';
    const attribute = 'class';
    const cssProperty = 'display';
    const property = 'innerHTML';

    browser.page.template_page().getAttribute(element, attribute, (result) => {
      console.log(
        `getAttribute ${element} ${attribute} ${makePrettyJson(result.value)}`
      );
      console.log('---');
    });

    browser.page
      .template_page()
      .getCssProperty(element, cssProperty, (result) => {
        console.log(
          `getCssProperty ${element} ${cssProperty} ${makePrettyJson(
            result.value
          )}`
        );
        console.log('---');
      });

    browser.page
      .template_page()
      .getElementProperty(element, property, (result) => {
        console.log(
          `getElementProperty ${element} ${property} ${makePrettyJson(
            result.value
          )}`
        );
        console.log('---');
      });

    browser.page.template_page().getElementSize(element, (result) => {
      console.log(`getElementSize ${element} ${makePrettyJson(result.value)}`);
      console.log('---');
    });

    browser.page.template_page().getTagName(element, (result) => {
      console.log(`getTagName ${element} ${makePrettyJson(result.value)}`);
      console.log('---');
    });

    browser.page.template_page().getText(element, (result) => {
      console.log(`getText ${element} ${makePrettyJson(result.value)}`);
      console.log('---');
    });

    browser.page.template_page().getValue(element, (result) => {
      console.log(`getValue ${element} ${makePrettyJson(result.value)}`);
      console.log('---');
    });

    browser.page.template_page().isVisible(element, (result) => {
      console.log(`isVisible ${element} ${makePrettyJson(result.value)}`);
      console.log('---');
    });

    browser.page.template_page().getLocation(element, (result) => {
      console.log(`getLocation ${element} ${makePrettyJson(result.value)}`);
      console.log('---');
    });

    browser.page.template_page().getLocationInView(element, (result) => {
      console.log(
        `getLocationInView ${element} ${makePrettyJson(result.value)}`
      );
      console.log('---');
    });

    browser.url((result) => {
      console.log(`url ${makePrettyJson(result.value)}`);
      console.log('---');
    });

    browser.title((result) => {
      console.log(`title ${makePrettyJson(result.value)}`);
      console.log('---');
    });
  }
};

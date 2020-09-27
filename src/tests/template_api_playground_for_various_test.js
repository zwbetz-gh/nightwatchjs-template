const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');
const {makePrettyJson} = require('../shared/shared');
const env = require('../shared/env');

const separator = () => console.log('---');

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
    const pages = getPages(browser);

    pages.template_page.navigate();

    const element = pages.template_page.operation;
    const attribute = 'class';
    const cssProperty = 'display';
    const property = 'innerHTML';

    browser.getAttribute(element, attribute, (result) => {
      console.log(
        `getAttribute ${element} ${attribute} ${makePrettyJson(result.value)}`
      );
      separator();
    });

    browser.getCssProperty(element, cssProperty, (result) => {
      console.log(
        `getCssProperty ${element} ${cssProperty} ${makePrettyJson(
          result.value
        )}`
      );
      separator();
    });

    browser.getElementProperty(element, property, (result) => {
      console.log(
        `getElementProperty ${element} ${property} ${makePrettyJson(
          result.value
        )}`
      );
      separator();
    });

    browser.getElementSize(element, (result) => {
      console.log(`getElementSize ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.getTagName(element, (result) => {
      console.log(`getTagName ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.getText(element, (result) => {
      console.log(`getText ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.getValue(element, (result) => {
      console.log(`getValue ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.isVisible(element, (result) => {
      console.log(`isVisible ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.getLocation(element, (result) => {
      console.log(`getLocation ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      browser.getLocationInView(element, (result) => {
        console.log(
          `getLocationInView ${element} ${makePrettyJson(result.value)}`
        );
        separator();
      });
    }

    browser.url((result) => {
      console.log(`url ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.title((result) => {
      console.log(`title ${makePrettyJson(result.value)}`);
      separator();
    });

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      const scriptBody = function () {
        console.log('log');
        console.info('info');
        console.warn('warn');
        console.error('error');
        console.debug('debug');
        console.trace('trace');
      };

      const scriptArgs = [];

      const callback = () => {
        console.log('execute');
        separator();
      };

      browser.execute(scriptBody, scriptArgs, callback);

      browser.custom_get_logs('browser', separator);

      browser.custom_get_logs('driver', separator);
    }

    browser.assert.strictEqual(1, 1);

    browser.perform(() => {
      separator();
    });
  }
};

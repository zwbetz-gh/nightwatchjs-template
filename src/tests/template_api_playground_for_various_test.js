const hooks = require('../shared/hooks');
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
    browser.page.template_page().navigate();

    const element = '@operation';
    const attribute = 'class';
    const cssProperty = 'display';
    const property = 'innerHTML';

    browser.page.template_page().getAttribute(element, attribute, (result) => {
      console.log(
        `getAttribute ${element} ${attribute} ${makePrettyJson(result.value)}`
      );
      separator();
    });

    browser.page
      .template_page()
      .getCssProperty(element, cssProperty, (result) => {
        console.log(
          `getCssProperty ${element} ${cssProperty} ${makePrettyJson(
            result.value
          )}`
        );
        separator();
      });

    browser.page
      .template_page()
      .getElementProperty(element, property, (result) => {
        console.log(
          `getElementProperty ${element} ${property} ${makePrettyJson(
            result.value
          )}`
        );
        separator();
      });

    browser.page.template_page().getElementSize(element, (result) => {
      console.log(`getElementSize ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.page.template_page().getTagName(element, (result) => {
      console.log(`getTagName ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.page.template_page().getText(element, (result) => {
      console.log(`getText ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.page.template_page().getValue(element, (result) => {
      console.log(`getValue ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.page.template_page().isVisible(element, (result) => {
      console.log(`isVisible ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    browser.page.template_page().getLocation(element, (result) => {
      console.log(`getLocation ${element} ${makePrettyJson(result.value)}`);
      separator();
    });

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      browser.page.template_page().getLocationInView(element, (result) => {
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
      browser.execute(
        function () {
          console.log('log');
          console.info('info');
          console.warn('warn');
          console.error('error');
          console.debug('debug');
          console.trace('trace');
        },
        [],
        () => {
          console.log('execute');
          separator();
        }
      );

      browser.custom_get_logs('browser', separator);

      browser.custom_get_logs('driver', separator);
    }

    browser.assert.strictEqual(1, 1);

    browser.perform(() => {
      separator();
    });
  }
};

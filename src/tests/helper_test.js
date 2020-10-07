const chalk = require('chalk');
const hooks = require('../shared/hooks');
const helper = require('../shared/helper');

module.exports = {
  '@disabled': false,

  '@tags': ['HELPER'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  helper: (browser) => {
    const theLabelId = '#the_label';
    const theInputId = '#the_input';
    const theButtonId = '#the_button';
    const theAnchorId = '#the_anchor';

    const scriptBody = function () {
      const theLabel = document.createElement('label');
      theLabel.textContent = 'the label';
      theLabel.htmlFor = 'the_input';
      theLabel.id = 'the_label';
      theLabel.style.display = 'block';
      document.body.appendChild(theLabel);

      const theInput = document.createElement('input');
      theInput.type = 'text';
      theInput.id = 'the_input';
      theInput.style.display = 'block';
      document.body.appendChild(theInput);

      const theButton = document.createElement('button');
      theButton.onclick = () => {
        const el = document.querySelector('#the_input');
        const attribute = 'disabled';
        if (el) {
          if (el.hasAttribute(attribute)) {
            el.removeAttribute(attribute);
          } else {
            el.setAttribute(attribute, '');
          }
        }
      };
      theButton.textContent = 'the button';
      theButton.id = 'the_button';
      theButton.style.display = 'block';
      document.body.appendChild(theButton);

      const href = 'https://example.org';
      const theAnchor = document.createElement('a');
      theAnchor.target = '_blank';
      theAnchor.rel = 'noopener noreferrer';
      theAnchor.href = href;
      theAnchor.innerHTML = href;
      theAnchor.id = 'the_anchor';
      theAnchor.style.display = 'block';
      document.body.appendChild(theAnchor);
    };

    const scriptArgs = [];

    const executeCallback = function () {
      console.log('execute is complete');
    };

    browser.execute(scriptBody, scriptArgs, executeCallback);

    browser.source((response) => {
      console.log('source:', chalk.cyan(response.value));
    });

    helper.click(browser, theLabelId, 'the label');

    helper.setValue(browser, theInputId, 'the value');

    helper.assertPresent(browser, theInputId);

    helper.assertNotPresent(browser, '#does_not_exist');

    helper.assertValue(browser, theInputId, 'the value');

    helper.assertNotValue(browser, theInputId, 'not');

    helper.assertText(browser, theLabelId, 'the label');

    helper.assertNotText(browser, theLabelId, 'not');

    helper.assertContainsValue(browser, theInputId, 'value');

    helper.assertNotContainsValue(browser, theInputId, 'not');

    helper.assertContainsText(browser, theLabelId, 'label');

    helper.assertNotContainsText(browser, theLabelId, 'not');

    helper.assertAttribute(browser, theInputId, 'type', 'text');

    helper.logValue(browser, theInputId);

    helper.logText(browser, theLabelId);

    helper.logAttribute(browser, theInputId, 'type');

    helper.assertEnabled(browser, theInputId);

    helper.click(browser, theButtonId);

    helper.assertNotEnabled(browser, theInputId);

    helper.click(browser, theAnchorId, 'https://example.org');

    helper.switchToTab(browser, 1);

    browser.custom_take_screenshot('tab_index_1');

    browser.assert.urlContains('example');

    helper.switchToTab(browser, 0);

    browser.custom_take_screenshot('tab_index_0');

    browser.assert.visible(theAnchorId);
  }
};

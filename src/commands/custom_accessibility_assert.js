/**
 * Adapted from https://github.com/ahmadnassri/nightwatch-accessibility/blob/master/assertions/accessibility.js
 */
const chalk = require('chalk');
const {makePrettyJson} = require('../shared/shared');

const scriptBody = function (context, options, done) {
  if (!window.axe) {
    done({error: 'aXe not found. Make sure it has been injected'});
  }

  window.axe
    .run(context, options)
    .then((results) => {
      done({results});
    })
    .catch((error) => {
      done({error: error.toString()});
    });
};

/**
 * Assert accessibility of the page.
 *
 * @param {string} context - An optional CSS selector to set the context of the assert
 */
const command = function (context = 'html') {
  this.perform(() => {
    console.log(`Using context ${chalk.cyan(context)}`);

    const options = {
      verbose: true,
      timeout: 5 * 1000
    };

    // options = {
    //   ...options,
    //   runOnly: {
    //     type: 'tag',
    //     values: ['section508']
    //   }
    // };

    const scriptArgs = [context, options];

    const callback = function (response) {
      const result = response.value.results;

      if (!result) {
        const message = 'aXe failed to execute';
        this.assert.fail(message);
        return;
      }

      const handlePasses = () => {
        if (options.verbose) {
          for (const pass of result.passes) {
            this.assert.ok(true, pass.help);
          }
        }

        if (result.passes.length > 0) {
          this.assert.ok(true, `${result.passes.length} aXe test(s) passed`);
        }
      };

      const handleFails = () => {
        const fails = [];

        for (let i = 0; i < result.violations.length; i++) {
          const fail = {
            message: result.violations[i].help,
            element: result.violations[i].nodes[0].html,
            helpUrl: result.violations[i].helpUrl
          };
          fails.push(fail);

          console.log(chalk.red(`Failure ${i + 1}`));
          console.log(chalk.red(makePrettyJson(fail)));
        }

        if (result.violations.length > 0) {
          /**
           * (node:46241) [DEP0094] DeprecationWarning: assert.fail() with more
           * than one argument is deprecated. Please use assert.strictEqual()
           * instead or only pass a message.
           *
           * ^ The above deprecation warning will show when passing 3 args to
           * assert.fail. We must accept this warning, because Nightwatch
           * will not log the failure message if only 1 arg is passed.
           */

          let message = `${result.violations.length} aXe test(s) failed`;
          message += `\n${makePrettyJson(fails)}`;
          this.assert.fail(message, '', '');
        }
      };

      handlePasses();
      handleFails();
    };

    this.custom_accessibility_init();

    this.waitForElementPresent(context);

    this.timeoutsAsyncScript(options.timeout || 500);

    this.executeAsync(scriptBody, scriptArgs, callback);
  });

  return this;
};

module.exports.command = command;

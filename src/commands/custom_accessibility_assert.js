/**
 * Adapted from https://github.com/ahmadnassri/nightwatch-accessibility/blob/master/assertions/accessibility.js
 */

const script = function (context, options, done) {
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

const command = function (context = 'html') {
  this.perform(() => {
    console.log(`Using context ${context}`);

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

      if (options.verbose) {
        for (const pass of result.passes) {
          this.assert.ok(true, pass.help);
        }
      }

      if (result.passes.length > 0) {
        this.assert.ok(true, `${result.passes.length} aXe test(s) passed`);
      }

      for (const violation of result.violations) {
        let message = `Message: ${violation.help}`;
        message += `\nElement: ${violation.nodes[0].html}`;
        message += `\nHelp URL: ${violation.helpUrl}`;

        // (node:46241) [DEP0094] DeprecationWarning: assert.fail() with more
        // than one argument is deprecated. Please use assert.strictEqual()
        // instead or only pass a message.
        // ^ The above deprecation warning will show when passing 3 args to
        // assert.fail. We must accept this warning, because Nightwatch
        // will not log the failure message if only 1 arg is passed.
        this.assert.fail(message, '', '');
      }
    };

    this.custom_accessibility_init();

    this.waitForElementPresent(context);

    this.timeoutsAsyncScript(options.timeout || 500);

    this.executeAsync(script, scriptArgs, callback);
  });

  return this;
};

module.exports.command = command;

module.exports = {
  '@disabled': false,

  '@tags': ['SKIP', 'https://github.com/nightwatchjs/nightwatch/issues/2503'],

  'github issue for expect element value in geckodriver': (browser) => {
    const scriptBody = function () {
      const el = document.createElement('input');
      el.type = 'text';
      el.id = 'some_input';
      document.body.appendChild(el);
    };

    const scriptArgs = [];

    const callback = function () {
      console.log('execute is complete');
    };

    browser.execute(scriptBody, scriptArgs, callback);

    browser.source((response) => {
      console.log('source:', response.value);
    });

    browser.setValue('#some_input', 'some value');

    browser.pause(1000);

    browser.getValue('#some_input', (response) => {
      console.log('getValue:', response.value);
    });

    browser.assert.value('#some_input', 'some value');

    browser.expect
      .element('#some_input')
      .value.to.equal('some value')
      .before(100);

    browser.end();
  }
};

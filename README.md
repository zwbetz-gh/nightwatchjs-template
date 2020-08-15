# NightwatchJS Template

[Nightwatch](https://nightwatchjs.org/) is a fun, robust end-to-end testing framework. As with any popular framework, inevitably there are opinions of how things should be organized, and what you should or should not do.

This repo is a distillation of personal lessons learned, providing a template to jump start your own end-to-end testing project. It comes with sensible defaults, but you can configure it however you like.

## Highlights

- Sample templates for how to structure your page objects and tests
- Custom `beforeEach` and `afterEach` hooks to do common operations
- Built-in WebDriver environments for ChromeDriver, ChromeDriver headless, GeckoDriver, and GeckoDriver headless
- Custom reporting in JSON, XML, and HTML formats
    - By default, Nightwatch generates a XML file for each test file. This repo parses them all into a single, sleek report
    - HTML reports are fully portable, since their CSS is inlined, and their screenshots are Base64 encoded
- Customize configuration via a `.env` file
    - Set the Launch URL to use
    - Set which WebDriver to use
    - If using WebDriver headless mode, set the browser window width and height
    - Set the output folder
    - Set whether to run in parallel mode
    - If using parallel mode, set how many workers to use
    - Set extra WebDriver args
    - If you don't want to use the one specified in `package.json`, set the ChromeDriver path
    - If you don't want to use the one specified in `package.json`, set the GeckoDriver path

## Table of Contents

<!-- toc -->

- [Regenerate Table of Contents](#regenerate-table-of-contents)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Test Commands](#test-commands)
  * [Run All Tests](#run-all-tests)
  * [Run a Single Test File](#run-a-single-test-file)
  * [Run by Folder](#run-by-folder)
  * [Run by Skipping Folders](#run-by-skipping-folders)
  * [Run by Tag](#run-by-tag)
  * [Run by Skipping Tags](#run-by-skipping-tags)
- [Other Commands](#other-commands)
  * [Show Nightwatch Config](#show-nightwatch-config)
  * [Show Nightwatch CLI Help](#show-nightwatch-cli-help)
  * [Show Nightwatch Info](#show-nightwatch-info)
  * [Show System Info](#show-system-info)
  * [Show Injected Environment Variables](#show-injected-environment-variables)
  * [Clean Output Folder](#clean-output-folder)
  * [Make Output Folder](#make-output-folder)
  * [Write JSON, XML, HTML Reports](#write-json-xml-html-reports)
  * [Write Tags JSON, HTML Reports](#write-tags-json-html-reports)
  * [Run Prettier](#run-prettier)
- [Output](#output)
  * [Reports](#reports)
  * [Screenshots](#screenshots)
- [Rules](#rules)
- [Sample Reports](#sample-reports)
- [Sample App](#sample-app)
- [Run Selenium Grid with Docker Compose](#run-selenium-grid-with-docker-compose)

<!-- tocstop -->

## Regenerate Table of Contents

    npm run toc

## Setup

1. Fork or download a zip of this repo
1. Install [NodeJS](https://nodejs.org/en/download/) version 12 or higher
1. Install dependencies

        npm install

1. Copy file `.env.sample` to file `.env`, then edit the values as you wish
1. Write your page objects
1. Write your tests

## Environment Variables

```shell
# The url to launch with.
# NIGHTWATCH_LAUNCH_URL=http://localhost:5000
NIGHTWATCH_LAUNCH_URL=https://sample-calculator-app.netlify.app

# The environment to use. Valid values:
# LOCAL_FIREFOX
# LOCAL_FIREFOX_HEADLESS
# LOCAL_CHROME
# LOCAL_CHROME_HEADLESS
# DOCKER_CHROME_HEADLESS
NIGHTWATCH_ENVIRONMENT=LOCAL_CHROME_HEADLESS

# If NIGHTWATCH_ENVIRONMENT is a headless value,
# set the headless browser width.
NIGHTWATCH_HEADLESS_WIDTH=1920

# If NIGHTWATCH_ENVIRONMENT is a headless value,
# set the headless browser height.
NIGHTWATCH_HEADLESS_HEIGHT=1080

# The output folder.
NIGHTWATCH_OUTPUT_FOLDER=tests_output

# Run test files in parallel.
# Currently only ChromeDriver supports parallel.
NIGHTWATCH_PARALLEL=false

# If NIGHTWATCH_PARALLEL is true, specify the number of workers to use.
# If set to auto, all of your logical cpus will be used.
NIGHTWATCH_PARALLEL_WORKERS=3

# Comma separated list of extra GeckoDriver args.
NIGHTWATCH_GECKODRIVER_ARGS=

# If you don't want to use the one specified in package.json,
# set this to the absolute path to your GeckoDriver.
# NIGHTWATCH_GECKODRIVER_PATH=

# Comma separated list of extra ChromeDriver args.
NIGHTWATCH_CHROMEDRIVER_ARGS=incognito

# If you don't want to use the one specified in package.json,
# set this to the absolute path to your ChromeDriver.
# Your ChromeDriver version should match your Google Chrome version.
# NIGHTWATCH_CHROMEDRIVER_PATH=
```

## Test Commands

### Run All Tests

    npm test

### Run a Single Test File

    npm run base -- --test src/tests/some_folder/some_test.js

### Run by Folder

    npm run base -- --group src/tests/some_folder

### Run by Skipping Folders

    npm run base -- --skipgroup "src/tests/some_folder,src/tests/some_folder"

### Run by Tag

    npm run base -- --tag "SOME_TAG"

### Run by Skipping Tags

    npm run base -- --skiptags "SOME_TAG,SOME_TAG"

## Other Commands

### Show Nightwatch Config

    npm run config

### Show Nightwatch CLI Help

    npm run help

### Show Nightwatch Info

    npm run info

### Show System Info

    npm run sys

### Show Injected Environment Variables

    npm run env

### Clean Output Folder

    npm run clean

### Make Output Folder

    npm run mkoutput

### Write JSON, XML, HTML Reports

    npm run report

### Write Tags JSON, HTML Reports

    npm run tags

### Run Prettier

    npm run prettier

## Output

### Reports

Reports will be saved to folder

    ${NIGHTWATCH_OUTPUT_FOLDER}/report

### Screenshots

Screenshots will be saved to folder

    ${NIGHTWATCH_OUTPUT_FOLDER}/screenshots

## Rules

- **ONLY write one testcase per file**. This takes advantage of Nightwatch's parallel mode. It also better organizes tagging and reporting
- Split page objects into smaller, logical files if they get too big
- Name source files with snake case
- Always return `this` from page object commands so that they can be chained
- Prefer `id`s for element selectors. This may mean asking developers to add `id`s
- **Avoid** the `pause` command. Instead, use `waitForElementPresent` and `waitForElementVisible`, then pass a higher than default `waitForConditionTimeout`, if needed. For example

        // Wait 15s for an element to be visible
        waitForElementVisible('@someElement', 15 * 1000)

        // Or, wait 15s for a condition to be true
        // For example, wait for element 'h1' text to equal 'Example Domain'
        browser.expect
          .element('h1')
          .text.to.equal('Example Domain')
          .before(15 * 1000);

## Sample Reports

- [nightwatch_report.zip](https://github.com/zwbetz-gh/nightwatchjs-template/raw/master/sample_reports/nightwatch_report.zip)
- [nightwatch_tags_report.zip](https://github.com/zwbetz-gh/nightwatchjs-template/raw/master/sample_reports/nightwatch_tags_report.zip)

## Sample App

A [sample calculator app](https://github.com/zwbetz-gh/sample-calculator-app) is provided to run Nightwatch tests against. To use it, follow these steps

1. In one terminal, start the sample app at <http://localhost:5000>

        cd sample_app
        npm install
        npm run serve

1. In another terminal, run the Nightwatch tests

        npm test

## Run Selenium Grid with Docker Compose

1. Pull images

        docker-compose pull

1. Build services

        docker-compose build

1. Up services

        docker-compose up -d

1. Confirm selenium hub and nodes are up by navigating to http://localhost:4444/grid/console
1. Confirm sample app is up by navigating to http://localhost:5000
1. Run tests

        docker-compose run --rm nightwatch npm test

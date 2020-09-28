const xml = require('xml');
const chalk = require('chalk');
const {warningThereShouldOnlyBeOneTestcasePerFile} = require('./report_html');

const calcTotalErrors = (reportData) => {
  let total = 0;
  for (const data of reportData) {
    const num = Number.parseInt(data.testsuites.testsuite[0].$.errors, 10);
    total += num;
  }
  return total;
};

const calcTotalFailures = (reportData) => {
  let total = 0;
  for (const data of reportData) {
    const num = Number.parseInt(data.testsuites.testsuite[0].$.failures, 10);
    total += num;
  }
  return total;
};

const calcTotalTests = (reportData) => reportData.length;

const makeXmlReport = (reportData) => {
  const testsuiteArr = reportData.map((data) => ({
    testsuite: [
      {
        _attr: {
          name: data.testsuites.testsuite[0].$.name,
          errors: data.testsuites.testsuite[0].$.errors,
          failures: data.testsuites.testsuite[0].$.failures,
          tests: data.testsuites.testsuite[0].$.tests,
          time: data.testsuites.testsuite[0].$.time
        }
      },
      {
        testcase: [
          {
            _attr: {
              name: data.testsuites.testsuite[0].testcase[0].$.name,
              time: data.testsuites.testsuite[0].testcase[0].$.time,
              assertions: data.testsuites.testsuite[0].testcase[0].$.assertions
            }
          },
          {
            error: data.testsuites.testsuite[0].testcase[0].error && {
              _attr: {
                message:
                  data.testsuites.testsuite[0].testcase[0].error[0].$.message
              },
              _cdata: data.testsuites.testsuite[0].testcase[0].error[0]._
            }
          },
          {
            failure: data.testsuites.testsuite[0].testcase[0].failure && {
              _attr: {
                message:
                  data.testsuites.testsuite[0].testcase[0].failure[0].$.message
              },
              _cdata: data.testsuites.testsuite[0].testcase[0].failure[0]._
            }
          }
        ]
      }
    ]
  }));

  // There should only be one testcase per file
  // On the off chance there are more, handle it
  for (const data of reportData) {
    if (data.testsuites.testsuite[0].testcase.length > 1) {
      console.warn(warningThereShouldOnlyBeOneTestcasePerFile);
      console.warn(`See ${chalk.cyan(data.testsuites.testsuite[0].$.name)}`);
    }
  }

  // Remove empty nodes
  for (const testsuiteObj of testsuiteArr) {
    for (const ts of testsuiteObj.testsuite) {
      if (ts.testcase) {
        for (const testcaseObj of ts.testcase) {
          if (testcaseObj.error === undefined) {
            delete testcaseObj.error;
          }
          if (testcaseObj.failure === undefined) {
            delete testcaseObj.failure;
          }
        }
      }
    }
  }

  const xmlObj = {
    testsuites: [
      {
        _attr: {
          errors: calcTotalErrors(reportData),
          failures: calcTotalFailures(reportData),
          tests: calcTotalTests(reportData)
        }
      },
      ...testsuiteArr
    ]
  };

  const options = {declaration: true, indent: '  '};
  const xmlString = xml(xmlObj, options);
  return xmlString;
};

module.exports = {
  makeXmlReport
};

const path = require('path');
const env = require('./env');
const sys = require('./sys');
const {readDataFromFile} = require('./shared');

const warningThereShouldOnlyBeOneTestcasePerFile =
  'WARNING: There should only be one testcase per file';

const metaTableHeaders = ['Key', 'Value'];

const metaTableHead = metaTableHeaders
  .map((header) => `<th scope="col">${header}</th>`)
  .join('\n');

const escapeHtml = (unsafe) => {
  const safe = unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  return safe;
};

const isMoreThanOneTestcase = (data) => {
  if (data.testsuites.testsuite[0].testcase.length > 1) {
    return true;
  }
  return false;
};

const calcTestStatus = (data) => {
  const status =
    data.testsuites.testsuite[0].$.errors === '0' &&
    data.testsuites.testsuite[0].$.failures === '0'
      ? 'PASS'
      : 'FAIL';
  return status;
};

const calcTestTime = (data) => {
  const time = Number.parseFloat(data.testsuites.testsuite[0].$.time).toFixed(
    1
  );
  return time;
};

const calcTestAssertions = (data) => {
  let total = 0;
  for (const testcase of data.testsuites.testsuite[0].testcase) {
    const assertions = Number.parseInt(testcase.$.assertions, 10);
    if (!Number.isNaN) {
      total += assertions;
    }
  }
  return total;
};

const getTestMessages = (data) => {
  const messages = [];
  if (isMoreThanOneTestcase(data)) {
    messages.push(warningThereShouldOnlyBeOneTestcasePerFile);
    return messages.join('');
  }

  const failureNode = data.testsuites.testsuite[0].testcase[0].failure;
  if (failureNode) {
    messages.push(escapeHtml(failureNode[0].$.message));
    messages.push(escapeHtml(failureNode[0]._));
  }

  const errorNode = data.testsuites.testsuite[0].testcase[0].error;
  if (errorNode) {
    messages.push(escapeHtml(errorNode[0].$.message));
    messages.push(escapeHtml(errorNode[0]._));
  }

  return messages
    .map(
      (message) =>
        `<pre style="white-space: pre-wrap;"><code>${message}</code></pre>`
    )
    .join('\n');
};

const getTestScreenshot = (data) => {
  let screenshot = '';

  const systemOutNode = data.testsuites.testsuite[0].testcase[0]['system-out'];
  if (!systemOutNode) {
    return screenshot;
  }

  try {
    const filePath = systemOutNode[0]
      .replace('[[ATTACHMENT|', '')
      .replace(']]', '');
    const base64 = readDataFromFile(filePath, 'base64');
    const maxWidth = '100%';
    const height = 'auto';
    screenshot = `
    <img 
      style="max-width: ${maxWidth}; height: ${height};" 
      src="data:image/png;base64,${base64}" 
      alt="screenshot" />
    `;
  } catch (error) {
    console.error('Error when getting screenshot', error);
  }

  return screenshot;
};

const calcTotalTests = (reportData) => reportData.length;

const calcTotalPassed = (reportData) => {
  let total = 0;
  for (const data of reportData) {
    if (calcTestStatus(data) === 'PASS') {
      total += 1;
    }
  }
  return total;
};

const calcTotalFailed = (reportData) => {
  let total = 0;
  for (const data of reportData) {
    if (calcTestStatus(data) === 'FAIL') {
      total += 1;
    }
  }
  return total;
};

const calcTotalAssertions = (reportData) => {
  let total = 0;
  for (const data of reportData) {
    total += calcTestAssertions(data);
  }
  return total;
};

const makeHtmlTemplate = (title, content) => {
  const cssFilePath = path.resolve(
    process.cwd(),
    'src',
    'resources',
    'css',
    'bootstrap-4.5.0.min.css'
  );
  const css = readDataFromFile(cssFilePath);

  const template = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <style>${css}</style>
      <title>${title}</title>
    </head>
    <body>
      <div class="container-fluid">
        <h1>${title}</h1>
        <p>Generated on ${new Date()}</p>
        ${content}
      </div>
    </body>
  </html>
  `;
  return template;
};

const makeTable = (tableHead, tableBody) => {
  const table = `
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          ${tableHead}
        </tr>
      </thead>
      <tbody>
        ${tableBody}
      </tbody>
    </table>
  </div>
  `;
  return table;
};

const makeSystemTable = () => {
  const systemTableBody = () => {
    const rows = [];
    const sysObj = sys.getSys();
    for (const key in sysObj) {
      const row = `
      <tr>
        <th scope="row">${key}</th>
        <td>${sysObj[key]}</td>
      </tr>
      `;
      rows.push(row);
    }
    return rows.join('\n');
  };

  const systemTable = makeTable(metaTableHead, systemTableBody());
  return systemTable;
};

const makeEnvVarsTable = () => {
  const envVarsTableBody = () => {
    const rows = [];
    const envObj = env.getEnv();
    for (const key in envObj) {
      const row = `
      <tr>
        <th scope="row">${key}</th>
        <td>${envObj[key]}</td>
      </tr>
      `;
      rows.push(row);
    }
    return rows.join('\n');
  };

  const envVarsTable = makeTable(metaTableHead, envVarsTableBody());
  return envVarsTable;
};

const makeStatsTable = (reportData) => {
  const statsObj = {
    'Total Tests': calcTotalTests(reportData),
    'Total Passed': calcTotalPassed(reportData),
    'Total Failed': calcTotalFailed(reportData),
    'Total Assertions': calcTotalAssertions(reportData)
  };

  const statsTableBody = () => {
    const rows = [];
    for (const key in statsObj) {
      const row = `
      <tr>
        <th scope="row">${key}</th>
        <td>${statsObj[key]}</td>
      </tr>
      `;
      rows.push(row);
    }
    return rows.join('\n');
  };

  const statsTable = makeTable(metaTableHead, statsTableBody());
  return statsTable;
};

const makeTestsTable = (reportData) => {
  const testsTableHeaders = [
    'Status',
    'Test',
    'Time (s)',
    'Assertions',
    'Errors',
    'Failures',
    'Messages/Screenshot'
  ];

  const testsTableHead = testsTableHeaders
    .map((header) => `<th scope="col">${header}</th>`)
    .join('\n');

  const testsTableBody = reportData
    .map(
      (data) => `
  <tr class="${
    calcTestStatus(data) === 'PASS' ? 'table-success' : 'table-danger'
  }">
    <th scope="row">${calcTestStatus(data)}</th>
    <td>${data.testsuites.testsuite[0].$.name}</td>
    <td>${calcTestTime(data)}</td>
    <td>${calcTestAssertions(data)}</td>
    <td>${data.testsuites.testsuite[0].$.errors}</td>
    <td>${data.testsuites.testsuite[0].$.failures}</td>
    <td style="${
      getTestMessages(data) === warningThereShouldOnlyBeOneTestcasePerFile
        ? 'background-color: #ffeeba;'
        : ''
    }">
      ${getTestMessages(data)}
      <br>
      ${getTestScreenshot(data)}
    </td>
  </tr>
  `
    )
    .join('\n');

  const testsTable = makeTable(testsTableHead, testsTableBody);
  return testsTable;
};

const makeHtmlReport = (reportData) => {
  const title = 'Nightwatch Report';

  const systemTable = makeSystemTable();
  const envVarsTable = makeEnvVarsTable();
  const statsTable = makeStatsTable(reportData);
  const testsTable = makeTestsTable(reportData);

  const content = `
  <h2>System</h2>
  ${systemTable}
  <h2>Environment Variables</h2>
  ${envVarsTable}
  <h2>Stats</h2>
  ${statsTable}
  <h2>Tests</h2>
  ${testsTable}
  `;

  const htmlString = makeHtmlTemplate(title, content);
  return htmlString;
};

module.exports = {
  warningThereShouldOnlyBeOneTestcasePerFile,
  metaTableHead,
  metaTableHeaders,
  makeHtmlTemplate,
  makeTable,
  makeHtmlReport
};

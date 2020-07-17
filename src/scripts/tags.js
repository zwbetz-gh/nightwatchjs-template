const process = require('process');
const path = require('path');
const {
  walk,
  writeDataToFile,
  makePrettyJson,
  getReportDir
} = require('../shared/shared');
const {
  metaTableHead,
  makeHtmlTemplate,
  makeTable
} = require('../shared/report_html');

const getTests = (filePaths) => {
  const tests = [];
  for (const fp of filePaths) {
    const req = `..${fp.replace(`${process.cwd()}/src`, '')}`;
    const module = require(req);
    const relativeFilePath = `src${req.replace('..', '')}`;
    const test = {
      relativeFilePath,
      tags: module['@tags']
    };
    tests.push(test);
  }
  return tests;
};

const getTags = (tests) => {
  let tags = [];
  for (const t of tests) {
    tags = [...tags, ...t.tags];
  }
  return tags;
};

const makeReportData = () => {
  const testsDir = path.resolve(process.cwd(), 'src', 'tests');
  const filePaths = walk(testsDir);

  const tests = getTests(filePaths);
  const tags = getTags(tests);

  const uniqueSortedTags = tags
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();

  const reportData = {
    tests,
    uniqueTags: uniqueSortedTags,
    meta: {
      testFilesCount: tests.length,
      uniqueTagsCount: uniqueSortedTags.length
    }
  };
  return reportData;
};

const makeStatsTable = (reportData) => {
  const statsObj = {
    'Total Test Files': reportData.meta.testFilesCount,
    'Total Unique Tags': reportData.meta.uniqueTagsCount
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

const makeTestToTagsTable = (reportData) => {
  const testToTagsTableHeaders = ['Test', 'Tags'];

  const testToTagsTableHead = testToTagsTableHeaders
    .map((header) => `<th scope="col">${header}</th>`)
    .join('\n');

  const testToTagsTableBody = reportData.tests
    .map(
      (test) => `
  <tr>
    <th scope="row">${test.relativeFilePath}</th>
    <td style="white-space: pre;">${test.tags.join('\n')}</td>
  </tr>
  `
    )
    .join('\n');

  const testToTagsTable = makeTable(testToTagsTableHead, testToTagsTableBody);
  return testToTagsTable;
};

const makeUniqueTagsTable = (reportData) => {
  const uniqueTagsTableHeaders = ['Unique Tags'];

  const uniqueTagsTableHead = uniqueTagsTableHeaders
    .map((header) => `<th scope="col">${header}</th>`)
    .join('\n');

  const uniqueTagsTableBody = reportData.uniqueTags
    .map(
      (tag) => `
  <tr>
    <th scope="row">${tag}</th>
  </tr>
  `
    )
    .join('\n');

  const uniqueTagsTable = makeTable(uniqueTagsTableHead, uniqueTagsTableBody);
  return uniqueTagsTable;
};

const makeHtmlReport = (reportData) => {
  const title = 'Nightwatch Tags Report';

  const statsTable = makeStatsTable(reportData);
  const testToTagsTable = makeTestToTagsTable(reportData);
  const uniqueTagsTable = makeUniqueTagsTable(reportData);

  const content = `
  <h2>Stats</h2>
  ${statsTable}
  <h2>Test to Tags</h2>
  ${testToTagsTable}
  <h2>Unique Tags</h2>
  ${uniqueTagsTable}
  `;

  const htmlString = makeHtmlTemplate(title, content);
  return htmlString;
};

const writeJsonReport = (reportData, filePath) => {
  const jsonString = makePrettyJson(reportData);
  writeDataToFile(jsonString, filePath);
};

const writeHtmlReport = (reportData, filePath) => {
  const htmlString = makeHtmlReport(reportData);
  writeDataToFile(htmlString, filePath);
};

const main = () => {
  const reportData = makeReportData();

  const reportName = 'nightwatch_tags_report';
  const jsonReportFilePath = path.resolve(getReportDir(), `${reportName}.json`);
  const htmlReportFilePath = path.resolve(getReportDir(), `${reportName}.html`);

  writeJsonReport(reportData, jsonReportFilePath);
  writeHtmlReport(reportData, htmlReportFilePath);
};

main();

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const env = require('./env');
const {walk, writeDataToFile, writeDataToJsonFile} = require('./shared');
const {makeHtmlReport} = require('./report_html');
const {makeXmlReport} = require('./report_xml');

const reportDir = path.resolve(
  process.cwd(),
  env.getEnv().NIGHTWATCH_OUTPUT_FOLDER,
  'report'
);

const convertXmlStringToJsObject = async (xmlString) => {
  try {
    const obj = await xml2js.parseStringPromise(xmlString);
    return obj;
  } catch (error) {
    console.error('Error when converting XML string to JS object', error);
  }
};

const isXmlFile = (filePath) => {
  const ext = filePath.slice(filePath.length - 4);
  if (ext === '.xml') {
    return true;
  }
  return false;
};

const parseXmlReports = async (exemptFilePath) => {
  const reports = [];
  const files = walk(reportDir) || [];
  for (const file of files) {
    if (isXmlFile(file) && !file.includes(exemptFilePath)) {
      console.log(`Parsing XML file ${file}`);
      const xmlString = fs.readFileSync(file, 'utf8');
      const obj = await convertXmlStringToJsObject(xmlString);
      reports.push(obj);
    }
  }
  return reports;
};

const writeJsonReport = (reportData, filePath) => {
  writeDataToJsonFile(reportData, filePath);
};

const writeXmlReport = (reportData, filePath) => {
  const xmlString = makeXmlReport(reportData);
  writeDataToFile(xmlString, filePath);
};

const writeHtmlReport = (reportData, filePath) => {
  const htmlString = makeHtmlReport(reportData);
  writeDataToFile(htmlString, filePath);
};

const main = async () => {
  const reportName = 'nightwatch_report';
  const jsonReportFilePath = path.resolve(reportDir, `${reportName}.json`);
  const xmlReportFilePath = path.resolve(reportDir, `${reportName}.xml`);
  const htmlReportFilePath = path.resolve(reportDir, `${reportName}.html`);

  const reportData = await parseXmlReports(xmlReportFilePath);
  writeJsonReport(reportData, jsonReportFilePath);
  writeXmlReport(reportData, xmlReportFilePath);
  writeHtmlReport(reportData, htmlReportFilePath);
};

main();

module.exports = {
  reportDir
};

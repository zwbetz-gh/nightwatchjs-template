const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const {
  walk,
  writeDataToFile,
  makePrettyJson,
  getReportDir
} = require('./shared');
const {makeHtmlReport} = require('./report_html');
const {makeXmlReport} = require('./report_xml');

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
  const files = walk(getReportDir()) || [];
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
  const jsonString = makePrettyJson(reportData);
  writeDataToFile(jsonString, filePath);
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
  const jsonReportFilePath = path.resolve(getReportDir(), `${reportName}.json`);
  const xmlReportFilePath = path.resolve(getReportDir(), `${reportName}.xml`);
  const htmlReportFilePath = path.resolve(getReportDir(), `${reportName}.html`);

  const reportData = await parseXmlReports(xmlReportFilePath);
  writeJsonReport(reportData, jsonReportFilePath);
  writeXmlReport(reportData, xmlReportFilePath);
  writeHtmlReport(reportData, htmlReportFilePath);
};

main();

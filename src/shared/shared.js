const fs = require('fs');
const path = require('path');
const os = require('os');
const env = require('./env');

const getReportDir = () =>
  path.resolve(process.cwd(), env.getEnv().NIGHTWATCH_OUTPUT_FOLDER, 'report');

const walk = (dir) => {
  try {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        // Recurse into subdir
        results = [...results, ...walk(file)];
      } else {
        // Is a file
        results.push(file);
      }
    });
    return results;
  } catch (error) {
    console.error(`Error when walking dir ${dir}`, error);
  }
};

const makePrettyJson = (data) => {
  const string = JSON.stringify(data, null, 2);
  return string;
};

const writeDataToFile = (data, filePath) => {
  try {
    console.log(`Writing file ${filePath}`);
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.error(`Error when writing file ${filePath}`, error);
  }
};

const readDataFromFile = (filePath, encoding = 'utf8') => {
  try {
    console.log(`Using encoding ${encoding} to read file ${filePath}`);
    const string = fs.readFileSync(filePath, encoding);
    return string;
  } catch (error) {
    console.error(
      `Error when using encoding ${encoding} to read file ${filePath}`,
      error
    );
  }
};

const isWindows = () => os.platform() === 'win32';

module.exports = {
  getReportDir,
  walk,
  makePrettyJson,
  writeDataToFile,
  readDataFromFile,
  isWindows
};

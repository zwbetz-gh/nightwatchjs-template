const fs = require('fs');
const path = require('path');
const os = require('os');
const env = require('./env');

const getReportDir = () => {
  return path.resolve(
    process.cwd(),
    env.getEnv().NIGHTWATCH_OUTPUT_FOLDER,
    'report'
  );
};

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
    console.log(`Writing file to ${filePath}`);
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.error(`Error when writing data to file ${filePath}`, error);
  }
};

const readDataFromFile = (filePath) => {
  try {
    console.log(`Reading file from ${filePath}`);
    const string = fs.readFileSync(filePath, 'utf8');
    return string;
  } catch (error) {
    console.error(`Error when reading data from file ${filePath}`, error);
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

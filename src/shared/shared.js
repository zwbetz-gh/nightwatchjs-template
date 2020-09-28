const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');
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

/**
 * Make a pseudo random string.
 *
 * @param {number} length - The desired length
 * @param {string} characterType - The character type. Must be one of: 'alpha', 'numeric', 'alphanumeric'
 */
const makePseudoRandom = (length, characterType) => {
  const validCharacterTypes = ['alpha', 'numeric', 'alphanumeric'];

  if (typeof length !== 'number') {
    assert.fail('length must be a number');
  }

  if (typeof characterType !== 'string') {
    assert.fail('characterType must be a string');
  }

  if (!validCharacterTypes.includes(characterType)) {
    assert.fail(
      `characterType must be one of: ${validCharacterTypes.join(', ')}`
    );
  }

  let characters = '';
  let result = '';

  const alphaCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const numericCharacters = '0123456789';
  const alphanumericCharacters = alphaCharacters + numericCharacters;

  if (characterType === 'alpha') {
    characters = alphaCharacters;
  } else if (characterType === 'numeric') {
    characters = numericCharacters;
  } else {
    characters = alphanumericCharacters;
  }

  for (let i = 0; i < length; i++) {
    const position = Math.floor(Math.random() * characters.length);
    result += characters.charAt(position);
  }

  return result;
};

module.exports = {
  getReportDir,
  walk,
  makePrettyJson,
  writeDataToFile,
  readDataFromFile,
  isWindows,
  makePseudoRandom
};

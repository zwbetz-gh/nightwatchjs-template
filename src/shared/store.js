const shortid = require('shortid');
const chalk = require('chalk');

const data = {};

const get = (key) => {
  const value = data[key];
  console.log(`Getting key ${chalk.cyan(key)} with value ${chalk.cyan(value)}`);
  return value;
};

const set = (key, value) => {
  data[key] = value;
  console.log(`Setting key ${chalk.cyan(key)} with value ${chalk.cyan(value)}`);
};

const getData = () => data;

const makeKey = (key) => {
  const uuid = shortid.generate();
  const newKey = `${key}_${uuid}`;
  return newKey;
};

module.exports = {
  get,
  set,
  getData,
  makeKey
};

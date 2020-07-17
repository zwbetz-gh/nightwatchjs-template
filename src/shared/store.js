const shortid = require('shortid');

const data = {};

const get = (key) => {
  const value = data[key];
  console.log(`Getting key ${key} with value ${value}`);
  return value;
};

const set = (key, value) => {
  data[key] = value;
  console.log(`Setting key ${key} with value ${value}`);
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

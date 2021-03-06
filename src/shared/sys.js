const os = require('os');
const chalk = require('chalk');

let sys = {};

const getUsername = () => {
  const notAvailable = 'Not Available';
  let username = '';
  try {
    username = os.userInfo().username;
  } catch (error) {
    console.error(
      `Error when getting username. Defaulting to ${chalk.cyan(notAvailable)}`
    );
    username = notAvailable;
  }
  return username;
};

const setSys = () => {
  sys = {
    platform: os.platform(),
    arch: os.arch(),
    username: getUsername()
  };
};

const getSys = () => {
  setSys();
  return sys;
};

module.exports = {
  getSys
};

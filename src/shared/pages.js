const template_page = require('../page_objects/template_page');

const getPages = (browser) => {
  return {
    template_page: template_page.init(browser)
  };
};

module.exports = {
  getPages
};

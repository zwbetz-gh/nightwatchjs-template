const template_page = require('../page_objects/template_page');

const getPages = (browser) => ({
  template_page: template_page.init(browser)
});

module.exports = {
  getPages
};

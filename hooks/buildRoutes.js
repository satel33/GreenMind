const { integrations } = require('../middleware.config');
const graphqlBaseUrl = integrations.odoo.configuration.graphqlBaseUrl;

const consola = require('consola');
const chalk = require('chalk');
const axios = require('axios');
const fsExtra = require('fs-extra');
const queries = require('../helpers/buildQueries');

const headers = { headers: {
  'Content-Type': 'application/json',
  'resquest-host': integrations.odoo.configuration.baseDomain,
  'X-Frame-Options': '*'
}};

const cleanPath = (path) => {
  return path.replace('ø', 'o');
};

const fetchCategories = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${queries.categories}` }, headers);
};

export default async () => {
  consola.info(chalk.bold('ODOO'), ' - Started fetch (categories) to build custom routes...');

  const { data: categoriesData } = await fetchCategories();

  await fsExtra.outputJson('customRoutes/categories.json', categoriesData.data.categories.categories.map(item => cleanPath(item.slug)));

  consola.success(chalk.bold('ODOO'), ' - Finish build custom routes!');
};

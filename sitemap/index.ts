const { integrations } = require('../middleware.config');
const graphqlBaseUrl = integrations.odoo.configuration.graphqlBaseUrl;

const consola = require('consola');
const chalk = require('chalk');
const axios = require('axios');
const queries = require('../helpers/buildQueries');

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'resquest-host': integrations.odoo.configuration.baseDomain,
    'X-Frame-Options': '*',
    'Access-Control-Allow-Origin': '*',
    'Cross-Origin-Embedder-Policy': 'credentialless',
    'Cross-Origin-Opener-Policy': 'same-origin'
  }
};

const fetchProducts = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${queries.products}` }, headers);
};

const fetchCategories = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${queries.categories}` }, headers);
};

const getAppRoutes = async (): Promise<Array<string>> => {
  consola.info(chalk.bold('ODOO'), ' - Started fetch sitemap dinamic routes...');

  const { data } = await fetchProducts();
  const { data: categoriesData } = await fetchCategories();

  consola.success(chalk.bold('ODOO'), ' - Finished fetch sitemap dinamic routes from odoo!');

  return [
    ...data.data.products.products.map((product) => product.slug),
    ...categoriesData.data.categories.categories.map((categories) => categories.slug)
  ];
};

export default getAppRoutes;

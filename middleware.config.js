/* eslint-disable quote-props */
import {
  baseDomain,
  rebuildRefreshToken,
  odooBaseUrl
} from './ENV';

const isDev = process.env.NODE_ENV !== 'production';
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;
const customQueries = require('./green-api/customQueries');
const apis = require('./green-api/api');
const rebuildExtension = require('./helpers/rebuildExtension');
const devExtension = require('./helpers/devExtension');

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
        rebuildRefreshToken,
        baseDomain,
        redisClient: !isDev
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'green-extension',
          extendApiMethods: apis
        },
        {
          name: 'rebuild-extension',
          extendApp: rebuildExtension.default
        },
        isDev ? devExtension.default : {
          name: 'default-extension'
        }
      ],
      customQueries

    }
  }
};


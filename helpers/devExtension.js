const Redis = require('redis-tag-cache');

/**
 * This extensions only works in dev env
 * Add request host header to fetch correct lang itens from odoo
 */
export default {
  name: 'development-extension',
  hooks: (req, res) => {
    return {
      beforeCreate: ({ configuration }) => ({
        ...configuration,
        auth: req.headers.cookie,
        'resquest-host': 'vue-dev.greenmind.space'
      }),
      beforeCall: ({ configuration, callName, args }) => args,
      afterCall: ({ configuration, callName, response }) => response
    };
  }
};

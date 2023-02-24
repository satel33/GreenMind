const fsExtra = require('fs-extra');
const child = require('child_process');
const consola = require('consola');
const chalk = require('chalk');

export default ({ app, configuration }) => {
  app.get('/rebuild/:token', (req, res) => {
    const token = req.params.token;

    if (token === configuration.rebuildRefreshToken) {

      const buildProcess = child.exec('export NODE_ENV=production && yarn build --quiet');

      buildProcess.stdout.pipe(process.stdout);

      buildProcess.on('exit', () => {
        consola.info(chalk.bold('ODOO'), ' - Finish rebuild app!');

        child.exec('pm2 reload all');
      });

      consola.info(chalk.bold('ODOO'), ' - App reloaded!');
      return res.send('Started rebuild...');
    }

    return res.send('Wrong rebuild token');

  });
};

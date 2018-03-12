#!/usr/env/node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const crypto = require('crypto');

const getSendgridApiKey = {
  type: 'input',
  name: 'SENDGRID_API_KEY',
  message: 'Your SendGrid API key:',
};

const getSendgridListId = {
  type: 'input',
  name: 'SENDGRID_LIST_ID',
  message: 'The ID of your SendGrid mailing list:',
};

const getSqlUser = {
  type: 'input',
  name: 'SQL_USER',
  message: 'The MySQL user you created for this app:'
};

const getSqlPassword = {
  type: 'password',
  name: 'SQL_PASSWORD',
  message: 'The password for the MySQL user:'
};

const getSqlDatabase = {
  type: 'input',
  name: 'SQL_DATABASE',
  message: 'The MySQL database you created for this app:'
};

const getSqlInstanceConnectionName = {
  type: 'input',
  name: 'SQL_INSTANCE_CONNECTION_NAME',
  message: 'The instance connection name for the Cloud SQL instance:'
};

const getAdminUser = {
  type: 'input',
  name: 'ADMIN_USERNAME',
  message: 'Choose a username for the Schemebeam admin:'
}

const getAdminPassword = {
  type: 'password',
  name: 'ADMIN_PASSWORD',
  message: 'Set a password for the Schemebeam admin:'
}

console.log(`This tool will help you provision your app for GCloud.
Please provide the requested information.\n`);

inquirer.prompt([
  getSendgridApiKey,
  getSendgridListId,
  getSqlUser,
  getSqlPassword,
  getSqlDatabase,
  getSqlInstanceConnectionName,
  getAdminUser,
  getAdminPassword
]).then((answers) => {
  const appSecret = crypto.randomBytes(50).toString('hex');
  let appYaml = '';

  appYaml += 'runtime: nodejs\n';
  appYaml += 'env: flex\n';
  appYaml += 'env_variables:\n';
  appYaml += Object.keys(answers).map(key => `  ${key}: ${answers[key]}\n`).join('');
  appYaml += `  APP_SECRET: ${appSecret}\n`;
  appYaml += 'beta_settings:\n';
  appYaml += `  cloud_sql_instances: ${answers.SQL_INSTANCE_CONNECTION_NAME}\n`;

  fs.writeFileSync(path.join(__dirname, '../app.yaml'), appYaml, 'utf-8');

  console.log('Done!');
});

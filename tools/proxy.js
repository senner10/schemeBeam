#!/usr/env/node
const path = require('path');
const childProcess = require('child_process');
const exec = childProcess.execSync;
const execScript = childProcess.execFileSync;

execScript(path.join(__dirname, 'proxy_setup.sh'));
exec('./cloud_sql_proxy -dir=/cloudsql &');

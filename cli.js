#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const logSymbols = require('log-symbols');

const res = require('./')();

if (res === null) {
  console.log(logSymbols.info, chalk.blue('No lockfile detected'));
} else {
  console.log(logSymbols.success, chalk.green('Removed: ') + res);
}

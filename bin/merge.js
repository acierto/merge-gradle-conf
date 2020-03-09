#! /usr/bin/env node
const shell = require("shelljs");
console.log('merging...'); // eslint-disable-line
shell.exec("node ./dist/index.js");

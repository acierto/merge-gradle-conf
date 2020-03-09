#! /usr/bin/env node
const path = require('path');
const projectDir = path.resolve(__dirname, '..');

const shell = require("shelljs");
shell.exec(`node ${projectDir}/dist/index.js`);

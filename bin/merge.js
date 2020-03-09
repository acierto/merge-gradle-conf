#! /usr/bin/env node
const R = require('ramda');
const args = require('yargs');
const path = require('path');
const projectDir = path.resolve(__dirname, '..');

const shell = require('shelljs');

shell.exec(R.reduce((acc, argName) => {
    const argValue = args.argv[argName];
    return argValue ? `${acc} --${argName}=${argValue}` : acc;
}, `node ${projectDir}/dist/index.js`, ['comparedToBranch', 'currentBranch', 'workDir']));

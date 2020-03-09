import {argv} from 'yargs';

const projectDir = process.cwd();

export const confPath = 'gradle/dependencies.conf';
export const getWorkingDir = () => argv.workDir || projectDir;
export const getFullPathToConf = () => `${getWorkingDir()}/${confPath}`;

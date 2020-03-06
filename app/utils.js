import path from 'path';
import {argv} from 'yargs';

const projectDir = path.resolve(__dirname, '..', '..');

export const confPath = 'gradle/dependencies.conf';
export const getWorkingDir = () => argv.workDir || projectDir;
export const getFullPathToConf = () => `${getWorkingDir()}/${confPath}`;

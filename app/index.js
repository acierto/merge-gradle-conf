import fs from 'fs';
import {argv} from 'yargs';
import log from 'loglevel';
import {getConfigPair} from './git';
import {checkInput} from './check-input';
import {mergeFiles} from './merge';
import {getFullPathToConf} from './utils';

(async () => {
    checkInput();
    const {comparedToBranch, currentBranch} = argv;
    const config = await getConfigPair(currentBranch, comparedToBranch);
    const newConfig = mergeFiles(config.currentBranch, config.comparedToBranch);
    fs.writeFileSync(`${getFullPathToConf()}`, newConfig);
})().catch((err) => log.error(err.message ? err.message : err));

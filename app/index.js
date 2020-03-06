import fs from 'fs';
import {getConfigPair} from './git';
import {mergeFiles} from './merge';
import {getFullPathToConf} from './utils';
import {format} from './format';

(async () => {
    const config = await getConfigPair('master', '9.5.x-maintenance');
    const newConfig = mergeFiles(config.currentBranch, config.comparedToBranch);
    fs.writeFileSync(`${getFullPathToConf()}.merged`, format(newConfig));
    console.log(format(newConfig)); // eslint-disable-line
})();

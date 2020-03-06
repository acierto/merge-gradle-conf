import {getConfigPair} from './git';

(async () => {
    const config = await getConfigPair('master', '9.5.x-maintenance');
    console.log(JSON.stringify(config)); // eslint-disable-line
})();

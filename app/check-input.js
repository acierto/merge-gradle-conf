import R from 'ramda';
import {argv} from 'yargs';

export const checkInput = () => {
    const {comparedToBranch, currentBranch} = argv;
    if (R.isNil(currentBranch)) {
        throw Error('Specify --currentBranch with a branch name which is going to be a primary branch');
    }
    if (R.isNil(comparedToBranch)) {
        throw Error('Specify --comparedToBranch with a branch name against which you would like to compare');
    }
};


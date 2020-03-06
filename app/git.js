import {spawn} from 'child_process';
import {confPath, getWorkingDir} from './utils';

export const getFileContent = (branchName) => new Promise(
    (resolve, reject) => {
        const workDir = [`--git-dir=${`${getWorkingDir()}/.git`}`];
        const commandArguments = [...workDir, 'show', `origin/${branchName}:${confPath}`];
        const showCommand = spawn('git', commandArguments);
        showCommand.stdout.on('data', (res) => resolve(res.toString()));
        showCommand.stderr.on('data', (err) => reject(err.toString()));
    });

export const getConfigPair = async (currentBranch, comparedToBranch) => ({
    comparedToBranch: await getFileContent(comparedToBranch),
    currentBranch: await getFileContent(currentBranch)
});

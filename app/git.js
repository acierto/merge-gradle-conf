import {spawn} from 'child_process';
import {argv} from 'yargs';
import {projectDir} from './utils';

const confPath = 'gradle/dependencies.conf';

export const getFileContent = (branchName) => new Promise(
    (resolve, reject) => {
        const workDir = [`--git-dir=${`${argv.workDir}/.git` || projectDir}`];
        const commandArguments = [...workDir, 'show', `origin/${branchName}:${confPath}`];
        const showCommand = spawn('git', commandArguments);
        console.log('command', 'git ' + commandArguments.join(' ')); // eslint-disable-line
        showCommand.stdout.on('data', (res) => resolve(res.toString()));
        showCommand.stderr.on('data', (err) => reject(err.toString()));
    });

export const getConfigPair = async (currentBranch, comparedToBranch) => ({
    comparedToBranch: await getFileContent(comparedToBranch),
    currentBranch: await getFileContent(currentBranch)
});

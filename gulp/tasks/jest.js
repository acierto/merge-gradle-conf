import R from 'ramda';
import fs from 'fs';
import paths from '../utils/paths';
import gulp from 'gulp';
import jest from 'gulp-jest';
import env from 'gulp-env';
import packageJson from '../../package.json';

const capitalize = R.pipe(
    R.defaultTo(''),
    R.converge(R.concat, [R.pipe(R.head, R.toUpper), R.pipe(R.drop(1), R.toLower)])
);

gulp.task('run-jest', () => {
    env.set({BABEL_ENV: 'test'});
    return gulp.src('.').pipe(jest(packageJson.jest));
});

gulp.task('jest', gulp.series('run-jest', () => new Promise((resolve, reject) =>
    fs.readFile(`${paths.projectDir}/build/reports/coverage/coverage-summary.json`, (err, data) => {
        if (err) {
            reject(err);
        }
        const total = JSON.parse(data).total;
        const global = packageJson.jest.coverageThreshold.global;

        const checkThreshold = (propName) => {
            if (total[propName].pct < global[propName]) {
                reject(`${capitalize(propName)} coverage is ${total[propName].pct} but threshold is ${global[propName]}`);
            }
        };

        R.forEach((propName) => checkThreshold(propName), ['lines', 'statements', 'functions', 'branches']);
        resolve();
    })
)));

import R from 'ramda';
import semver from 'semver';
import {parseFile} from './parse';

export const mergeFiles = (file1, file2) => {
    const json1 = parseFile(file1);
    const json2 = parseFile(file2);

    const uniqueKeys =
        R.pipe(
            R.uniq,
            R.sort(R.ascend(R.toLower))
        )(R.concat(R.keys(json1), R.keys(json2)));

    return R.reduce((acc, key) => {
        if (!R.has(key, json1)) {
            return {...acc, [key]: json2[key]};
        }
        if (!R.has(key, json2)) {
            return {...acc, [key]: json1[key]};
        }

        return semver.gt(json1[key], json2[key]) ?
            {...acc, [key]: json1[key]} : {...acc, [key]: json2[key]};
    }, {}, uniqueKeys);
};

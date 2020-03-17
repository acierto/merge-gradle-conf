import R from 'ramda';
import semver from 'semver';
import parseHocon from 'hocon-parser';

const path = ['dependencyManagement', 'versions'];

const toKeys = (json) => R.pipe(
    R.path(path),
    R.keys
)(json);

export const mergeFiles = (file1, file2) => {
    const json1 = parseHocon(file1);
    const json2 = parseHocon(file2);

    const uniqueKeys =
        R.pipe(
            R.uniq,
            R.sort(R.ascend(R.toLower))
        )(R.concat(toKeys(json1), toKeys(json2)));

    const mergedVersions = R.reduce((acc, key) => {
        const keyPath = [...path, key];

        const json1Key = R.path(keyPath, json1);
        const json2Key = R.path(keyPath, json2);

        if (!R.hasPath(keyPath, json1)) {
            return {...acc, [key]: json2Key};
        }
        if (!R.hasPath(keyPath, json2)) {
            return {...acc, [key]: json1Key};
        }

        return semver.gt(json1Key, json2Key) ?
            {...acc, [key]: json1Key} : {...acc, [key]: json2Key};
    }, {}, uniqueKeys);

    return R.assocPath(path, mergedVersions, json1);
};

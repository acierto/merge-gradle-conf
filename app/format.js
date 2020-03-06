import R from 'ramda';

const indent = '        ';

export const format = (config) =>
    [
        'dependencyManagement {',
        '    versions {',
        R.reduce((acc, key) => `${acc}${acc ? '\n' : ''}${indent}${key}="${config[key]}"`, '', R.keys(config)),
        '    }',
        '}'
    ].join('\n');

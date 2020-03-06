import R from 'ramda';

export const parseFile = (content) => {
    const removeQuotes = (value) => R.replace(/['"]+/g, '', value);
    const toValue = (text) => removeQuotes(R.trim(text));

    return R.reduce((acc, line) => {
        if (R.contains('=', line)) {
            const tokens = line.split('=');
            const variableName = toValue(tokens[0]);
            const variableValue = toValue(tokens[1]);
            return {
                ...acc,
                [variableName]: variableValue
            };
        }
        return acc;
    }, {}, content.split('\n'));
};

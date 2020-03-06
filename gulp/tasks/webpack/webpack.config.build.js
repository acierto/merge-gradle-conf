import paths from '../../utils/paths';

export default {
    devtool: 'inline-source-map',
    entry: {
        index: ['./app']
    },
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /(node_modules|tmp)/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                test: /\.js$/
            }
        ]
    },
    node: {module: 'empty'},
    optimization: {
        minimize: false
    },
    output: {
        filename: '[name].js',
        library: 'merge-grade-conf',
        libraryTarget: 'umd',
        path: paths.distDir
    },
    target: 'node'
};

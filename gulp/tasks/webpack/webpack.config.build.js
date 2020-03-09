import paths from '../../utils/paths';
import nodeExternals from 'webpack-node-externals';

export default {
    devtool: 'inline-source-map',
    entry: {
        index: ['./app']
    },
    externals: [nodeExternals()],
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

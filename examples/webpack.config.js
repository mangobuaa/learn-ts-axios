const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',

    // examples 目录下有多个目录，不同章节的目录放入不同的目录中
    // 每个目录下的 app.ts 为 webpack 的入口文件
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        // entries = {
        //     'simple': ['webpack-hot-middleware/client', '/Users/.../.../simple/app.ts'],
        //     ...
        // }
        const fullDir = path.join(__dirname, dir);
        const entry = path.join(fullDir, 'app.ts');
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }
        return entries;
    }, {}),

    // 根据不同的目录名称，打包生成目标 js，名称和目录名一致
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        publicPath: '/__build__'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    { loader: 'tslint-loader' }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]

}
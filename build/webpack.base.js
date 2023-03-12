// 导入path
const path = require('path');
// 引入vue-loader的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 引入html-build-plguin插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入 clean-build-plugin插件 --- 仅保留打包好的一个js文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 打包入口文件
    entry: './src/main.js',
    // 打包出口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    // 配置打包规则
    module: {
        rules: [
            // 安装babel-loader和@babel/core和@babel/preset-env 在主目录下创建 .babelrc ===》解析es6语法, 并设置.babelrc
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            // 安装vue-loader
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            },
            {
                // 安装file-loader和url-loader ---> url-loader依赖file-loader
                test: /\.(jpg|jpeg|png|svg)$/,
                use: {
                    loader: "url-loader", // file-loader 改成url-loader
                    options: {
                        name: '[name].[ext]', // 将解析的图片名称，设置为源文件名
                        outputPath: 'images/', // 解析的路径
                        limit: 2048, // 小于这个值的话打包成base64  --- 单位byte
                    }
                }
            },
            // style-loader改成了vue-style-loader ===> 可以使vue文件style加lang，设置样式
            // 安装css-loader和style-loader
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'], // 顺序为从右到左css-loader-----》style-loader
            },
            // 安装stylus和stylus-loader
            {
                test: /\.styl(us)?$/, // ？以什么结尾
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
            },
            // 安装sass和sass-loader
            {
                test: /\.s[ac]ss$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            }]
    },

    // 插件配置
    plugins: [
        new VueLoaderPlugin(),
        // 在打包结束时，在dist目录下自动生成index.html文件，并把打包好的js文件引入到html中
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板文件，生成的dist/index.html会以此模版生成
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        // 起别名
        alias: {
            '@': path.join(__dirname, '../src'),
            'vue': 'vue/dist/vue.js',
            'styles': path.join(__dirname, '../src/assets/styles'),
            'images': path.join(__dirname, '../src/assets/images'),
        }
    },
}
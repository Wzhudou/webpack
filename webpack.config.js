const path = require('path');
// console.log(__dirname); // 为webpack.config.js所处的位置-根目录
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlPlugin = new htmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})
module.exports = {
    // 编译模式
    mode: 'development', // development production
    entry: path.join(__dirname, './src/index.js'), // 打包入口
    output: { // 出口
        path: path.join(__dirname, './dist'), // 输出文件的存放路径
        filename: 'bundle.js', // 输出文件名称
    },
    plugins: [ 
        htmlPlugin,
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/, 
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // {
            //     test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
            //     use: 'url-loader?limit=78766',
            // }
            {
                test: /\.(jpg|jpeg|png|gif|bmp|ttf|eot|svg|woff|woff2)$/,
                use: {
                    loader: "url-loader", // file-loader 改成url-loader
                    options: {
                        esModule: false,
                        // name: '[name].[ext]', // 将解析的图片名称，设置为源文件名
                        // outputPath: 'images/', // 解析的路径
                        limit: 78766, // 小于这个值的话打包成base64  --- 单位byte
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            }
        ]
    }
}
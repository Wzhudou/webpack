// 公共webpack配置
const baseConfig = require('./webpack.base');
// 合并两个webpack文件
const merge = require('webpack-merge');
// 引入webpack插件
const webpack = require('webpack');

const devConfig = {
    mode: 'development', // 开发时设置development ，生产环境用production
    // SourceMap --- 在开发时快速定位到出错的源代码行
    devtool: 'cheap-module-eval-source-map', //这个是很多项目推荐的方式
    // 实时重新加载功能
    devServer: {
        // 指定服务器目录
        contentBase: './dist',
        // 自动打开浏览器
        open: true,
        // 热模块替换---就是修改样式后，添加的内容不发生变化，诸如此类的 这一步骤与 // 引入webpack插件 和new build.HotModuleReplacementPlugin(), 同时进行
        hot: true,
    },

    // 插件配置
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
}
module.exports = merge(baseConfig, devConfig);
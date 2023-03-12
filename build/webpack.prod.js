const baseConfig = require('./webpack.base');
// 合并两个webpack文件
const merge = require('webpack-merge');

const prodConfig = {
    mode: 'production', // 开发时设置development ，生产环境用production
}
module.exports = merge(baseConfig, prodConfig);
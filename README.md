# 一： 模块化规范
# 步骤一、Node.js 中通过 babel 体验ES6 模块化
① npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
② npm i --save @babel/polyfill
③ 项目根目录下创建babel.config.js，内容件文件
④ 创建index.js文件
⑤ 执行 npx babel-node .\index.js 代码
# 步骤二、模块化的基本语法
1、默认导出与导入
(1) 导出：export default
(2) 导入：import m1 from 'm1.js'
2、按需导出 与 按需导入
(1) export let s2 = 10;
(2) import { s2 } from '模块标识符'
3、直接导入并执行模块代码
import 'm2.js'

# 二：webpack
# 步骤一：安装和配置webpack
① 运行 npm install webpack webpack-cli -D 命令， 安装webpack相关包
② 在项目根目录中，创建名为webpack.config.js的webpack配置文件
③ 在webpack配置文件中，初始化如下基本配置
module.exports = {
    // 编译模式
    mode: 'development', // production 
}
④ 在package.json配置文件中的scripts节点下，新增dev脚本如下
"dev": "webpack"
⑤ 终端运行npm run dev
# 步骤二：配置webpack的入口与出口
① webpack 的4.x版本中默认指定：
入口： src -> index.js
出口：dist -> main.js
② 修改打包入口与出口
onst path = require('path');
entry: path.join(__dirname, './src/index.js'), // 打包入口
output: { // 出口
    path: path.join(__dirname, './dist'), // 输出文件的存放路径
    filename: 'bundle.js', // 输出文件名称
}
# 步骤三：配置webpack的自动打包功能
① 运行npm install webpack-dev-server -D命令，安装自动打包的工具
② 修改 package.json中的scripts中的dev命令
"dev": "webpack-dev-server"
③ 将src -》index.html中的script脚本的引用路径，修改为bundle.js
<script src="/bundle.js"></script>
④ npm run dev
注意事项
webpack-dev-server 会启动一个实时打包的http服务器
webpack-dev-server 打包生成的输出文件，默认放到了项目根目录中，而且是虚拟的，看不见的

# 步骤四：配置html-webpack-plugin生成预览页面
① 运行npm install html-webpack-plugin -D 命令，安装生成预览页面的插件
② 修改webpack-config.js 文件头部区域，添加如下配置信息
const HTMLWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HTMLWebpackPlugin({ // 创建插件的实例对象
    template: './src/index.html', // 指定要用到的模板文件
    filename: 'index.html', // 指定生成文件的名称，该文件存在于内存中，在目录中不显示
})
③ 修改webpack.config.js文件向外暴露的配置对象，新增如下配置节点
module.exports = {
    plugins: [ htmlPlugin ] // plugins数组是webpack打包期间会用到的一些插件列表
}
# 步骤五：配置自动打包相关的参数
1、自动打开浏览器
<!-- --open 自动打开浏览器 -->
"dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888"

# 步骤六：加载器
1、通过loader打包非js模块
# (1) 打包处理css文件
① 运行 npm i style-loader css-loader -D 命令，安装处理css文件的loader
② 在webpack.config.js的module -> rules数组中，添加loader规则如下：
module: {
    rules: [
        {test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
}
### 注意：use数组中指定的loader顺序是固定的，多个loader的调用顺序是：从后往前调用的
# (2) 打包处理less文件
① 运行npm i less-loader less -D命令
② 在webpack.config.js的module -> rules数组中，添加loader规则如下：
{test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
# (3) 打包处理scss文件
① 运行npm i sass-loader node-sass -D命令
② 在webpack.config.js的module -> rules数组中，添加loader规则如下：
{test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
# (4) 配置postCSS自动添加css的兼容前缀
① 运行 npm i postcss-loader autoprefixer -D 命令
② 在项目根目录中创建postcss的配置文件 postcss.config.js，并初始化如下配置
const autoprefixer = require('autoprefixer') // 导入自动添加前缀的插件
module.exports = {
    plugins: [ autoprefixer ] // 挂载插件
}
③ 在webpack.config.js的module -> rules数组中，添加loader规则如下：
{test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']}
# (5) 打包样式表中的图片和字体文件
① 安装npm i url-loader file-loader -D 命令
② 在webpack.config.js的module -> rules数组中，添加loader规则如下：
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
### 其中 ？之后的是loader的参数项
### limit用来指定图片的大小，单位是字节(byte),只有小于limit大小的图片，才会被转为base64图片

# (6) 打包处理js文件中的高级语法
① 安装babel转换器相关的包：npm i babel-loader @babel/core @babel/runtime -D
② 安装babel语法插件相关的包：npm i @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
③ 项目根目录中创建babel配置文件babel.config.js并初始化基本配置如下：
module.exports = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-trasnform-runtime', '@babel/plugin-proposal-class-properties']
}
④ 在webpack.config.js的module -> rules数组中，添加loader规则如下：
{
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/  // exclude表示排除项，不需要处理的文件
}

# 步骤六：单文件组件-单文件组件的组成结构
### webpack中配置vue组件的加载器
① 运行 npm i vue-loader vue-template-compiler -D命令
② 在webpack.config.js的module -> rules数组中，添加loader规则如下：
const VueLoaderPlugin = require('vue-loader/lib/plugin);
module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                }
            },
        ]
    },
    plugins: [
        // 其他插件
        new VueLoaderPlugin();
    ]
}
### 在webpack中使用vue
① 运行 npm i vue -S 安装vue
② 在src的index.js入口文件中，通过import Vue from 'vue' 来导入vue构造函数
③ 创建vue的实例对象，并指定要控制的el区域
④ 通过render函数渲染APP根组件

# 步骤七：webpack打包发布
package.json文件配置打包命令
该命令默认加载项目根目录中的webpack.config.js配置文件
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open",
    "build": "webpack -p"
},
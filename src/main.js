// 需要导入实例化vue根实例
import Vue from 'vue';
// 创建vue的根实例---导入app组件
import App from './App.vue';
// 导入样式
import './assets/styles/scss/common.scss'


// 挂在App组件
new Vue({
    el: '#app',
    components: {
      App,
    },
    template: '<App />'
})
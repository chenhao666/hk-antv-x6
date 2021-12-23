/*
 * @Description: 这是一个描述
 * @Version: 2.0
 * @Autor: Chen
 * @Date: 2021-12-21 11:37:56
 * @LastEditors: Chen
 * @LastEditTime: 2021-12-22 13:52:16
 */
import Vue from 'vue'
import App from './App.vue'
import Antd  from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd)

new Vue({
  el: '#app',
  render: h => h(App)
})

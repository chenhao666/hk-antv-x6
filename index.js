/*
 * @Description: 入口文件
 * @Version: 2.0
 * @Autor: Chen
 * @Date: 2021-12-17 11:21:55
 * @LastEditors: Chen
 * @LastEditTime: 2021-12-17 15:11:24
 */
import hkAntvX6 from './src/components/hk-antv-x6'
import _Vue from 'vue'

hkAntvX6.install = Vue => {
    if (!Vue) {
        window.Vue = Vue = _Vue
    }
    Vue.component(hkAntvX6.name, hkAntvX6)
}
export default hkAntvX6
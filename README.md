<!--
 * @Description: hk-monaco-editor
 * @Version: 2.0
 * @Autor: Chen
 * @Date: 2021-12-17 11:09:44
 * @LastEditors: Chen
 * @LastEditTime: 2021-12-23 14:18:38
-->
# main.js全局安装
import hkAntvX6 from 'hk-antv-x6' 

Vue.use(hkAntvX6)

## Install
1.npm安装：npm install hk-antv-x6 --save  

2.yarn安装：yarn add hk-antv-x6

3.引用 hk-antv-x6.js

## Quick Start
import hkMonacoEditor from 'hk-monaco-editor'

components:{
    hkAntvX6
},

<hk-antv-x6 :nodeList="nodeList2" minimap contactPorts></hk-antv-x6>

 * @description: antvX6组件
 
 * @param {String} title 标题  default:'默认标题'

 * @param {Array | Object | undefined} nodeList 左侧可拖拽ui列表 default:undefined
 *        isArray: params:[{type:string,label:string,img:string}] type(Reat | Circle)图形类型(矩形|圆) label文本信息 img图片icon
 *        isObject: params{key:string,value:Array} key为分组name value为节点信息

 * @param {Boolean} minimap 是否开启小地图  default:false

 * @param {Boolean} contactPorts 是否开启连接桩连线  default:false

 * @param {Boolean} rightMenu 是否开启右键菜单  default:false

 * @function: menuClick 右键菜单点击事件

 * @function: deleteNode 删除节点

 * @function: downLoad 下载当前图片
 
 * @function: toJson 当前数据转化为json

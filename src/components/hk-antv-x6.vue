<!--
 * @Description: antvX6组件
 * @Version: 2.0
 * @Autor: Chen
 * @Date: 2021-12-17 11:22:38
 * @LastEditors: Chen
 * @LastEditTime: 2021-12-23 14:19:07
-->
<template>
  <div class="hkAntvX6">
    <div class="actions">
      <div class="title">{{ title }}</div>
      <div class="tools">
        <a-icon type="delete" @click="deleteNode"/>
        <a-icon type="download" @click="downLoad"/>
        <a-icon type="save" @click="toJson"/>
      </div>
    </div>
    <div class="antvX6">
      <div ref="Stencil" id="Stencil" v-if="nodeList"></div>
      <div ref="Graph" id="Graph"></div>
      <div ref="minMap" id="minMap" v-if="minimap"></div>
      <!--右键菜单-->
      <div id="contextmenu" ref="contextmenu" v-if="rightMenu">
        <a-menu slot="overlay" @click="menuClick" :selectable="false">
          <a-menu-item key="1">运行</a-menu-item>
          <a-menu-item key="2">编辑</a-menu-item>
          <a-menu-item key="3">复制节点</a-menu-item>
          <a-menu-item key="4">删除节点</a-menu-item>
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script>
/**
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
 * @function: toJson(jsonObj) 当前数据转化为json
 * 
 * @return {*}
 * @author: Chen
 */
import AntvX6 from '../utils/antvX6'
export default {
  name: 'hk-antv-x6',
  props:{
    title:{
      type:String,
      default:'默认标题'
    },
    nodeList:{
      type:Array | Object | undefined,
      default:undefined
    },
    minimap:{
      type:Boolean,
      default:false
    },
    contactPorts:{
      type:Boolean,
      default:false
    },
    rightMenu:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      antvX6:{}
    }
  },
  created() {
    
  },
  mounted(){
    const { nodeList,minimap,contactPorts,rightMenu } = this;
    let antvX6=new AntvX6();
    antvX6.createGraph(this.$refs.Graph,{
      minimap:{
        enabled: minimap,
        container: this.$refs.minMap,
      }
    })

    if(nodeList){
      antvX6.createStencil(this.$refs.Stencil,{
        groups:nodeList.constructor===Array?[]
        :Object.keys(nodeList).map(v=>{
          return {
            name: v,
            title:v,
            collapsable: true,
            graphHeight:nodeList[v].length*80
          }
        })
      })
      antvX6.createLeftNode(this.nodeList)
    }
    
    if(contactPorts) antvX6.openPoints();

    antvX6.registerClick()

    if(rightMenu) antvX6.registerRightMenu(this.$refs.contextmenu);

    this.antvX6=antvX6;
  },
  methods:{
    menuClick({ item, key, keyPath }){
      console.log(item, key, keyPath)
      this.$emit('menuClick',key)
    },
    deleteNode(){
      this.antvX6.removeNode();
    },
    downLoad(){
      this.antvX6.downLoad();
    },  
    toJson(){
      // console.log();
      this.$emit('toJson',this.antvX6.antvToJson());
    }
  }
}
</script>

<style scoped>
  .hkAntvX6{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
 .actions{
   flex-shrink: 0;
   width: 100%;
   height: 60px;
   background: #999;
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .title{
   margin-left:15px;
 }
 .tools{
   display: flex;
   align-items: center;
 }
 .anticon{
   margin: 0px 10px;
   color: #fff;
   cursor: pointer;
 }
 .antvX6{
   flex: 1;
   position: relative;
   width: 100%;
   height: 100%;
   display: flex;
 }
 #Stencil{
    width: 240px;
    height: 100%;
    position: relative;
    border-right: 1px solid #dfe3e8;
 }
 #Graph{
    flex: 1;
    height: 100%;
 }
 #minMap{
   flex:0;
   position: absolute;
   bottom: 0px;
   right: 0px;
 }
  #contextmenu{
    position: absolute;
    left: -1000px;
    top: -1000px;
  }
</style>

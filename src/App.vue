<!--
 * @Description: 这是一个描述
 * @Version: 2.0
 * @Autor: Chen
 * @Date: 2021-12-17 11:09:44
 * @LastEditors: Chen
 * @LastEditTime: 2021-12-23 17:20:21
-->
<template>
  <div id="app">
    <hk-antv-x6 :nodeList="nodeList2" minimap contactPorts rightMenu keyboard></hk-antv-x6>
  </div>
</template>

<script>
import hkAntvX6 from './components/hk-antv-x6'
export default {
  name: 'app',
  data () {
    return {
      nodeList2:{
        'Reat':[
          {
            type:'Reat',
            label:'sql',
            img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
          },{
            type:'Reat',
            label:'mysql',
            img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
          },{
            type:'Reat',
            label:'oracle',
            img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
          },{
            type:'Reat',
            label:'test',
            img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
          }
        ],
        'Circle':[
          {
            type:'Circle',
            label:'sever',
            img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
          },{
            type:'Circle',
            label:'client',
            img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
          }
        ]
      },
      nodeList:[
        {
          type:'Reat',
          label:'sql',
          img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
        },{
          type:'Reat',
          label:'mysql',
          img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
        },{
          type:'Reat',
          label:'oracle',
          img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
        },{
          type:'Reat',
          label:'test',
          img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
        },{
          type:'Circle',
          label:'sever',
          img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
        },{
          type:'Circle',
          label:'client',
          img:'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png'
        }
      ]
    }
  },
  components:{
    hkAntvX6
  },
  mounted(){
    
  },
  methods:{
    
  }
}
</script>

<style>
#app {
  width: 800px;
  height: 860px;
}
</style>

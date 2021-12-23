/*
 * @Description: 基础配置文件
 * @Version: 2.0
 * @Autor: Chen
 * @Date: 2021-12-21 14:31:33
 * @LastEditors: Chen
 * @LastEditTime: 2021-12-23 17:20:15
 */
import { Shape } from "@antv/x6";
//基础画布配置
const graphOptions={
    width:800,
    height:800,
    autoResize:true,
    background: {
        color: '#f4f4f4', // 设置画布背景颜色
    },
    mousewheel: { //缩放
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
    },
    grid: {
        size: 10,      // 网格大小 10px
        visible: true, // 渲染网格背景
    },
    clipboard: {  //开启剪切板
      enabled: true,
    },
    keyboard: {  //开启键盘快捷键
      enabled: true,
      global: true,
    },
    selecting: {  //开启选择
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    },
    connecting: { //自定义连线样式
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20,
        },
        allowMulti:false,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        },
    },
}
//Stencil 的实例配置，并提供了一些选项来定制 UI 和拖拽行为
const StencilOptions={
    title:'工具栏',
    groups: [], //分组
    search(cell, keyword) {
        return cell.label.indexOf(keyword) !== -1
    },
    placeholder:'Search by shape name',
    notFoundText:'Not Found',
    collapsable:true,
    stencilGraphWidth:200,
    stencilGraphHeight:800,
    stencilGraphPadding:10,
    layoutOptions: {
      dx:60,
      columns: 1,
      columnWidth: 80,
      rowHeight: 'compact',
    }
}

export {
    graphOptions,
    StencilOptions
}
/*
 * @Description: 基础图形库
 * @Version: 2.0
 * @Autor: Chen
 * @Date: 2021-12-21 14:43:50
 * @LastEditors: Chen
 * @LastEditTime: 2021-12-22 15:14:30
 */

import { Shape,Graph,ObjectExt } from "@antv/x6";
//注册连接桩
// #region 初始化图形
const ports = {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
}
//注册自定义矩形
Graph.registerNode(
    'image-node',
    {
      inherit: 'rect',
      width: 150,
      height: 32,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image'
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#333',
          strokeDasharray:'0.5,1',
          strokeWidth: 1,
          fill: '#f4f4f4',
        },
        image: {
          'xlink:href':
            'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          width: 16,
          height: 16,
          x: 10,
          y: 8,
        },
        label: {
          refX: 35,
          refY: 16,
          fontSize: 12,
          fill: 'rgba(0,0,0,0.6)',
          'text-anchor': 'start',
        },
      },
      propHooks(metadata) {
        const { img, ...others } = metadata
        if (img) {
          ObjectExt.setByPath(others, 'attrs/image/xlink:href', img)
        }
        return others
      },
      ports
    },
    true,
)
//注册自定义圆形
Graph.registerNode(
    'image-node-circle',
    {
      inherit: 'circle',
      width: 60,
      height: 60,
      markup: [
        {
          tagName: 'circle',
          selector: 'body',
        },
        {
          tagName: 'image'
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#333',
          strokeDasharray:'0.5,1',
          strokeWidth: 1,
          fill: '#f4f4f4',
        },
        image: {
          'xlink:href':
            'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
          width: 26,
          height: 26,
          x: 17,
          y: 25,
          'text-anchor': 'middle',
        },
        label: {
          refY: 15,
          fontSize: 12,
          fill: 'rgba(0,0,0,0.6)',
          'text-anchor': 'middle',
        },
      },
      propHooks(metadata) {
        const { img, ...others } = metadata
        if (img) {
          ObjectExt.setByPath(others, 'attrs/image/xlink:href', img)
        }
        return others
      },
      ports
    },
    true,
)
//注册自定义圆形
Graph.registerNode(
    'node-circle',
    {
      inherit: 'circle',
      width: 60,
      height: 60,
      markup: [
        {
          tagName: 'circle',
          selector: 'body',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#333',
          strokeDasharray:'0.5,1',
          strokeWidth: 1,
          fill: '#f4f4f4',
        },
        label: {
          fontSize: 12,
          fill: 'rgba(0,0,0,0.6)',
          'text-anchor': 'middle',
        },
      },
      propHooks(metadata) {
        const { img, ...others } = metadata
        if (img) {
          ObjectExt.setByPath(others, 'attrs/image/xlink:href', img)
        }
        return others
      },
      ports
    },
    true,
)
export const Reat=(graph,options)=>{
    // return new Rect({
    //     width: 150,
    //     height:32,
    //     attrs: {
    //       rect: { fill: '#f4f4f4', stroke: '#333', strokeWidth: 1,strokeDasharray:'.5,1' },
    //       text: { text: title, fill: '#333' },
    //     },
    // })
    return graph.createNode({
        shape: 'image-node',
        attrs: {
          body: {
            rx: 10,
            ry: 10,
          },
        },
        ...options,
        ports
    })
}

export const Circle=(graph,options)=>{
    return graph.createNode({
        shape: (options && options.img)?'image-node-circle':'node-circle',
        attrs: {
          body: {
            rx: 10,
            ry: 10,
          },
        },
        ...options,
        ports
    })
}
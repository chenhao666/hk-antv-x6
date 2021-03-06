/*
 * @Description:antvX6
 * @Version: 2.0
 * @Autor: Chen
 * @Date: 2021-12-21 13:55:44
 * @LastEditors: Chen
 * @LastEditTime: 2021-12-23 17:34:23
 */
import { Graph,Addon,DataUri  } from '@antv/x6';
import { graphOptions,StencilOptions } from '../config/antv.config'
import { Reat,Circle } from '../config/shape.config'

/**
 * @description: antvX6使用
 * @function: createGraph(graphNode:HTMLElement,options:Options) 创建画布 
 * @function: dispose() 销毁画布
 * @function: createStencil(Stencil:HTMLElement,options:Options) 创建侧边栏的 UI 组件
 * @function: createLeftNode(nodeList：Array | Object | undefined) 创建侧边栏的 UI 组件库Node
 *          isArray: params:[{type:string,label:string,img:string}] type(Reat | Circle)图形类型(矩形|圆) label文本信息 img图片icon
 *          isObject: params{key:string,value:Array} key为分组name value为节点信息
 * @function: openPoints() 开启连接桩进行连线操作
 * @function: registerClick() 注册node以及edge点击事件
 * @function: registerRightMenu() 注册右键点击菜单
 * @function: registerKeyboard() 注册常用的键盘快捷键
 * @function: removeNode() 删除当前选中节点
 * @function: downLoad() 当前graph转化为图片下载
 * @function: antvToJson() 当前graph转化为json串
 * @return {*} antvX6  CLASS
 * @author: Chen
 */
class antvX6{
    constructor(){
        //graph对象
        this.graphNode={};
        this.graph={};
        //stencil对象
        this.stencil={};
        //延时器
        this.timer=0;
        //菜单node
        this.menuNode={};
        //当前操作图形
        this.actionShape={}
        
    }
    //渲染画布
    createGraph(graphNode,options){
        let opt=Object.assign(graphOptions,options);
        this.graphNode=graphNode;
        this.graph = new Graph({
            container: graphNode,
            ...opt
        });
    } 
    //销毁画布
    dispose(){
        this.graph.dispose();
    }
    //创建Stencil左侧展示组件库
    createStencil(Stencil,options){
        let opt=Object.assign(StencilOptions,options);
        let stencil = new Addon.Stencil({
            target: this.graph,
            ...opt
        });
        Stencil.appendChild(stencil.container);
        this.stencil=stencil;
    }
    //创建左侧拖拽ui
    createLeftNode(nodeList){
        //判断是否含有分组信息
        if(nodeList.constructor===Array){
            let renderNodeList=nodeList.map(v=>{
                if(v.type==="Circle"){
                    return Circle(this.graph,v)
                }
                return Reat(this.graph,v)
            });
            this.stencil.load(renderNodeList)
        }else{
            for(let x in nodeList){
                let renderNodeList=nodeList[x].map(v=>{
                    if(v.type==="Circle"){
                        return Circle(this.graph,v)
                    }
                    return Reat(this.graph,v)
                });
                this.stencil.load(renderNodeList,x)
            }
        }
    }

    // 控制连接桩显示/隐藏
    showPorts (ports, show){
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
    }
    //添加鼠标事件连接桩
    openPoints(){
        this.graph.on('node:mouseenter', () => {
            const ports = this.graphNode.querySelectorAll(
            '.x6-port-body',
            )
            this.showPorts(ports, true)
        })
        this.graph.on('node:mouseleave', () => {
            const ports = this.graphNode.querySelectorAll(
            '.x6-port-body',
            )
            this.showPorts(ports, false)
        })
    }
    //注册node点击事件
    registerClick(){
        //Node点击事件
        this.graph.on('node:click', ({ e, x, y, cell, view }) => { 
            this.actionShape=cell;
            this.reset();
            cell.setAttrs({
                body: {
                    stroke: 'blue',
                    strokeDasharray:'0.5,1',
                    strokeWidth: 1,
                    fill: '#e6f7ff',
                },
            })
        })
        //edge点击事件
        this.graph.on('edge:click', ({ e, x, y, cell, view }) => { 
            this.actionShape=cell;
            this.reset();
            cell.setAttrs({
                line: {
                    stroke: '#91d5ff',
                },
            })
        })

    }
    //注册右键事件
    registerRightMenu(menuNode){
        // Graph.registerNodeTool('contextmenu',ContextMenuTool,true)
        //点击事件
        this.graph.on('node:contextmenu', ({ e, x, y, cell, view }) => { 
            this.actionShape=cell;
            e.preventDefault();
            // console.log(e, x, y, cell, view)
            // const pos = this.graph.clientToGraph(e.clientX, e.clientY);
            // menuNode.style.left= `${pos.x+240}px`
            // menuNode.style.top= `${pos.y}px`
            this.menuNode=menuNode;
            this.updatePosition(e);
            this.toggleContextMenu(true);
        })   
    }
    //注册常用快捷键
    registerKeyboard(){
        this.graph.bindKey('ctrl+c', () => {
            const cells = this.graph.getSelectedCells()
            if (cells.length) {
                this.graph.copy(cells)
            }
            return false
        })
    
        this.graph.bindKey('ctrl+v', () => {
            if (!this.graph.isClipboardEmpty()) {
                const cells = this.graph.paste({ offset: 32 })
                this.graph.cleanSelection()
                this.graph.select(cells)
            }
            return false
        })

        this.graph.bindKey('delete', () => {
            this.removeNode();
            return false
        })
    }
    //更新位置以及点击事件
    updatePosition(e){
        const style = this.menuNode.style;
        if (e) {
            const pos = this.graph.clientToGraph(e.clientX, e.clientY)
            style.left = `${pos.x+240}px`
            style.top = `${pos.y}px`
        } else {
            style.left = '-1000px'
            style.top = '-1000px'
        }
    }
    toggleContextMenu(visible){
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = 0
        }
        document.removeEventListener('mousedown', this.onMouseDown.bind(this))
        if (visible) {
            document.addEventListener('mousedown', this.onMouseDown.bind(this))
        }
    }
    onMouseDown (e){
        e.stopImmediatePropagation();
        //判断非右键 ---避免冲突
        if(e.button!==2){
            this.toggleContextMenu(false)
            this.timer = window.setTimeout(() => {
                this.updatePosition()
            }, 1000)
        }
    }
    //重置node attr属性颜色
    reset() {
        const nodes = this.graph.getNodes()
        const edges = this.graph.getEdges()
  
        nodes.forEach((node) => {
          node.attr('body/stroke', '#333')
          node.attr('body/fill', '#f4f4f4')
        })
  
        edges.forEach((edge) => {
          edge.attr('line/stroke', '#A2B1C3')
          edge.prop('labels/0', {
            attrs: {
              body: {
                stroke: '#A2B1C3',
              },
            },
          })
        })
    }
    //删除节点
    removeNode(){
        if(!this.graph.isSelectionEmpty()) this.graph.getSelectedCells().forEach(v=>this.graph.removeNode(v));
        this.graph.removeNode(this.actionShape);
    }
    //下载图片
    downLoad(){
        this.graph.toPNG((dataUri) => {
            // 下载
            DataUri.downloadDataUri(dataUri, 'chart.png')
        })
    }
    //转成json格式
    antvToJson(){
        return this.graph.toJSON();
    }
}

export default antvX6;
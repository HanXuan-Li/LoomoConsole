import React, { useState, Component} from 'react';
import {useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import data40 from './scene_graph40.json'
import { Alert } from 'antd';
import { message, Button } from 'antd';
import {CSS2DObject, CSS2DRenderer} from 'three-css2drenderer';

const myData = {
    nodes : [
        {id : ' a ',
        name : 'table'},
        {id : ' b ',
        name : 'chair'}, 
        {id : ' c ',
        name : 'cup'}
    ], 
    links : [ 
        { source : ' a ' , target : ' b ', name : 'next to' }, 
        { source : ' c ' , target : ' a ', name : 'on' },
        { source : ' b ' , target : ' c ', name : 'none' }
    ] 
};

const initData = {
    nodes: [ {id: 0,
             name: 'table'} ],
    links: []
};

class ForceGraph_3D extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : initData,
            // data : {nodes:[], links:[]},
            current_id : 1,         // 当前的总id数
            current_batch_id : 0   // 当前接受到的总批数
        }
    }

    // 无后端时的调试代码，自动扩张场景图
    /*
    componentDidMount(props) {
        setInterval(()=>{
            const { nodes, links } = this.state.data
            const id = nodes.length;
            this.setState({
                data : {
                    nodes: [...nodes, { id, name:'chair' + id, color : "DeepSkyBlue" }],
                    links: [...links, { source: id, target: Math.round(Math.random() * (id-1)), name:'next to' }]
                },
                current_id : id
            })
        },5000)
    }
    */
    

    componentDidMount(props) {
        setInterval(()=>{
            fetch("http://127.0.0.1:5000/3d_sg", {method : "POST"})
            .then(
                res => res.json()
            )
            .then(data1 =>{
                const { nodes, links } = this.state.data
                const id = nodes.length;
                if (data1.id != this.state.current_batch_id){
                this.setState({
                    data : {
                        nodes : [...nodes, ...data1.nodes],
                        links : [...links, ...data1.links]
                    },
                    current_id : id,
                    current_batch_id : data1.id
                    })
                }

            })
            .catch(e => console.log('error', e))
        },500)
    }

    render(){
        const extraRenderers = [new CSS2DRenderer()];
        return <ForceGraph3D 
        extraRenderers={extraRenderers}
        width={this.props.width}
        height={this.props.height}
        graphData={this.state.data} 
        nodeColor = {node =>{
            if (node.id >= this.state.current_id){
                return "Orange";
            }else{
                return "DeepSkyBlue"
            }
        }}

        linkColor = {link =>{
            return "black";
        }}
        // nodeAutoColorBy = "group" 
        // linkAutoColorBy = "group"
        // linkWidth = {0.1}
        linkOpacity = {0.4}
        linkThreeObjectExtend={true}

        nodeThreeObject={node => {
          const sprite = new SpriteText(node.name);
          sprite.color = node.color;
          // sprite.color = node.id >= this.state.current_id ? "Orange" : "DeepSkyBlue";
          sprite.textHeight = 3;
          node.fx = node.id == this.props.current_id ? 0 : node.x;
          return sprite;
        }}
        nodeThreeObjectExtend={true}
        

        linkThreeObject={link => {
          // extend link with text sprite
          const sprite = new SpriteText(link.name)
          sprite.color = 'black';
          sprite.textHeight = 1.5;
          return sprite;
        }}

        linkPositionUpdate={(sprite, { start, end }) => {
          const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })));
    
          // Position sprite
          Object.assign(sprite.position, middlePos);
        }}
        // 可以关闭力引擎
        cooldownTicks={100}  
        
        // 设置球体的平滑程度
        nodeResolution = {16}
        
        // 设置球体透明度
        nodeOpacity = {0.75}
        nodeThreeObjectExtend={true} 

        // 设置背景颜色
        backgroundColor = "rgba(0,0,0,0)"
        />
    }
}

export default ForceGraph_3D;
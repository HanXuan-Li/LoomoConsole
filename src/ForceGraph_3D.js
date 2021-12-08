import React, { useState, Component} from 'react';
import {useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import data40 from './scene_graph40.json'
// import {CSS2DObject, CSS2DRenderer} from 'three-css2drenderer';

const myData = {
    nodes : [
      {id : ' a ',
       name : 'table'},
      {id : ' b ',
       name : 'chair'}
    ], 
    links : [ 
      { source : ' a ' , target : ' b ', name : 'next to' }
    ]
};

const myData2 = {
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
        { source : ' c ' , target : ' a ', name : 'on' } ] 
};

const myData3 = {
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
             name: 'table',
             color: 'DeepSkyBlue'} ],
    links: []
};

class ForceGraph_3D extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : initData,
            current_id : 0
        }
    }

    
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
    
    
    render(){
        return <ForceGraph3D 
        // extraRenderers={extraRenderers} 

        graphData={this.state.data} 
        
        nodeColor = {node =>{
            if (node.id == this.state.current_id){
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
          sprite.textHeight = 3;
          node.fx = node.id == this.state.current_id ? 0 : node.x;
          node.fx = node.id == this.state.current_id ? 0 : node.x;
          node.fx = node.id == this.state.current_id ? 0 : node.x;
          return sprite;
        }}
        

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
        cooldownTicks={1000}  
        
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
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

class ForceGraph_3D_big extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : {nodes:[], links:[]},
        }
    }


    componentDidMount(props) {
        fetch("http://127.0.0.1:5000/3d_sg_all", {method : "POST"})
        .then(
            res => res.json()
        )
        .then(data1 =>{
            this.setState({
                data : {
                    nodes : [...data1.nodes],
                    links : [...data1.links]
                }
                })
        })
        .catch(e => console.log('error', e))
    }


    render(){
        return <ForceGraph3D 
        width={this.props.width}
        height={this.props.height}
        graphData={this.state.data} 
        nodeColor = {node =>{
            return "DeepSkyBlue"
        }}

        linkColor = {link =>{
            return "black";
        }}

        linkOpacity = {0.4}
        linkThreeObjectExtend={true}

        nodeThreeObject={node => {
          const sprite = new SpriteText(node.name);
          sprite.color = node.color;
          sprite.textHeight = 3;
          node.fx = node.id == this.props.current_id ? 0 : node.x;
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

export default ForceGraph_3D_big;
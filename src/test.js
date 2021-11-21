import React, { useState, Component} from 'react';
import {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import data from './scene_graph40.json'

// const WIDTH = 400;
// const HEIGHT = 295;

class Test extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(props) {
    this.draw_force();
  }

  draw_force = () => {
    // 导入数据   // 数据格式为Obj
    this.forceChart(data.nodes, data.links)
  }
  
  forceChart = (nodes, edges) => {
    var WIDTH = 400;
    var HEIGHT = 295;
    WIDTH = this.props.width;
    HEIGHT = this.props.height;

    //绘制svg
    const svg = d3.select('#theChart').append('svg') // 在id为‘theChart’的标签内创建svg
      .attr("viewBox", [0, 0, WIDTH, HEIGHT])        //view box:视角随拖动改变
      .style('width', WIDTH)
      .style('height', HEIGHT)
      .style('background-color','grey')           //设置背景颜色
  }

  render() {
    return (
        <div className="theChart" id="theChart" ref="theChart" />
    )
  }
}

export default Test










import React, { useState, Component} from 'react';
import {useRef, useEffect} from 'react';
import * as d3 from 'd3';
// import first_data from './scene_graph40.json'
import first_data from './easy.json'

const WIDTH = 400;
const HEIGHT = 295;

class NewForceChart extends Component {
  constructor(props){
    super(props)
    this.state={
      // data: first_data,
      data : {},
      data_id: 0
    }
  }

  componentDidMount(props) {
    this.draw_force();
    
    setInterval(()=>{
        fetch("http://10.29.150.45:7007/get_sg", {method : "POST"})
        // fetch("/", {method : "POST"})
        .then(
          res => res.json()
          // res => res.text()
        )
        .then(data1 =>{
          console.log(data1)
          this.setState({
            data : data1,
            id : data1.id
          })
        })
        .catch(e => console.log('error', e))
       },500)
  }

  draw_force = () => {
    this.forceChart()
  }
  
  forceChart = () => {
    var WIDTH = 400;
    var HEIGHT = 295;
    WIDTH = this.props.width;
    HEIGHT = this.props.height;

    var nodesCircle;
    var link;
    var svg_texts;
    var simulation;
    // var edges = first_data.links;
    // var nodes = first_data.nodes;
    var edges = [];
    var nodes = [];

    //定义力模型
    simulation = d3.forceSimulation(nodes) // 指定被引用的nodes数组
    .force('link', d3.forceLink(edges).id(d => d.id).distance(60))   //边的长短
    .force('collision', d3.forceCollide(1).strength(0.1))            //设置节点碰撞
    .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2))          //设置力的中心
    .force('charge', d3.forceManyBody().strength(-500).distanceMax(50)); //设置力的大小及边最长拉伸多长

    
    // const svg=d3.select("#theChart")
    const svg=d3.select(`#${this.props.ref_name}`)
    
    
    
    //绘制连线
    link = svg.append("g")                     //'g'元素用来将SVG形状组合在一起
    .selectAll("line")
    // .data(edges) 
    .enter() // 为数据添加对应数量的占位符
    .append('path') // 在占位符上面生成折线（用path画）
    


    //这行不知道有什么用
    .attr('d', (d) => { return d && 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y; })
    .attr("stroke", "#999")   // 设置边的颜色
    .attr("stroke-opacity", 0.8)  // 设置透明度
    .attr("stroke-width", 1);  //设置线的粗细

   function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
    }
  
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  
    const drag = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    function color(i){
      i = nodes[i].group_name
      if (i=='object'){
        return "#008ec4"
      }else{
        return "orange"
      }
    }

    function size(i){
        i = nodes[i].group_name
        if (i=='object'){
          return 8
        }else{
          return 5
        }
      }
    
    function opacity(i){
      var j = nodes[i].new
      console.log("opacity")
      console.log(nodes[i].new)
      if (j==1){
        nodes[i].new = 0;
        return 1;
      }else{
        return 0.4;
      }
    }

    
    //绘制节点
    nodesCircle = svg.append('g')
    .attr("stroke", "#fff")
    .attr("stroke-width", 5)
    .selectAll("circle")
    // .data(nodes)
    .join("circle")
    .attr("r",function(d,i){
        return size(i)
    })
    .attr("fill", function(d,i){
      return color(i)
    })
    .call(drag)
    //.append("path")
    .attr("d",(d)=>{return d && 'translate(' + d.x + ',' + d.y + ')'});


    // 设置文字
    svg_texts = svg.append('g')
    .selectAll('.jdtext')
    // .data(nodes)
    .enter()
    .append("text")
    .style("fill", function(d,i){
        return color(i)
      })
    .attr("dx", 10)
    .attr("dy", 10)
    .text(function(d){
        return d.id
    });

    

    //鼠标移到节点上有气泡提示
    nodesCircle.append('title')
      .text((node) => { // .text设置气泡提示内容
        return node.name; // 气泡提示为node的名称
      });

    

    var id = 3
    var now = 0
    
    setInterval(()=>{
        if(this.state.id>=now){
        // if(true){
            now = now+1;
            // id++;
            // var new_node = [{"group":0, "id": id}];
            // var new_link = [{"source":1, "target": id}];
    
            var new_node = this.state.data.nodes;
            var new_link = this.state.data.links;

            // const svg=d3.select("#theChart")
            const svg=d3.select(`#${this.props.ref_name}`)
            svg.selectAll("*").remove()
            
            var i = 0
            var len1 = new_node.length
            var len2 = new_link.length
            console.log(new_node.length)
            while(i < len1){
                nodes.push(new_node[i])
                i++
            }
            
            i = 0
            while(i < len2){
                edges.push(new_link[i])
                i++
            }
            
            

            // nodes.push(new_node[0])
            // edges.push(new_link[0])
    
            //绘制节点
            nodesCircle = svg.append('g')
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r",function(d,i){
                return size(i)
            })
            .attr("fill", function(d,i){
              return color(i)
            })
            .attr("opacity", function(d,i){
              return opacity(i)
            })
            .call(drag);
    
            //绘制连线
            link = svg.append("g")                     //'g'元素用来将SVG形状组合在一起
            .selectAll("line")
            .data(edges) 
            .enter() // 为数据添加对应数量的占位符
            .append('path') // 在占位符上面生成折线（用path画）
    
            .attr("stroke", "#999")   // 设置边的颜色
            .attr("stroke-opacity", 0.8)  // 设置透明度
            .attr("stroke-width", 1);  //设置线的粗细
        
            // 设置文字
            svg_texts = svg.append('g')
            .selectAll('.jdtext')
            .data(nodes)
            .enter()
            .append("text")
            .style("fill", function(d,i){
                return color(i)
              })
            .attr("dx", 10)
            .attr("dy", 10)
            .text(function(d){
                return d.name
            });
    
            
            simulation.nodes(nodes);
            simulation.force("link").links(edges);
            simulation.alpha(1).restart();
        }
     },500)

     
    //监听图元素的位置变化
    simulation.on('tick', () => {
      // 更新节点坐标
      nodesCircle.attr('transform', (d) => {
        return d && 'translate(' + d.x + ',' + d.y + ')';
      });
      // 更新连线位置
      link.attr('d', (d) => {
        const path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        return path;
      });
      //更新文字位置
      svg_texts.attr('transform', (d) => {
        return d && 'translate(' + d.x + ',' + d.y + ')';
        });
    });
  }

  render() {
    return (
        <svg className={this.props.ref_name} id={this.props.ref_name} ref={this.props.ref_name}
        width={this.props.width}
        height={this.props.height}
        />
        // <div className="theChart" id="theChart" ref="theChart" />
    )
  }
}

export default NewForceChart;










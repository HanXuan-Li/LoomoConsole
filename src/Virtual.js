import React, {Component}from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Row, Col } from 'antd';
import './App.css';
import {
  RobotFilled,
  CloudFilled,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';

import VideoCard from './VideoCard'
import BigCard from './BigCard'
import OperationPanel from './OperationPanel'
import ScenegraphCard from './ScenegraphCard'

const { Header, Content, Footer } = Layout;

const style = {"text-align" : "center"};


class App extends Component {
  constructor(){
    super()
    this.state = {
      connect: false  
    }
  }


  //连不上就会connect refused
  //连上但接口错误才会报404
  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(e){
    console.log(e.keyCode)
    if (e.keyCode === 87 || e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68) {
      var data={"command":e.keyCode}
      fetch('http://10.29.51.58:3003/',{
        body: JSON.stringify(data), // must match 'Content-Type' header
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
    .then(function(res){
      console.log(res)
    })
   }
}

  render() {
    return (
        <Content style={{ padding: '0 50px' }}>
          <div className="site-card-border-less-wrapper">
              <Row gutter={16} justify='space-around'>
                <Col span={6}>
                  <VideoCard card_name="实时RGB图像" src="http://10.29.51.108:7007/get_color_flow" />
                </Col>

                <Col span={6}>
                  <VideoCard card_name="Depth图像" 
                  src="http://10.29.51.108:7007/get_depth_flow"
                  onerror="FloorPlan1_physics_01_img_24.png" />
                </Col>

                <Col span={6}>
                  <VideoCard card_name="第一视角重构图像" src="http://10.29.51.108:7007/get_reconstructed_flow" />
                </Col>

                <Col span={6}>
                  <ScenegraphCard />
                </Col>
              </Row>
              <br />
              <Row gutter={16} justify='start'>
                <Col span={6}>
                  <OperationPanel />
                </Col>
            
                <Col span={14} offset={2}>
                  <BigCard card_name="3D场景重构图" src="recon.png" width={{width: 1030}} />
                </Col>
              </Row>
          </div>
       </Content>
    );
  }
}

export default App;
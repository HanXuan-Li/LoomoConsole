import React, {Component}from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Row, Col } from 'antd';
import './App.css';
import {
  RobotFilled,
  CloudFilled,
  EyeOutlined
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


class Physical extends Component {
  constructor(){
    super()
    this.state = {
      connect: false  
    }
  }

  render() {
    return (
        <Content style={{ padding: '0 50px' }}>
          <div className="site-card-border-less-wrapper">
              <Row gutter={16} justify='space-around'>
                <Col span={6}>
                <VideoCard card_name={<>实时RGB　　　 　 　　　　 　　　 　　<EyeOutlined type="primary" style = {{"color" : "#096dd9"}} onClick={()=>{window.open("http://10.29.0.252:5000/loomo_api?image=http%3A%2F%2F10.29.51.108%3A7007%2Fget_color")}} /> </>} src="http://10.29.51.108:7007/get_color_flow" />
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
            
                <Col span={14} offset={1}>
                  <BigCard card_name="3D场景重构图" src="recon.png" width={{width: 1130}} />
                </Col>
              </Row>
          </div>
       </Content>
    );
  }
}

export default Physical;
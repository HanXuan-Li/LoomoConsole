import React, {Component}from 'react';
import 'antd/dist/antd.css';
import './index.css';
import './App.css';
import {
  RobotFilled,
  CloudFilled,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';

import Physical from './Physical'
import Virtual from './Virtual'

const { Header, Content, Footer } = Layout;

const style = {"text-align" : "center"};


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      current:'2'
    }
  }

  handleclick = (e)=>{
    console.log(e)
    this.setState({current: e.key})
  }

  render() {
    const contentList = {
      1: <Virtual />,
      2: <Physical />
    }
    return (
      <Layout style={{ minHeight: '100vh' }} className="layout">
        <Header>
          <div className="logo"/>
          <Menu 
            theme="dark" 
            mode="horizontal" 
            defaultSelectedKeys={['2']}
            onClick = {this.handleclick}
            selectedKeys={[this.state.current]}
            >
            <Menu.Item key="1" icon={<CloudFilled />}>Virtual Environment</Menu.Item>
            <Menu.Item key="2" icon={<RobotFilled />}>Physical Environment</Menu.Item>
          </Menu>
        </Header>
        {contentList[this.state.current]}
        <Footer style={{ textAlign: 'center' }}>Visual Information Processing and Learning ©2020 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default App;
import React, {Component} from 'react'
import { Card } from 'antd';
import { Button, message } from 'antd';
import { Slider } from 'antd';
import { Collapse } from 'antd';
import {
    WifiOutlined,
    PoweroffOutlined,
  } from '@ant-design/icons';

class OperationPanel extends Component{
    constructor(props){
      super(props)
      this.state={
        loadings: [],
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
      fetch('http://10.29.51.58:3004/',{
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
   }else if(e.keyCode === 75){
    fetch('http://10.29.51.108:7009/start_scan')
    .then((response)=> {
      console.log(response)
    })
    .catch((error)=> {
        console.log("start_scan failed")
    })
    fetch('http://10.29.150.45:7007/start')
    .then((response)=> {
      console.log(response)
    })
    .catch((error)=> {
        console.log("start_scene_graph failed")
    })
   }else if(e.keyCode === 74){
    fetch('http://10.29.51.108:7009/stop_scan')
    .then((response)=> {
      console.log(response)
    })
    .catch((error)=> {
        console.log("start_scan failed")
    })
    fetch('http://10.29.150.45:7007/stop')
    .then((response)=> {
      console.log(response)
    })
    .catch((error)=> {
        console.log("start_scene_graph failed")
    })
    fetch('http://10.208.40.12:5000/reset')
    .then((response)=> {
      console.log(response)
    })
    .catch((error)=> {
        console.log("start_scene_graph failed")
    })
   }
}

  
    onChange(value) {
      console.log('onChange: ', value);
      var data={"speed":value}
      fetch('http://10.29.51.58:3004/control',{
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
    
    onAfterChange(value) {
      console.log('onAfterChange: ', value);
    }
  
    callback(key) {
      console.log(key);
    }
  
    enterLoading = index => {
      const key = 'updatable';
      fetch('http://10.29.51.58:3004/')
      .then((response)=> {
        console.log(response)
        console.log("connect success")
        this.setState({
          connect : true
        })
      })
      .catch((error)=> {
        console.log("connect failed",error)
        this.setState({
          connect : false
        })
      })

      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = true;
  
        return {
          loadings: newLoadings,
        };
      });
  
      message.loading({ content: '正在连接Loomo机器人...', key });
      
      setTimeout(() => { 
        console.log(this.state.connect)     
        if(this.state.connect){
          message.success({ content: '连接成功!', key, duration: 2 });
        }else{
          message.error({ content: '连接失败!', key, duration: 2 });
      }}, 1000);

  
      setTimeout(() => {
        this.setState(({ loadings }) => {
          const newLoadings = [...loadings];
          newLoadings[index] = false;
  
          return {
            loadings: newLoadings,
          };
        });
      }, 1000);
    };
  
    render(){
      const { Panel } = Collapse;
      const { loadings } = this.state;
      return (
        <Card extra={<WifiOutlined style={this.state.connect ? {'color':'#096dd9', fontSize: '30px'}:{'color':'red', fontSize: '30px'}} />} title="操作说明" bordered={false} style={{ width: 400 }} hoverable>
        <div>
        <br />
          <img src="wasd2.png" alt="wasd" width="200"></img>
        </div>
        <b>使用键盘控制Loomo机器人移动</b>
        <br />
        <br />
      <Button type="primary" onClick={()=>this.enterLoading(0)} loading={loadings[0]} icon={<PoweroffOutlined />}>
          {this.state.connect ? "Loomo已在线" : "启动Loomo"}
        </Button>
        <Collapse defaultActiveKey={['1']} onChange={this.callback} expandIconPosition={'right'} ghost>
        <Panel header="Loomo机器人参数设置" key="2" style={{'font-weight':'bold'}}>
        <Slider defaultValue={30} onChange={this.onChange} onAfterChange={this.onAfterChange}/>
        拖动改变Loomo机器人移动线速度
        </Panel>
      </Collapse>
      </Card>
      )
    }
  }

  export default OperationPanel
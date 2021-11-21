import React, {Component} from 'react'
import { Card } from 'antd';
import {
    SettingFilled,
    WifiOutlined,
    ReloadOutlined
  } from '@ant-design/icons';
import ConnectLogo from './ConnectLogo'
const { Meta } = Card;

class BigCard extends Component{
    constructor(props){
        super(props)
        this.state={
            connect:false,
            f5_src: "templates/demo1.html",
            key: 1,
            recon_pic:''
        }
    }

    componentDidMount(){
      //定时轮询照片
      setInterval(this.handle.bind(this), 5000);
    }

    refresh = () => {
      this.setState({
        key: -this.state.key
    })
      console.log(this.state.key)
    };

    handle(){
      var url1="http://10.29.51.108:7007/get_color_base64"
      fetch(url1, {method : "POST"})
      .then(
        res => res.json()
      )
      .then(data1 =>{
        console.log("depth------new")
          this.setState({
            recon_pic : data1.value
          })
      })
      .catch(e => console.log('error', e))
    }


    static defaultProps = {
        src : "FloorPlan1_physics_01_img_24.png",
        width : {width : 400}
    }
    
    onTabChange = (key, type) => {
      console.log(key, type);
      this.setState({ [type]: key });
    };

    render(){
        return (
        <Card
            hoverable
            bordered = {true}
            style={this.props.width}
            cover={<iframe id="example"
                          key = {this.state.key}
                          title="Inline Frame Example"
                          frameborder="0"   
                          scrolling="no"
                          width="300"
                          height="390"
                          marginheight="3000" 
                          marginwidth="0"
                          //style = {{"position" : "absolute", "top": "-600px"}}
                          src={this.state.f5_src}
                          // src="http://127.0.0.1:5000/"
            />}
        >
            <Meta //avatar={<ConnectLogo url="http://10.29.51.108:7007/get_color_flow"/>} 
                  title={<>3D场景重构图　　　 　　　　　　　　　　 　　　　 　　 　　　 　　　　　 　　　 　　　　 　　　　　 　　　 　　　　 　　　　　 　　<ReloadOutlined type="primary" style = {{"color" : "#096dd9"}} onClick={this.refresh} /> </>}/>
        </Card>
        )
    }
}

export default BigCard

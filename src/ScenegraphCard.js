import React, {Component} from 'react'
import { Card } from 'antd';
import Force_chart from './ForceChart';
import NewForceChart from './NewForceChart';
import Test from './test';
import ConnectLogo from './ConnectLogo'
import Big_Force_chart from './BigForceChart';
import { Drawer, Button } from 'antd';
import {
    ZoomInOutlined,
  } from '@ant-design/icons';
const { Meta } = Card;

class ScenegraphCard extends Component{
    constructor(props){
        super(props)
        this.state={
            connect:false,
            visible:false
        }
    }

    static defaultProps = {
        src : "color_default.png",
        width : {width : 400}
    }

    showDrawer = () => {
        this.setState({
            visible:true
        })
    };

    onClose = () => {
        this.setState({
            visible:false
        })
    };

    render(){
        // ！！！！！！！！！！！！！！！！这下面的空格不要动，是全角符！！！！！！！！！！！！！！！！！！！！！
        return (
        <>
        <Card
            hoverable
            bordered = {true}
            style={this.props.width}
            cover={<NewForceChart width="400" height="300" ref_name="Small" force_type = "small"/>}
        >
            <Meta avatar={<ConnectLogo url="http://10.29.150.45:7007/get_sg"/>} title={<>Scene Graph　　　 　　　 　　　　 　　<ZoomInOutlined type="primary" style = {{"color" : "#096dd9"}} onClick={this.showDrawer} /> </>}/> 
        </Card>
        <Drawer
        // title={"Basic Drawer"}
        width={1370}
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
        >
        <Force_chart width="1500" height="900" ref_name="Big" force_type = "big"/>
      </Drawer>
      </>
        )
    }
}

export default ScenegraphCard

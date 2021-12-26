import React, {Component} from 'react'
import { Card } from 'antd';
import Force_chart from './ForceChart';
import NewForceChart from './NewForceChart';
import Test from './test';
import ConnectLogo from './ConnectLogo'
import Big_Force_chart from './BigForceChart';
import ForceGraph_3D from './ForceGraph_3D';
import { Drawer, Button } from 'antd';
import {message} from 'antd';
import ForceGraph_3D_big from './ForceGraph_3D_big';
import {
    ZoomInOutlined,
  } from '@ant-design/icons';
const { Meta } = Card;

class ScenegraphCard extends Component{
    constructor(props){
        super(props)
        this.state={
            connect : false,
            visible : false,
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
            cover={this.props.dim == "2d" ? <NewForceChart width="400" height="300" ref_name="Small" force_type = "small"/> : <ForceGraph_3D width="400" height="300" ref_name="Small" force_type = "small"/>}
        >
            <Meta avatar={<ConnectLogo url="http://10.29.150.45:7007/get_sg"/>} title={<>{this.props.card_name}　　　 　　　　　　　<ZoomInOutlined type="primary" style = {{"color" : "#096dd9"}} onClick={this.showDrawer} /> </>}/> 
        </Card>
        <Drawer
        // title={"Basic Drawer"}
        // <Force_chart width="1500" height="900" ref_name="Big" force_type = "big"/>
        width={1370}
        placement="right"
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
        // destroyOnClose = "true"
        // forceRender = "true"
        >
        <ForceGraph_3D_big width="1500" height="900"/>
      </Drawer>
      </>
        )
    }
}

export default ScenegraphCard

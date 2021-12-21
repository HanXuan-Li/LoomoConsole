import React, {Component} from 'react'
import { Card } from 'antd';
import ConnectLogo from './ConnectLogo'
const { Meta } = Card;



class VideoCard extends Component{
    constructor(props){
        super(props)
        this.state={
            connect:false
        }
    }

    static defaultProps = {
        src : "recon.jpg",
        style : {width : 400},
    }

    render(){
        return (
        <Card
            hoverable
            bordered = {true}
            style={this.props.style}
            cover={<img width = "400" height="300" src = {this.props.src} onError={(e)=>{e.target.onerror = null; e.target.src="recon.jpg"}} alt = "picturhaha"></img>}
        >
            <Meta 
            avatar={<ConnectLogo url={this.props.src}/>} 
            title={this.props.card_name}/>
        </Card>
        )
    }
}

export default VideoCard

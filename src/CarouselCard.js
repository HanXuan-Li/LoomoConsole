import React, {Component} from 'react'
import { Card, Carousel } from 'antd';
import ConnectLogo from './ConnectLogo'
const { Meta } = Card;



class CarouselCard extends Component{
    constructor(props){
        super(props)
        this.state={
            connect:false
        }
    }

    static defaultProps = {
        src1 : "color.jpg",
        src2 : "depth.jpg",
        style : {width : 400},
    }

    render(){
        const contentStyle = {
            // height: '160px',
            // color: '#fff',
            // lineHeight: '160px',
            // textAlign: 'center',
            // background: '#364d79',
        };

        return (
        <Card
            hoverable
            bordered = {true}
            style={this.props.style}
            cover={<Carousel autoplay>
                <div>
                <img width = "400" height="300" src = {this.props.src1} onError={(e)=>{e.target.onerror = null; e.target.src="color.jpg"}} alt = "picturhaha"></img>
                </div>
                <div>
                <img width = "400" height="300" src = {this.props.src2} onError={(e)=>{e.target.onerror = null; e.target.src="depth.jpg"}} alt = "picturhaha"></img>
                </div>
                </Carousel>}
        >

            <Meta 
            avatar={<ConnectLogo url={this.props.src}/>} 
            title={this.props.card_name}/>
        </Card>
        )
    }
}

export default CarouselCard

import React, {Component} from 'react'
import {
    WifiOutlined,
  } from '@ant-design/icons';


export default class ConnectLogo extends Component{
    constructor(props){
        super()
        this.state={
            connect : false
        }
    }

    componentDidMount(){
        setInterval(()=>{
            fetch(this.props.url)
            .then((response)=> {
                console.log(response)
                console.log("connect success")
                this.setState({
                    connect : true
                })
            })
            .catch((error)=> {
                console.log("connect failed")
                this.setState({
                    connect : false
                })
            })
            //console.log(this.state.connect)
        },5000)
    }

    render(){
        return(
            <WifiOutlined style={this.state.connect ? {'color':'#096dd9', fontSize: '20px'}:{'color':'red', fontSize: '20px'}}/>
        )
    }
}


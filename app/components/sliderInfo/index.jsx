import React from 'react';
import './sliderInfo.less';
import {Icon} from 'antd'
// import request from '../../utils/request';

class SliderInfo extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        // console.log("componentDidMount````,用户id是:"+ this.props.clickId);
        // console.log("准备发送请求");
        // const url = "http://192.168.217.233:18180/cdm-user-web/role/findAll";
        // fetch(url, {
        //     method: 'get'
        // }).then((result) => {
        //     console.log("发送请求收到响应了~~");
        //     console.log(result);
        // })
    }
    componentWillReceiveProps(nextProps){


    }

    render(){

        const sliderClass = "us_float_slider " + ( this.props.active ? "slider_open" : "slider_close");
        // let sliderClass = "us_float_slider"
        return (
            <div className={sliderClass}>
                <div className="header">
                    <span className="header_name">用户详情--Cookie</span>
                    <Icon className="header_close" type="close"/>
                </div>
                <div className="content">
                    <div className="us_panel">
                        <label>用户名:</label>
                        <div className="us_panel_info">
                            <span>Cookie</span>
                        </div>
                    </div>
                    <div className="us_panel">
                        <label>登录名:</label>
                        <div className="us_panel_info">
                            <span>chengduflw</span>
                        </div>
                    </div>
                    <div className="us_panel">
                        <label>所属系统:</label>
                        <div className="us_panel_info">
                            <span>CDM</span>
                        </div>
                    </div>
                    <div className="us_panel">
                        <label>IP地址:</label>
                        <div className="us_panel_info">
                            <span>192.168.243.145</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SliderInfo;
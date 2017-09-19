import React from 'react';
import { parseFullTime } from '../../utils/requestUrls'
import './sliderBar.less';
import { Icon} from 'antd'

const SliderBar = ( { userObj, closeSlider } ) => (
    <div className="us_float_slider slider_open">
        <div className="header">
            <span className="header_name">用户详情</span>
            <Icon className="header_close" type="close"
                onClick = { e => {
                    closeSlider()
                    e.preventDefault()
                    e.stopPropagation()
                }}
            />
        </div>
        <div className="content">
            <div className="us_panel">
                <label>用户名:</label>
                <div className="us_panel_info">
                    <span>{userObj.username || ""}</span>
                </div>
            </div>
            <div className="us_panel">
                <label>IP:</label>
                <div className="us_panel_info">
                    <span>{userObj.ipAddress || ""}</span>
                </div>
            </div>
            <div className="us_panel">
                <label>所属系统:</label>
                <div className="us_panel_info">
                    <span>{userObj.system || ""}</span>
                </div>
            </div>
            <div className="us_panel">
                <label>所属平台:</label>
                <div className="us_panel_info">
                    <span>{userObj.systemAdditionProp || ""}</span>
                </div>
            </div>
            <div className="us_panel">
                <label>登录时间:</label>
                <div className="us_panel_info">
                    <span>{parseFullTime(userObj.loginTime)}</span>
                </div>
            </div>
            <div className="us_panel">
                <label>上传时间:</label>
                <div className="us_panel_info">
                    <span>{parseFullTime(userObj.uploadTime)}</span>
                </div>
            </div>
            <div className="us_panel">
                <label>主备信息:</label>
                <div className="us_panel_info">
                    <span>{userObj.systemType || ""}</span>
                </div>
            </div>
            <div className="us_panel">
                <label>客户端版本:</label>
                <div className="us_panel_info">
                    <span>{userObj.clientVersion || ""}</span>
                </div>
            </div>
            <div className="us_panel">
                <label>浏览器版本:</label>
                <div className="us_panel_info">
                    <span>{userObj.browserVersion || ""}</span>
                </div>
            </div>
        </div>
    </div>
)

export default SliderBar;
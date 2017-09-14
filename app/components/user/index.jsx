import React from 'react'
import { Icon, Row, Col, Modal, Checkbox, Button} from 'antd'
import { sendLogoutUrl, sendRefreshUrl } from '../../utils/requestUrls'

import "./user.less"

const User = ({ user, forceLogout, forceRefresh, selectedUser}) => {
    const onClickLogout = (e) => {
        const token = user.token;
        const username = user.username;
        Modal.confirm({
            title: '确定强制退出用户'+username+'?',
            onOk(){
                sendLogout(token, username);
            }
        });
        e.stopPropagation();
        e.preventDefault();
    }

    const onClickRefresh = (e) => {
        const token = user.token;
        const username = user.username;
        Modal.confirm({
            title: '确定强制刷新用户'+username+'?',
            onOk(){
                sendRefresh(token, username);
            }
        });
        e.stopPropagation();
        e.preventDefault();
    }

    const sendLogout = (token, username) => {
        fetch(sendLogoutUrl,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            body: "tokens=" + token
        }).then(function(res) {
            res.json().then(function (json) {
                if(json.hasOwnProperty("error")){
                    // const msg = json.error.msg || "";
                    Modal.error({
                        title: "退出失败，用户"+username+"不存在!"
                    })
                }else{
                    Modal.success({
                        title: "用户"+username+"退出成功!"
                    })
                    forceLogout(token);
                }
            })
        })
    }

    const sendRefresh = (token, username) => {
        fetch(sendRefreshUrl,{
            mode: 'cors',
            method: 'POST',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            body: "tokens=" + token
        }).then(function(res) {
            res.json().then(function (json) {
                if(json.hasOwnProperty("error")){
                    Modal.error({
                        title: "刷新失败，用户"+username+"不存在!"
                    })
                    forceRefresh(token)
                }else{
                    Modal.success({
                        title: "用户"+username+"刷新成功!"
                    })
                }
            })
        })
    }

    return(
        <Row className="us_user" onClick={e => {
            selectedUser(user.token);
            e.preventDefault();
            e.stopPropagation();
        }}>
            <Col xl={24} lg={24} md={24}>
                <Col xl={4} lg={4} md={4}>
                    <Icon className={user.online ? "us_user_icon online" : "us_user_icon offline"} type='team' />
                </Col>
                <Col xl={17} lg={17} md={17}>
                    <div className="us_user_name" title={user.username}>{user.username}</div>
                    <div className="us_user_ip">IP：{user.ipAddress}</div>
                    <div className="us_user_client">
                        版本号：{user.clientVersion}
                    </div>
                    <div className="us_user_client">
                        主备：{user.sysetemType}
                    </div>
                    <div className="us_user_client">
                        <Icon type="chrome"/>
                        ：{user.browserVersion}
                    </div>

                </Col>
                <Col xl={1} lg={1} md={1}>
                    <Checkbox
                    className="user_checkbox"
                    checked={user.isActived}
                />

                </Col>
            </Col>
            <Col lg={24} md={24}>
                <div className="us_user_options">
                <span onClick = {onClickRefresh} >
                    <Icon type="reload" />
                    强制刷新
                </span>
                <span onClick = {onClickLogout} >
                    <Icon type="logout" />
                    强制退出
                </span>
                </div>
            </Col>
        </Row>
    )
}


export default User;
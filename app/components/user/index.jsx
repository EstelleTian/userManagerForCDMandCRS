import React from 'react'
import { Icon, Row, Col, Modal, Checkbox, Button} from 'antd'
import { sendLogoutUrl, sendRefreshUrl, getUserByTokenUrl, parseHalfFullTime } from '../../utils/requestUrls'
import $ from 'jquery'
import "./user.less"

const User = ({ user, forceLogout, forceRefresh, selectedUser, toggleSlider}) => {
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
        // fetch(sendLogoutUrl,{
        //     mode: 'cors',
        //     method: 'POST',
        //     headers:{
        //         'content-type':'application/x-www-form-urlencoded'
        //     },
        //     body: "tokens=" + token
        // }).then(function(res) {
        //     res.json().then(function (json) {
        //         if(json.hasOwnProperty("error")){
        //             // const msg = json.error.msg || "";
        //             Modal.error({
        //                 title: "退出失败，用户"+username+"不存在!"
        //             })
        //         }else{
        //             Modal.success({
        //                 title: "用户"+username+"退出成功!"
        //             })
        //             forceLogout(token);
        //         }
        //     })
        // })
        $.ajax({
            url: sendLogoutUrl,
            data: "tokens=" + token,
            type: 'post',
            dataType: 'json',
            success: function(json){
                if(json.hasOwnProperty("error")){
                    Modal.error({
                        title: "退出失败，用户"+username+"不存在!"
                    })
                }else{
                    Modal.success({
                        title: "用户"+username+"退出成功!"
                    })
                    forceLogout(token);
                }
            },
            error: function(err){
                console.error(err);
            }
        })

    }

    const sendRefresh = (token, username) => {
        // fetch(sendRefreshUrl,{
        //     mode: 'cors',
        //     method: 'POST',
        //     headers:{
        //         'content-type':'application/x-www-form-urlencoded'
        //     },
        //     body: "tokens=" + token
        // }).then(function(res) {
        //     res.json().then(function (json) {
        //         if(json.hasOwnProperty("error")){
        //             Modal.error({
        //                 title: "刷新失败，用户"+username+"不存在!"
        //             })
        //         }else{
        //             Modal.success({
        //                 title: "用户"+username+"刷新成功!"
        //             })
        //             forceRefresh(token)
        //         }
        //     })
        // })
        $.ajax({
            url: sendRefreshUrl,
            data: "tokens=" + token,
            type: 'post',
            dataType: 'json',
            success: function(json){
                if(json.hasOwnProperty("error")){
                    Modal.error({
                        title: "刷新失败，用户"+username+"不存在!"
                    })
                }else{
                    Modal.success({
                        title: "用户"+username+"刷新成功!"
                    })
                    forceRefresh(token)
                }
            },
            error: function(err){
                console.error(err);
            }
        })

    }

    const toggleUserInfo = (token) => {
        let url = getUserByTokenUrl+"?token="+token
        // fetch(url,{
        //     method: 'get',
        //     mode: 'cors',
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     }
        // }).then(res => {
        //     res.json().then(json => {
        //         if(json.hasOwnProperty("warn")){
        //             Modal.error({
        //                 title: "获取用户信息失败，用户不存在!"
        //             })
        //         }else{
        //             toggleSlider(json);
        //         }
        //     })
        // })
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function(json){
                if(json.hasOwnProperty("warn")){
                    Modal.error({
                        title: "获取用户信息失败，用户不存在!"
                    })
                }else{
                    toggleSlider(json);
                }
            },
            error: function(err){
                console.error(err);
            }
        })
        // const json = {
        //     generateTime: "201709151348",
        //     status: 200,
        //     token: "chongqingdev2|127.0.0.2|CRSZWWW|dcb6819f01b340b2a41bc61e78dbccc2-chongqingdev2",
        //     loginTime: "20170914101307",
        //     clientVersion: "V20170907",
        //     browserVersion: "60.0.3112.78",
        //     ipAddress: "127.0.0.2",
        //     username: "chongqingdev2",
        //     system: "CRS",
        //     systemType: "CRS.SW.MASTER",
        //     systemAdditionProp: "CRSZWWW",
        //     uploadTime: "20170914101307"
        // }
        // toggleSlider(json);

    }

    return(
        <Row className="us_user" onClick={e=>{
            toggleUserInfo(user.token);
            e.preventDefault();
            e.stopPropagation();
        }}>
            <Col span={24}>
                <Col span={4}>
                    <Icon className={user.online ? "us_user_icon online" : "us_user_icon offline"} type='team' />
                </Col>
                <Col span={17}>
                    <div className="us_user_name" title={user.username}>{user.username}</div>
                    <div>IP：{user.ipAddress}</div>
                    <div>
                        <Icon type="clock-circle-o" />：
                        <span className="us_user_loginTime">{parseHalfFullTime(user.loginTime)}</span>
                    </div>
                </Col>
                <Col span={1}>
                    <Checkbox
                    className="user_checkbox"
                    checked = { user.isActived }
                    onClick = {e => {
                        selectedUser(user.token);
                        e.stopPropagation()
                    }}
                />

                </Col>
            </Col>
            <Col lg={24} md={24}>
                <div className="us_user_options">
                <span onClick = {onClickRefresh} >
                    <Icon type="login" />
                    重新登录
                </span>
                <span onClick = {onClickLogout} >
                    <Icon type="logout" />
                    退出
                </span>
                </div>
            </Col>
        </Row>
    )
}


export default User;
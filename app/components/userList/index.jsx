import React from 'react';
import { Row, Col, Input, Button, Modal } from 'antd';
import PlatformList from "./platformList";
import SliderBar from '../sliderBar';
import { getUserListUrl, sendLogoutUrl, sendRefreshUrl } from '../../utils/requestUrls'
import './userList.less'
import $ from 'jquery'

const Search = Input.Search;

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.converUserList = this.converUserList.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.onClickMultiLogout = this.onClickMultiLogout.bind(this);
        this.onClickMultiRefresh = this.onClickMultiRefresh.bind(this);
        this.onClickSelectAllUser = this.onClickSelectAllUser.bind(this);
        this.retrieveUserList = this.retrieveUserList.bind(this);
    }

    componentDidMount(){
        const that = this;
        that.retrieveUserList();
        setInterval(function(){
            that.retrieveUserList();
        }, 1000*60);
    }

    converUserList(userList){
        let list = {};
        let {filterKey} = this.props;
        if(filterKey.trim() == ""){
            return list;
        }
        for(let platform in userList){
            if( !list.hasOwnProperty(platform) ){
                list[platform] = [];
            }
            const plt = userList[platform];
            for(let index = 0; index < plt.length; index++){
                const user = plt[index];
                if(filterKey != "all"){
                    let isShow = false;
                    for(let key in user){
                        let str = user[key]+"";
                        str = str.toLowerCase();
                        filterKey = filterKey.toLowerCase()+"";
                        if(str.indexOf(filterKey) > -1){
                            isShow = true;
                            break;
                        }
                    }
                    if(isShow){
                        list[platform].push(user);
                    }
                }else{
                    list[platform].push(user);
                }
            }
        }
        return list;
    }

    retrieveUserList(){
        const { updateUserList } = this.props;
        // fetch(getUserListUrl,{
        //     method: 'get',
        //     mode: 'cors',
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     }
        // }).then((res) => {
        //     res.json().then(json => {
        //         if(json.hasOwnProperty("warn")){
        //             updateUserList({});
        //         }else{
        //             const userList = json.onlineUserMap || {};
        //             updateUserList(userList);
        //         }
        //
        //     })
        // })
        $.ajax({
            url: getUserListUrl,
            type: 'GET',
            dataType: 'json',
            success: function(json){
                if(json.hasOwnProperty("warn")){
                    updateUserList({});
                }else{
                    const userList = json.onlineUserMap || {};
                    updateUserList(userList);
                }
            },
            error: function(err){
                console.error(err);
            }
        })
        // let userList = {
        //     CRSZWWW: [
        //         {
        //             status: 0,
        //             token: "1chongqingdev3|127.0.0.3|CRSZWWW|dcb6819f02b340b2a41bc61e78dbccc3-chongqingdev3",
        //             loginTime: "20170914101307",
        //             ipAddress: "127.0.0.3",
        //             username: "chongqingdev3"
        //         },
        //         {
        //             status: 0,
        //             token: "111",
        //             loginTime: "20170914101307",
        //             ipAddress: "20170914101307",
        //             username: "chongqingdev2"
        //         },
        //         {
        //             status: 0,
        //             token: "3chongqingdev1|127.0.0.1|CRSZWWW|dcb6819f05b340b2a41bc61e78dbccc1-chongqingdev1",
        //             loginTime: "20170914101307",
        //             ipAddress: "127.0.0.1",
        //             username: "chongqingdev1"
        //         }
        //     ],
        //     CRSZPPP: [
        //         {
        //             status: 0,
        //             token: "32chongqingdev3|127.0.0.3|CRSZWWW|dcb6819f02b340b2a41bc61e78dbccc3-chongqingdev3",
        //             loginTime: "20170914101307",
        //             ipAddress: "127.0.0.3",
        //             username: "chongqingdev3"
        //         },
        //         {
        //             status: 0,
        //             token: "1123",
        //             loginTime: "20170914101307",
        //             ipAddress: "127.0.0.2",
        //             username: "chongqingdev2"
        //         },
        //         {
        //             status: 0,
        //             token: "33chongqingdev1|127.0.0.1|CRSZWWW|dcb6819f05b340b2a41bc61e78dbccc1-chongqingdev1",
        //             loginTime: "20170914101307",
        //             ipAddress: "127.0.0.1",
        //             username: "chongqingdev1"
        //         }
        //     ],
        //     CDMZUUU: [
        //         {
        //             status: 0,
        //             token: "chongqingdev3|127.0.0.3|CRSZWWW|dcb6819f02b340b2a41bc61e78dbccc3-chongqingdev3",
        //             loginTime: "20170914101307",
        //             ipAddress: "127.0.0.3",
        //             username: "chongqingdev3"
        //         },
        //         {
        //             status: 0,
        //             token: "111",
        //             loginTime: "20170914101307",
        //             ipAddress: "127.0.0.2",
        //             username: "chongqingdev2"
        //         },
        //         {
        //             status: 0,
        //             token: "chongqingdev1|127.0.0.1|CRSZWWW|dcb6819f05b340b2a41bc61e78dbccc1-chongqingdev1",
        //             loginTime: "20170914101307",
        //             ipAddress: "127.0.0.1",
        //             username: "chongqingdev1"
        //         }
        //     ],
        //     CDMZUCK: [
        //             {
        //                 status: 0,
        //                 token: "chongqingdev3|127.0.0.3|CRSZWWW|dcb6819f02b340b2a41bc61e78dbccc3-chongqingdev3",
        //                 loginTime: "20170914101307",
        //                 ipAddress: "127.0.0.3",
        //                 username: "chongqingdev3"
        //             },
        //             {
        //                 status: 0,
        //                 token: "111",
        //                 loginTime: "20170914101307",
        //                 ipAddress: "127.0.0.2",
        //                 username: "chongqingdev2"
        //             },
        //             {
        //                 status: 0,
        //                 token: "chongqingdev1|127.0.0.1|CRSZWWW|dcb6819f05b340b2a41bc61e78dbccc1-chongqingdev1",
        //                 loginTime: "20170914101307",
        //                 ipAddress: "127.0.0.1",
        //                 username: "chongqingdev1"
        //             }
        //         ]
        // }
        // updateUserList(userList);
    }

    handleRefresh(){
        this.retrieveUserList();
    }


    onClickMultiLogout(e){
        const { userList, forceLogout } = this.props;
        let tokens = [];
        let names = [];
        for(let platform in userList){
            const userArr = userList[platform]
            userArr.map( user => {
                if(user.isActived){
                    tokens.push(user.token);
                    names.push(user.username);
                }
            })
        }
        const tokensStr = tokens.join(',');
        const namesStr = names.join(',');
        if(tokensStr.length > 0){
            Modal.confirm({
                title: '确定批量退出用户'+namesStr+'?',
                onOk(){
                    // fetch(sendLogoutUrl,{
                    //     mode: 'cors',
                    //     method: 'post',
                    //     headers: {
                    //         "Content-Type": "application/x-www-form-urlencoded"
                    //     },
                    //     body: "tokens=" + tokensStr
                    // }).then(function(res) {
                    //     res.json().then(function (json) {
                    //         if(json.hasOwnProperty("error")){
                    //             let msg = json.error.message || "";
                    //             const tokenArr = msg.split(",");
                    //             let invalidNames = [];
                    //             for(let i=0,len=tokenArr.length; i<len; i++){
                    //                 const token = tokenArr[i];
                    //                 const index = tokens.indexOf(token);
                    //                 if(index > -1){
                    //                     invalidNames.push(names[index]);
                    //                 }
                    //             }
                    //             const invalidNamesStr = invalidNames.join(",");
                    //             Modal.warn({
                    //                 title: "批量退出用户"+invalidNamesStr+"失败，因用户不存在。其余用户刷新成功！"
                    //             })
                    //         }else{
                    //             Modal.success({
                    //                 title: "批量退出用户"+namesStr+"成功"
                    //             })
                    //             forceLogout(tokens);
                    //         }
                    //     })
                    // })
                    $.ajax({
                        url: sendLogoutUrl,
                        data: "tokens=" + tokensStr,
                        type: 'post',
                        dataType: 'json',
                        success: function(json){
                            if(json.hasOwnProperty("error")){
                                let msg = json.error.message || "";
                                const tokenArr = msg.split(",");
                                let invalidNames = [];
                                for(let i=0,len=tokenArr.length; i<len; i++){
                                    const token = tokenArr[i];
                                    const index = tokens.indexOf(token);
                                    if(index > -1){
                                        invalidNames.push(names[index]);
                                    }
                                }
                                const invalidNamesStr = invalidNames.join(",");
                                Modal.warn({
                                    title: "批量退出用户"+invalidNamesStr+"失败，因用户不存在。其余用户刷新成功！"
                                })
                            }else{
                                Modal.success({
                                    title: "批量退出用户"+namesStr+"成功"
                                })
                                forceLogout(tokens);
                            }
                        },
                        error: function(err){
                            console.error(err);
                        }
                    })

                }
            });
        }else{
            Modal.warn({
                title: '请选择要退出的用户?'
            });
        }

        e.stopPropagation();
        e.preventDefault();
    }

    onClickMultiRefresh(e){
        const { userList, forceRefresh } = this.props;
        let tokens = [];
        let names = [];
        for(let platform in userList){
            const userArr = userList[platform]
            userArr.map( user => {
                if(user.isActived){
                    tokens.push(user.token);
                    names.push(user.username);
                }
            })
        }
        const tokensStr = tokens.join(',');
        const namesStr = names.join(',');
        if(tokensStr.length > 0){
            Modal.confirm({
                title: '确定批量刷新用户'+namesStr+'?',
                onOk(){
                    // fetch(sendRefreshUrl,{
                    //     mode: 'cors',
                    //     method: 'post',
                    //     headers: {
                    //         "Content-Type": "application/x-www-form-urlencoded"
                    //     },
                    //     body: "tokens=" + tokensStr
                    // }).then(function(res) {
                    //     res.json().then(function (json) {
                    //         if(json.hasOwnProperty("error")){
                    //             let msg = json.error.message || "";
                    //             const tokenArr = msg.split(",");
                    //             let invalidNames = [];
                    //             for(let i=0,len=tokenArr.length; i<len; i++){
                    //                 const token = tokenArr[i];
                    //                 const index = tokens.indexOf(token);
                    //                 if(index > -1){
                    //                     invalidNames.push(names[index]);
                    //                 }
                    //             }
                    //             const invalidNamesStr = invalidNames.join(",");
                    //             Modal.warn({
                    //                 title: "批量刷新用户"+invalidNamesStr+"失败，因用户不存在。其余用户刷新成功！"
                    //             })
                    //         }else{
                    //             Modal.success({
                    //                 title: "批量刷新用户"+namesStr+"成功"
                    //             })
                    //             forceRefresh(tokens);
                    //         }
                    //     })
                    // })
                    $.ajax({
                        url: sendRefreshUrl,
                        data: "tokens=" + tokensStr,
                        type: 'post',
                        dataType: 'json',
                        success: function(json){
                            if(json.hasOwnProperty("error")){
                                let msg = json.error.message || "";
                                const tokenArr = msg.split(",");
                                let invalidNames = [];
                                for(let i=0,len=tokenArr.length; i<len; i++){
                                    const token = tokenArr[i];
                                    const index = tokens.indexOf(token);
                                    if(index > -1){
                                        invalidNames.push(names[index]);
                                    }
                                }
                                const invalidNamesStr = invalidNames.join(",");
                                Modal.warn({
                                    title: "批量刷新用户"+invalidNamesStr+"失败，因用户不存在。其余用户刷新成功！"
                                })
                            }else{
                                Modal.success({
                                    title: "批量刷新用户"+namesStr+"成功"
                                })
                                forceRefresh(tokens);
                            }
                        },
                        error: function(err){
                            console.error(err);
                        }
                    })
                }
            });
        }else{
            Modal.warn({
                title: '请选择要刷新的用户?'
            });
        }

        e.stopPropagation();
        e.preventDefault();
    }
    onClickSelectAllUser(e){
        const { userList ,selectedUser } = this.props;
        let selectList = userList;
        for(let platform in selectList){
            const userArr = userList[platform]
            userArr.map( user => {
                selectedUser(user.token);
            })
        }
    }
    render(){
        const { forceLogout, forceRefresh, selectedUser, toggleSlider, closeSlider, filterList, userList, sliderBar } = this.props;
        const newUserList = this.converUserList(userList);
        const list = Object.keys(newUserList);
        const visible = sliderBar.visible;
        return(
            <div className="us_cantainer">
                <Row className="filter_container">
                    <Col lg={5} md={5}>
                        <Search ref="us_search" className="us_search"
                            placeholder="自定义查询"
                            size="large"
                            onSearch={(inputVal) => {

                                filterList(inputVal);
                            }}
                            onKeyUp={() => {
                                const inputVal = this.refs.us_search.input.refs.input.value
                                filterList(inputVal);

                            }}
                        />
                    </Col>
                    <Col lg={1} md={2} xs={3} className="opt_btn">
                        <Button type="primary" onClick={this.handleRefresh}>刷新列表</Button>
                    </Col>
                    <Col lg={1} md={2} xs={3} className="opt_btn">
                        <Button type="primary" onClick={this.onClickMultiRefresh}>批量刷新</Button>
                    </Col>
                    <Col lg={1} md={2} xs={3} className="opt_btn">
                        <Button type="primary" onClick={this.onClickMultiLogout}>批量退出</Button>
                    </Col>
                    <Col lg={1} md={2} xs={3} className="opt_btn">
                        <Button type="primary" onClick = {this.onClickSelectAllUser} >全选用户</Button>
                    </Col>
                </Row>
                <Row className="no_margin">
                    {list.length ?
                        list.map(platform =>
                            newUserList[platform].length ?
                            <Col key={platform} span={24}  className="us_platform">
                                <Col xl={1} lg={2} md={2} className="us_platform_name">
                                    <div>{platform}</div>
                                </Col>
                                <Col xl={22} lg={22} md={22}>
                                    <PlatformList
                                        list = {newUserList[platform]}
                                        forceLogout = {forceLogout}
                                        forceRefresh = {forceRefresh}
                                        selectedUser = {selectedUser}
                                        toggleSlider = {toggleSlider}
                                    ></PlatformList>
                                </Col>
                            </Col> : ""
                        ) :
                        <div className="us_no_datas">暂无用户数据</div>
                    }
                    {
                        visible ? <SliderBar userObj = { sliderBar.userObj } closeSlider={closeSlider} />: ""
                    }
                </Row>


            </div>
        )
    }
}


export default UserList;
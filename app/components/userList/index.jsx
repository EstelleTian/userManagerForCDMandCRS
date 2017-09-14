import React from 'react';
import { Row, Col, Input, Button, Modal } from 'antd';
import SystemList from './systemList';
import { getUserListUrl, sendLogoutUrl, sendRefreshUrl } from '../../utils/requestUrls'
import './userList.less'

const Search = Input.Search;

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.converUserList = this.converUserList.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.onClickMultiLogout = this.onClickMultiLogout.bind(this);
        this.onClickMultiRefresh = this.onClickMultiRefresh.bind(this);
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
        for(let i=0; i<userList.length; i++){
            const user = userList[i];
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
                if(!isShow){
                    continue;
                }
            }
            const userSystem = user.system || "";
            if(userSystem != ""){
                if( !list.hasOwnProperty(userSystem) ){
                    list[userSystem] = {};
                }
            }
            const userPlatform = user.systemAdditionProp || "";
            if(userPlatform != ""){
                if( list[userSystem].hasOwnProperty(userPlatform) ){
                    list[userSystem][userPlatform].push(user);
                }else{
                    list[userSystem][userPlatform] = [user];
                }
            }
        }
        return list;
    }

    retrieveUserList(){
        const { updateUserList } = this.props;
        fetch(getUserListUrl,{
            method: 'get',
            mode: 'cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res) => {
            res.json().then(json => {
                if(json.hasOwnProperty("warn")){
                    updateUserList([]);
                }else{
                    const userList = json.onLineUserResultList || [];
                    updateUserList(userList);
                }

            })
        })
        // const userList = [
        //     {
        //         status: 0,
        //         token: "chengdudev|127.0.0.1|CRSZUUU|41e68719eeed4d69bc942a9b731dbd1f-chengdudev",
        //         clientVersion: "V20170824",
        //         browserVersion: "60.0.3112.78",
        //         ipAddress: "127.0.0.1",
        //         username: "chengdudev",
        //         system: "CRS",
        //         sysetemType: "CRS.SW.MASTER",
        //         systemAdditionProp: "CRSZUUU"
        //     },
        //     {
        //         status: 0,
        //         token: "chengdudev|227.0.0.1|CRSZPPP|41e68719eeed4d69bc942a9b731dbd1f-chengdudev",
        //         clientVersion: "V20170824",
        //         browserVersion: "60.0.3112.78",
        //         ipAddress: "227.0.0.1",
        //         username: "chengdudev",
        //         system: "CRS",
        //         sysetemType: "CRS.SW.MASTER",
        //         systemAdditionProp: "CRSZPPP"
        //     },
        //     {
        //         status: 0,
        //         token: "chengdudev|327.0.0.1|CDMZUUU|41e68719eeed4d69bc942a9b731dbd1f-chengdudev",
        //         clientVersion: "V20170824",
        //         browserVersion: "60.0.3112.78",
        //         ipAddress: "327.0.0.1",
        //         username: "chengdudev",
        //         system: "CDM",
        //         sysetemType: "CRS.SW.MASTER",
        //         systemAdditionProp: "CDMZUUU"
        //     },
        //     {
        //         status: 0,
        //         token: "chengdudev|427.0.0.1|CDMZUCK|41e68719eeed4d69bc942a9b731dbd1f-chengdudev",
        //         clientVersion: "V20170824",
        //         browserVersion: "60.0.3112.78",
        //         ipAddress: "427.0.0.1",
        //         username: "chengdudev",
        //         system: "CDM",
        //         sysetemType: "CRS.SW.MASTER",
        //         systemAdditionProp: "CDMZUCK"
        //     }
        // ];
        // updateUserList(userList);
    }

    handleRefresh(){
        this.retrieveUserList();
    }


    onClickMultiLogout(e){
        const { userList, forceLogout } = this.props;
        let tokens = [];
        let names = [];
        userList.map( user => {
            if(user.isActived){
                tokens.push(user.token);
                names.push(user.username);
            }
        })
        const tokensStr = tokens.join(',');
        const namesStr = names.join(',');
        if(tokensStr.length > 0){
            Modal.confirm({
                title: '确定批量退出用户'+namesStr+'?',
                onOk(){
                    fetch(sendLogoutUrl,{
                        mode: 'cors',
                        method: 'post',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "tokens=" + tokensStr
                    }).then(function(res) {
                        res.json().then(function (json) {
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
                        })
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
        userList.map( user => {
            if(user.isActived){
                tokens.push(user.token);
                names.push(user.username);
            }
        })
        const tokensStr = tokens.join(',');
        const namesStr = names.join(',');
        if(tokensStr.length > 0){
            Modal.confirm({
                title: '确定批量刷新用户'+namesStr+'?',
                onOk(){
                    fetch(sendRefreshUrl,{
                        mode: 'cors',
                        method: 'post',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "tokens=" + tokensStr
                    }).then(function(res) {
                        res.json().then(function (json) {
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
                        })
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
    render(){
        const { forceLogout, forceRefresh, selectedUser, filterList, userList } = this.props;
        const newUserList = this.converUserList(userList);
        const list = Object.keys(newUserList);
        return(
            <div className="us_cantainer">
                <Row className="filter_container">
                    <Col lg={5} md={5}>
                        <Search ref="us_search" className="us_search"
                            placeholder="自定义查询"
                            size="large"
                            onSearch={(inputVal) => {
                                // console.log("点击了搜索的提交按钮,输入的值是:" + inputVal);
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
                </Row>
                <Row className="no_margin">
                    {list.length ?
                        list.map(system =>
                            <Col lg={24} md={24} key={system} className="us_system">
                                <div className="us_system_name">{system}</div>
                                <SystemList
                                    forceLogout = {forceLogout}
                                    forceRefresh = {forceRefresh}
                                    selectedUser = {selectedUser}
                                    list={newUserList[system]}
                                />
                            </Col>
                        ) :
                        <div className="us_no_datas">暂无用户数据</div>
                    }
                </Row>

                {/*<SliderInfo {...detailInfo} />*/}
            </div>
        )
    }
}


export default UserList;
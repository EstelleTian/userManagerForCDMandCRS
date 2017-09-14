import React from 'react';
import { Col } from 'antd';
import PlatformList from "./platformList";

const SystemList = ({list, forceLogout, forceRefresh, selectedUser}) => {
    return(
        <div>
            {
                Object.keys(list).map( platform =>
                    <Col key={platform} xl={24} lg={24} md={24}>
                        <Col xl={2} lg={2} md={3} className="us_platform_name">
                            <div>{platform}</div>
                        </Col>
                        <Col xl={22} lg={22} md={21}>
                            <PlatformList
                                list = {list[platform]}
                                forceLogout = {forceLogout}
                                forceRefresh = {forceRefresh}
                                selectedUser = {selectedUser}
                            ></PlatformList>
                        </Col>
                    </Col>
                )
            }
        </div>
    )
}

export default SystemList
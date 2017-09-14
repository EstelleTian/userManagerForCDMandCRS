import React from 'react'
import { Col } from 'antd'
import User from "../user"

const PlatformList = ({list, forceLogout, forceRefresh, selectedUser}) => (
    <div>
        {
            Object.keys(list).map( user =>
                <Col key={user} xl={4} lg={6} md={8}>
                    <User
                        user = {list[user]}
                        forceLogout = {forceLogout}
                        forceRefresh = {forceRefresh}
                        selectedUser = {selectedUser}
                    ></User>
                </Col>

            )
        }
    </div>

)

export default PlatformList
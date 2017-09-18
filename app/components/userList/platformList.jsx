import React from 'react'
import { Col } from 'antd'
import User from "../user"

const PlatformList = ({list, forceLogout, forceRefresh, selectedUser, toggleSlider}) =>{
    return (
        <div>
            {
                list.map( user =>
                    <Col key={user.token} xl={3} lg={5} md={6}>
                        <User
                            user = {user}
                            forceLogout = {forceLogout}
                            forceRefresh = {forceRefresh}
                            selectedUser = {selectedUser}
                            toggleSlider = {toggleSlider}
                        ></User>
                    </Col>

                )
            }
        </div>
    )
}

export default PlatformList
export const forceLogout = token => ({
    type: 'LOGOUT',
    token,
})
export const forceRefresh = token => ({
    type: 'REFRESH',
    token,
})
export const updateUserList = userList => ({
    type: "UPDATE_USERLIST",
    userList
})

export const resetStatus = () => ({
    type: "RESET_STATUS"
})

export const selectedUser = token => ({
    type: "SELECTED_USER",
    token
})

export const filterList = text => ({
    type: "FILTER_LIST",
    text
})

export const toggleSlider = userObj => ({
    type: "TOGGLE_SLIDER",
    userObj
})
export const closeSlider = () => ({
    type: "CLOSE_SLIDER"
})


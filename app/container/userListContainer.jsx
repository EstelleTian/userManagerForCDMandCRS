import { connect } from 'react-redux'
import { forceLogout, forceRefresh, filterList, updateUserList, selectedUser, resetStatus, toggleSlider, closeSlider } from '../actions'
import UserList from '../components/userList'

const mapStateToProps = (state) => {
    const filterKey = state.filterKey;
    return state;
}

const mapDispatchToProps = {
    forceLogout: forceLogout,
    forceRefresh: forceRefresh,
    filterList: filterList,
    updateUserList: updateUserList,
    selectedUser: selectedUser,
    resetStatus: resetStatus,
    toggleSlider: toggleSlider,
    closeSlider: closeSlider
}


const UserListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)

export default UserListContainer
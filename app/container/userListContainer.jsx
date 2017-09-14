import { connect } from 'react-redux'
import { forceLogout, forceRefresh, filterList, updateUserList, selectedUser, resetStatus } from '../actions'
import UserList from '../components/userList'

const mapStateToProps = (state) => {
    const filterKey = state.filterKey;
    // console.log("查询字段是:" + filterKey);
    return state;
}

const mapDispatchToProps = {
    forceLogout: forceLogout,
    forceRefresh: forceRefresh,
    filterList: filterList,
    updateUserList: updateUserList,
    selectedUser: selectedUser,
    resetStatus: resetStatus
}


const UserListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)

export default UserListContainer
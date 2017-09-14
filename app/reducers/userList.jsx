
const userList = ( state = [], action) => {
    switch (action.type){
        case "LOGOUT" : case "REFRESH" : {
            let newUserList = [];
            state.map(user=>{
                if( action.token.indexOf(user.token) == -1 ){
                    newUserList.push(user);
                }
            })
            return newUserList;
        }
        case "UPDATE_USERLIST" : {
            const newUserList = action.userList;
            for(let i=0, len=newUserList.length; i<len; i++){
                const newUser = newUserList[i];
                newUser['online'] = true;
                newUser['isActived'] = false;
            }
            return newUserList
        }
        case "SELECTED_USER" : {
            let newUserList = [];
            state.map( user => {
                if(user.token == action.token){
                    user.isActived = !user.isActived;
                }
                newUserList.push(user);
            })
            return newUserList;
        }
        case "RESET_STATUS" : {
            let newUserList = [];
            state.map( user => {
                user['online'] = true;
                user['isActived'] = false;
                newUserList.push(user);
            })
            return newUserList;
        }
        default:
            return state
    }
}

export default userList;

const userList = ( state = [], action) => {
    switch (action.type){
        case "LOGOUT" : case "REFRESH" : {
            let list = {};
            for(let platform in state){
                if( !list.hasOwnProperty(platform) ){
                    list[platform] = [];
                }
                const userList = state[platform];
                userList.map( user => {
                    if( action.token.indexOf(user.token) == -1){
                        list[platform].push(user);
                    }
                })
            }
            return list;
        }
        case "UPDATE_USERLIST" : {
            let userList = action.userList
            for(let platform in userList){
                let plt = userList[platform];
                for(let index = 0; index < plt.length; index++){
                    let user = plt[index];
                    user['online'] = true;
                    user['isActived'] = false;
                }
            }
            return userList;
        }
        case "SELECTED_USER" : {
            let list = {};
            for(let platform in state){
                if( !list.hasOwnProperty(platform) ){
                    list[platform] = [];
                }
                let userList = state[platform];
                userList.map( user => {
                    if(user.token == action.token){
                        user.isActived = !user.isActived;
                    }
                    list[platform].push(user);
                })
            }
            return list;
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
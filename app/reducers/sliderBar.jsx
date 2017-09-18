const initInfo = {
	visible: false,
    userObj: {
		token: ""
	}
};
const sliderBar = (state = initInfo, action) => {
	switch (action.type){
		case "TOGGLE_SLIDER" : {
			if(!state.visible){
				return {
                    visible: true,
                    userObj : action.userObj
				}
			}else{
				if(action.userObj.token == state.userObj.token){
                    return {
                        visible: false,
                        userObj: state.userObj
                    }
				}else{
                    return {
                        visible: true,
                        userObj : action.userObj
                    }
				}
			}
		}
		case "CLOSE_SLIDER" : {
			return {
                visible: false,
                userObj: state.userObj
			}
		}
		default : return state
	}
}
export default sliderBar;
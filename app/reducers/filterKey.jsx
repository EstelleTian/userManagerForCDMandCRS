const filterKey = ( state = "all", action) =>{
    switch (action.type){
        case "FILTER_LIST":
            return action.text || 'all';
        default :
            return state;
    }
}
export default filterKey;
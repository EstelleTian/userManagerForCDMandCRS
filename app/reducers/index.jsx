import { combineReducers } from 'redux';
import userList from './userList';
import filterKey from './filterKey';

const reducer = combineReducers({
    userList,
    filterKey
});

export default reducer;

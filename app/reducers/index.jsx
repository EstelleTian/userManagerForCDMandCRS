import { combineReducers } from 'redux';
import userList from './userList';
import filterKey from './filterKey';
import sliderBar from './sliderBar';

const reducer = combineReducers({
    userList,
    filterKey,
    sliderBar
});

export default reducer;

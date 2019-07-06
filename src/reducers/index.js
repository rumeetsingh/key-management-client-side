import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import keysReducer from './keysReducer';


export default combineReducers({
    form : formReducer,
    auth : authReducer,
    keys : keysReducer,
});
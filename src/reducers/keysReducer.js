import { FETCH_BOXES,FETCH_KEYS,SET_KEYS_TO_NULL } from '../actions/types';

const INITIAL_STATE = {
    boxes : null,
    keys : null,
};

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case FETCH_BOXES:
            return { ...state,boxes:action.payload };
        case FETCH_KEYS:
            return { ...state,keys:action.payload };
        case SET_KEYS_TO_NULL:
            return { ...state,keys:null };
        default:
            return state;
    };
};
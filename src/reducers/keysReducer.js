import { FETCH_BOXES } from '../actions/types';

const INITIAL_STATE = {
    boxes : null,
};

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case FETCH_BOXES:
            return { ...state,boxes:action.payload };
        default:
            return state;
    };
};
import { SELECT_BOX,DESELECT_BOX } from '../actions/types';

const INITIAL_STATE = {
    selectedBox : null,
}


export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case SELECT_BOX:
            return { ...state,selectedBox:action.payload };
        case DESELECT_BOX:
            return { ...state,selectedBox:null };
        default:
            return state;
    };
};

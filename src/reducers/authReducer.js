import { ACCOUNT_JUST_CREATED,SIGN_IN,SIGN_IN_ERROR,FETCH_ACCOUNT_DETAILS,SIGN_IN_WITH_TOKEN,SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    accountJustCreated:false,
    isSignedIn:false,
    token:null,
    errors:null,
    details:null,
};

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case ACCOUNT_JUST_CREATED:
            return { ...state,accountJustCreated:action.payload };
        case SIGN_IN:
            return { ...state,isSignedIn:true,token:action.payload,errors:null };
        case SIGN_IN_ERROR:
            return { ...state,errors:action.payload };
        case SIGN_IN_WITH_TOKEN:
            return { ...state,isSignedIn:true,token:action.payload,errors:null };
        case FETCH_ACCOUNT_DETAILS:
            return { ...state,details:action.payload };
        case SIGN_OUT:
            return { ...state,accountJustCreated:false,isSignedIn:false,token:null,errors:null,details:null, }
        default:
            return state;
    };
};

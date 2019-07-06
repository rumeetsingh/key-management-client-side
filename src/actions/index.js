import { 
    ACCOUNT_JUST_CREATED,
    SIGN_IN,SIGN_IN_ERROR,
    FETCH_ACCOUNT_DETAILS,
    SIGN_IN_WITH_TOKEN,
    SIGN_OUT,
    FETCH_BOXES
} from './types';
import api from '../apis';
import history from '../history';


export const accountJustCreated = () => {
    return {
        type:ACCOUNT_JUST_CREATED,
        payload:true
    };
};

export const signIn = ({email,password}) => async dispatch => {
    try{
        const response = await api.post('/users/token/',{ email,password });
        await localStorage.setItem('FoxedoKMSAccess',response.data.access);
        await dispatch(fetchAccountDetails(response.data.access));
        await dispatch(fetchBoxes(response.data.access));
        await dispatch({ type:SIGN_IN,payload:response.data.access });
        history.push('/');
    }catch(errors){
        dispatch({ type:SIGN_IN_ERROR,payload:errors });
    };
};

export const signInWithToken = token => async dispatch => {
    try{
        await dispatch(fetchAccountDetails(token));
        await dispatch(fetchBoxes(token));
        await dispatch({ type:SIGN_IN_WITH_TOKEN,payload:token })
    }catch(errors){
        dispatch(signOut());
    };
};

export const fetchAccountDetails = token => async dispatch => {
    const response = await api.get('/users/get',{ headers : { Authorization : `Bearer ${token}` } });
    dispatch({ type:FETCH_ACCOUNT_DETAILS,payload:response.data });
};

export const signOut = () => async dispatch => {
    await localStorage.removeItem('FoxedoKMSAccess');
    await dispatch({ type:SIGN_OUT });
    history.push('/');
};

export const fetchBoxes = token => async dispatch => {
    const response = await api.get('/keys/boxes/',{ headers : { Authorization : `Bearer ${token}` } });
    dispatch({ type:FETCH_BOXES,payload:response.data });
};

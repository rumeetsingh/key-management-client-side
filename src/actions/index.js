import { 
    ACCOUNT_JUST_CREATED,
    SIGN_IN,SIGN_IN_ERROR,
    FETCH_ACCOUNT_DETAILS,
    SIGN_IN_WITH_TOKEN,
    SIGN_OUT,
    FETCH_BOXES,
    SELECT_BOX,
    DESELECT_BOX,
    FETCH_KEYS,
    SET_KEYS_TO_NULL,
    FETCH_PASSWORDS,
} from './types';
import api from '../apis';
import history from '../history';

import nacl from 'tweetnacl';
import utils from 'tweetnacl-util';


export const accountJustCreated = () => {
    return {
        type:ACCOUNT_JUST_CREATED,
        payload:true
    };
};

const encryptToken = (token) => {
    const encodeBase64 = utils.encodeBase64;
    const nonce = nacl.randomBytes(24);
    const secretKey = Buffer.from((process.env.REACT_APP_YNXEWLLNTRNXZHG).toString(), 'utf8')
    const secretData = Buffer.from(token, 'utf8')
    const encrypted = nacl.secretbox(secretData, nonce, secretKey)
    return `${encodeBase64(nonce)}:${encodeBase64(encrypted)}`
};

export const signIn = ({email,password}) => async dispatch => {
    try{
        const response = await api.post('/users/token/',{ email,password });
        await localStorage.setItem('FoxedoKMSAccess',encryptToken(response.data.access));
        await dispatch(fetchAccountDetails(response.data.access));
        await dispatch(fetchBoxes(response.data.access));
        await dispatch(fetchPasswords(response.data.access));
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
        await dispatch(fetchPasswords(token));
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

export const selectBox = (boxId,boxName,boxCreatedOn) => {
    return {
        type : SELECT_BOX,
        payload : { id:boxId,name:boxName,created_on:boxCreatedOn }
    };
};

export const deselectBox = () => {
    return {
        type : DESELECT_BOX,
    };
};

export const fetchKeys = (token,boxId) => async dispatch => {
    const response = await api.get(`/keys/keys/?box=${boxId}`,{ headers : { Authorization : `Bearer ${token}` } });
    dispatch({ type:FETCH_KEYS,payload:response.data });
};

export const setKeysToNull = () => {
    return { type : SET_KEYS_TO_NULL };
};

export const fetchPasswords = token => async dispatch => {
    const response = await api.get('/keys/passcodes/',{ headers : { Authorization : `Bearer ${token}` } });
    dispatch({ type:FETCH_PASSWORDS,payload:response.data });
};

import axios from '../../customize/axios';
import accountType from '../type/accountType';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

export const doLogin = (ssoToken) => {
    // logic here that can dispatch actions or read state
    return async (dispatch, getState) => {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        axios.post(`${process.env.REACT_APP_BACKEND_SSO}/verify`, { ssoToken }, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.errCode !== 0) {
                    dispatch({ type: USER_LOGIN_FAIL, payload: res.message });
                } else {
                    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
                    // window.location.href = `${process.env.REACT_APP_SERVICE}`
                }
            })
            .catch((e) => {
                console.log(e);
                dispatch({ type: USER_LOGIN_FAIL })
            })
    }
}

export const doGetAccount = () => {
    // logic here that can dispatch actions or read state
    return async (dispatch, getState) => {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        axios.post(`${process.env.REACT_APP_BACKEND_SSO}/api/account`, {}, { withCredentials: true })
            .then(res => {
                if (res?.errCode !== 0) {
                    dispatch({ type: USER_LOGIN_FAIL, payload: res.message });
                } else {
                    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
                }
            })
            .catch((e) => {
                console.log(e);
                dispatch({ type: USER_LOGIN_FAIL })
            })
    }
}

export const logOut = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: accountType.LOG_OUT,
        })
        axios.get(`${process.env.REACT_APP_BACKEND_SSO}/api/clear-cookie`, { withCredentials: true })
            .then(res => {
                if (res.errCode !== 0) {
                    dispatch({ type: accountType.LOG_OUT_FAIL });
                } else {
                    dispatch({ type: accountType.LOG_OUT_SUCCESS })
                }
            })
            .catch((e) => {
                console.log(e);
                dispatch({ type: USER_LOGIN_FAIL })
            })
    }
}
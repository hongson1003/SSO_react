import { USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_FAIL } from "../actions/accountAction";
import accountType from '../type/accountType';
const INITIAL_STATE = {
    userInfo: {
        accessToken: "",
        refresh: "",
        roles: "",
        username: "",
        email: "",
    },
    isLogin: false,
    errMessage: ''
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return {
                ...state,

            }
        }
        case USER_LOGIN_FAIL: {
            return {
                ...state,
                isLogin: false,
                errMessage: action.payload
            }
        }

        case USER_LOGIN_SUCCESS: {
            console.log(action.payload)
            return {
                ...state,
                userInfo: action.payload,
                isLogin: true,
            }
        }
        case accountType.LOG_OUT: {
            return {
                ...state
            }
        }

        case accountType.LOG_OUT_SUCCESS: {
            return {
                ...state,
                isLogin: false,
            }
        }


        default: return state;

    }

};

export default reducer;
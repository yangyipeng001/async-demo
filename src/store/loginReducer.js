import {
    REQUEST,
    // LOGIN_SAGA,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from './const'

const userInit = {
    isLogin: false,
    userInfo: {id: null, name: '', score: 0},
    loading: false,
    err: {msg: ''}
}

export const loginReducer = (state = {...userInit}, {type, payload}) => {
    switch(type) {
        case REQUEST:
            return {...state, loading: true}

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                loading: false,
                userInfo: {...payload}
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                ...userInit,
                ...payload
            }
        
        case LOGOUT_SUCCESS:
            return {
                ...userInit,
                isLogin: false,
                loading: false
            }

        default:
            return state
    }
}
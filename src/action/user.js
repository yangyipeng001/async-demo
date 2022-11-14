import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../store/const"

export const login = (userInfo) => {
    return {
        type: LOGIN_SUCCESS,
        payload: userInfo
    }
}

export const logout = (userInfo) => {
    return {
        type: LOGOUT_SUCCESS,
        payload: userInfo
    }
}
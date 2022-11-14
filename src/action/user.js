import { LoginService } from "../service/login"
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, REQUEST } from "../store/const"

/**
 * 异步方案
 */
// promise
// export const login = (userInfo) => (dispatch) => {
//     dispatch({type: REQUEST})

//     LoginService.login(userInfo).then(
//         res => {
//             // dispatch({type: LOGIN_SUCCESS, payload: res})
//             getMoreUserInfo(dispatch, res)
//         },
//         err => {
//             dispatch({type: LOGIN_FAILURE, payload: err})
//         }
//     )
// }

// async await
export const login = (userInfo) => {
    return async function(dispatch) {
        dispatch({type: REQUEST})

        // 请求1： 用户登录
        let res1 = await loginPromise(dispatch, userInfo)

        // 请求2： 根据用户基本信息获取详细信息
        if (res1) {
            getMoreUserInfo(dispatch, res1)
        }
    }
}

export const loginPromise = (dispatch, userInfo) => {
    return LoginService.login(userInfo).then(
        res => {
            return res
        },
        err => {
            dispatch({type: LOGIN_FAILURE, payload: err})
        }
    )
}

export const getMoreUserInfo = (dispatch, userInfo) => {
    LoginService.getMoreUserInfo(userInfo).then(
        res => {
            dispatch({type: LOGIN_SUCCESS, payload: res})
        },
        err => {
            dispatch({type: LOGIN_FAILURE, payload: err})
        }
    )
}

export const logout = (userInfo) => {
    return {
        type: LOGOUT_SUCCESS,
        payload: userInfo
    }
}



/**
 * 同步方案
 */
// export const login = (userInfo) => {
//     return {
//         type: LOGIN_SUCCESS,
//         payload: userInfo
//     }
// }

// export const logout = (userInfo) => {
//     return {
//         type: LOGOUT_SUCCESS,
//         payload: userInfo
//     }
// }
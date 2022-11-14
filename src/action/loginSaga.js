import {call, put, takeEvery, take, fork} from 'redux-saga/effects'
import { LoginService } from "../service/login";
import { LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, REQUEST } from "../store/const"

function *loginHandle(action) {
    yield put({type: REQUEST})

    try {
        const res1 = yield call(LoginService.login, action.payload)
        const res2 = yield call(LoginService.getMoreUserInfo, res1)
        yield put({type: LOGIN_SUCCESS, payload: res2})
    }
    catch(err) {
        yield put({type: LOGIN_FAILURE, payload: err})
    }
}

// watcher saga
function *loginSaga() {
    // yield takeEvery(LOGIN_SAGA, loginHandle)

    // 只监听一次
    while(true) {
        const action = yield take(LOGIN_SAGA)

        // call 阻塞， fork 非阻塞
        // yield call(loginHandle, action)
        yield fork(loginHandle, action)

        console.log('action', action)
    }  
}

export default loginSaga
import { applyMiddleware, combineReducers, createStore } from "redux"

// import thunk from 'redux-thunk'
import { loginReducer } from "./loginReducer"
import createSagaMiddleware from 'redux-saga'

// ! 1.创建要运行的saga
import loginSaga from "../action/loginSaga"
// import rootSaga from "../action/rootSaga"

// ! 2.创建saga中间件
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({user: loginReducer}),
    // applyMiddleware(thunk)

    // ! 3.把saga中间件与redux store 连接
    applyMiddleware(sagaMiddleware)
)

// ! 4.运行saga
sagaMiddleware.run(loginSaga)
// sagaMiddleware.run(rootSaga)

export default store
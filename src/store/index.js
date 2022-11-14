import { applyMiddleware, combineReducers, createStore } from "redux"
// import loginSaga from "../action/loginSaga"
// import thunk from 'redux-thunk'
import { loginReducer } from "./loginReducer"
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../action/rootSaga"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({user: loginReducer}),
    // applyMiddleware(thunk)
    applyMiddleware(sagaMiddleware)
)

// sagaMiddleware.run(loginSaga)
sagaMiddleware.run(rootSaga)

export default store
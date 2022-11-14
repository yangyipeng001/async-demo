import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
// import { LOGIN_SUCCESS } from "../store/const"
import {login} from '../action/user'

export default function LoginPage(props) {
    const user = useSelector(({user}) => user)
    const location = useLocation()
    const dispatch = useDispatch()
    const from = location.state?.from.pathname || '/'

    if (user.isLogin) {
        return <Navigate to={from} replace={true} />
    }

    const submit = () => {
        // dispatch({type: LOGIN_SUCCESS})
        dispatch(login({name: 'test'}))
    }

    return (
        <div>
            <h3>LoginPage</h3>

            <button onClick={submit}>login</button>
        </div>
    )
}
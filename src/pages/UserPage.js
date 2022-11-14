import { useDispatch, useSelector } from "react-redux"
import {logout} from '../action/user'

export default function UserPage(props) {
    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()

    return (
        <div>
            <h3>UserPage</h3>
            <p>{user?.userInfo?.name}</p>
            <p>{user?.userInfo?.score}</p>
            <button onClick={() => {
                dispatch(logout())
            }}>logout</button>
        </div>
    )
}
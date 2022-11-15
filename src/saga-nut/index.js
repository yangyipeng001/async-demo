import { stdChannel } from "./channel"
import runSaga from "./runSaga"

export default function createSagaMiddleware() {
    let boundRunSaga

    let channel = stdChannel()

    // redux thunk logger promise
    function sagaMiddleware({getState, dispatch}) {
        // ! sagaMiddleware和redux建立起来联系
        boundRunSaga = runSaga.bind(null, {channel, getState, dispatch})

        return (next) => (action) => {
            let result = next(action)
            channel.put(action)
            return result
        }
    }

    sagaMiddleware.run = (...args) => boundRunSaga(...args)

    return sagaMiddleware
}
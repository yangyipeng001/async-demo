import effectRunnerMap from './effectRunnerMap'
import { IO } from "./symbol";

export default function proc(env, iterator) {
    next()

    function next(arg, isErr) {
        let result

        if (isErr) {
            result = iterator.throw(arg)
        }
        else {
            result = iterator.next(arg)
        }

        // value done
        // 没有执行完
        if (!result.done) {
            digestEffect(result.value, next)
        }
    }

    function digestEffect(effect, cb) {
        // 是否执行完
        let effectSettled
    
        function currentCb(res, isErr) {
            if (effectSettled) {
                return
            }
    
            effectSettled = true
            cb(res, isErr)
        }
    
        runEffect(effect, currentCb)
    }
    
    function runEffect(effect, currentCb) {
        // effect 就是一些effect操作
        if (effect && effect[IO]) {
            const effectRunner = effectRunnerMap[effect.type]
            effectRunner(env, effect.payload, currentCb)
        }
        else {
            currentCb()
        }
    }
};

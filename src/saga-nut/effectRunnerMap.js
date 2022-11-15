import effectTypes from './effectTypes'
import { promise } from './is'
import proc from './proc'

// todo channel
function runTakeEffect(env, {channel = env.channel, pattern}, cb) {
    const matcher = (input) => input.type === pattern
    channel.take(cb, matcher)
}

function runPutEffect(env, {action}, cb) {
    const result = env.dispatch(action)
    cb(result)
}

// ! 暂时只处理promise函数
function runCallEffect(env, {fn, args}, cb) {
    const result = fn.apply(null, args)

    // promise
    if (promise(result)) {
        result.then(data => cb(data)).catch(err => cb(err, true))
        return
    }

    cb(result)
}

// ! 暂时只处理generator函数
function runForkEffect(env, {fn, args}, cb) {
    // generator函数
    const taskIterator = fn.apply(null, args)
    proc(env, taskIterator)
    cb()
}


const effectRunnerMap = {
    [effectTypes.TAKE]: runTakeEffect,
    [effectTypes.PUT]: runPutEffect,
    [effectTypes.CALL]: runCallEffect,
    [effectTypes.FORK]: runForkEffect,
}

export default effectRunnerMap
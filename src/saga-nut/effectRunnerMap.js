import effectTypes from './effectTypes'

function runTakeEffect() {
    console.log('runTakeEffect')
}

function runPutEffect() {
    console.log('runPutEffect')
}

function runCallEffect() {
    console.log('runCallEffect')
}

function runForkEffect() {
    console.log('runForkEffect')
}


const effectRunnerMap = {
    [effectTypes.TAKE]: runTakeEffect,
    [effectTypes.PUT]: runPutEffect,
    [effectTypes.CALL]: runCallEffect,
    [effectTypes.FORK]: runForkEffect,
}

export default effectRunnerMap
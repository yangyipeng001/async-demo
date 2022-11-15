import proc from './proc'

export default function runSaga({channel, getState, dispatch}, saga, ...args) {
    const iterator = saga(...args)
    proc({channel, getState, dispatch}, iterator)
};

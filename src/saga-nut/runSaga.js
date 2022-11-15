import process from './process'

export default function runSaga({getState, dispatch}, saga, ...args) {
    const iterator = saga(...args)
    process({getState, dispatch}, iterator)
};

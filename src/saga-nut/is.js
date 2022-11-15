export const func = (f) => typeof f === 'function'
export const promise = (p) => p && func(p.then)
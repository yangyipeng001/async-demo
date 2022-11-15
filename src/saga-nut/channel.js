import { MATCH } from "./symbol"

export function stdChannel() {
    // 保存take
    const currentTakers = []

    function take(cb, matcher) {
        cb[MATCH] = matcher
        currentTakers.push(cb)
    }

    // action
    function put(input) {
        const takers = currentTakers

        // 因为takers是动态添加的，我们只需要获取一开始的长度，所以得写在前边
        for (let i = 0, len = takers.length; i < len; i++) {
            const taker = takers[i]

            if (taker[MATCH](input)) {
                taker(input)
            }
        }
    }

    return {take, put}
}
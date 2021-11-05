import { sendMessage } from './socket'
const { __memoryInterceptFlag__, Memory } = __GLOBAL__
export const getAllMemory = (ws: any, params: any) => {
    let memoryAll = Memory.getAll();
    let newMemoryAll = []
    for (const key in memoryAll) {
        if(/_#_hummer_.*_#_/.test(key)){
            continue;
        }
        let item = {
            key: key,
            value: memoryAll[key],
        }
        newMemoryAll.push(item);
    }
    sendMessage(ws, {
        type: 'memory',
        method: 'setMemoryList',
        params: {
            ...params,
            memoryAll: newMemoryAll
        }
    })
}
// Memory拦截
export const memoryintercept = (ws: any): void => {
    __GLOBAL__.__memoryInterceptFlag__ = true
    !__memoryInterceptFlag__ && (__GLOBAL__.__memoryOriginSet__ = Memory.set, __GLOBAL__.__memoryOriginRemove__ = Memory.remove, __GLOBAL__.__memoryOriginRemoveAll__ = Memory.removeAll)
    Memory.set = function () {
        if (Memory.get("_#_hummer_tenonIp_#_")) {
            sendMessage(ws, {
                type: 'memory',
                method: 'updateMemoryList',
                params: {
                    tenonIp: Memory.get("_#_hummer_tenonIp_#_"),
                    key: arguments[0],
                    value: arguments[1],
                }
            })
        }
        __GLOBAL__.__memoryOriginSet__.apply(this, arguments)
    }

    Memory.remove = function () {
        __GLOBAL__.__memoryOriginRemove__.apply(this, arguments)
        if (Memory.get("_#_hummer_tenonIp_#_")) {
            getAllMemory(ws, {tenonIp:Memory.get("_#_hummer_tenonIp_#_")})
        }
    }

    Memory.removeAll = function () {
        __GLOBAL__.__memoryOriginRemoveAll__.apply(this, arguments)
        if (Memory.get("_#_hummer_tenonIp_#_")) {
            sendMessage(ws, {
                type: 'memory',
                method: 'setMemoryList',
                params: {
                    tenonIp: Memory.get("_#_hummer_tenonIp_#_"),
                    memoryAll: []
                }
            })
        }
    }
}
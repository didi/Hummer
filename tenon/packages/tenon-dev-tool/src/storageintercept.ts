import { sendMessage } from './socket'
const { __storageInterceptFlag__, Storage, Memory } = __GLOBAL__
export const getAllStorage = (ws: any, params: any) => {
    let storageAll = Storage.getAll();
    let newStorageAll = []
    for (const key in storageAll) {
        if(/_#_hummer_.*_#_/.test(key)){
            continue;
        }
        let item = {
            key: key,
            value: storageAll[key],
        }
        newStorageAll.push(item);
    }
    sendMessage(ws, {
        type: 'storage',
        method: 'setStorageList',
        params: {
            ...params,
            storageAll: newStorageAll
        }
    })
}
// Storage拦截
export const storageintercept = (ws: any): void => {
    __GLOBAL__.__storageInterceptFlag__ = true
    !__storageInterceptFlag__ && (__GLOBAL__.__storageOriginSet__ = Storage.set, __GLOBAL__.__storageOriginRemove__ = Storage.remove, __GLOBAL__.__storageOriginRemoveAll__ = Storage.removeAll)
    Storage.set = function () {
        if (Memory.get("_#_hummer_tenonIp_#_")) {
            sendMessage(ws, {
                type: 'storage',
                method: 'updateStorageList',
                params: {
                    tenonIp: Memory.get("_#_hummer_tenonIp_#_"),
                    key: arguments[0],
                    value: arguments[1],
                }
            })
        }
        __GLOBAL__.__storageOriginSet__.apply(this, arguments)
    }

    Storage.remove = function () {
        __GLOBAL__.__storageOriginRemove__.apply(this, arguments)
        if (Memory.get("_#_hummer_tenonIp_#_")) {
            getAllStorage(ws, {tenonIp:Memory.get("_#_hummer_tenonIp_#_")})
        }
    }

    Storage.removeAll = function () {
        __GLOBAL__.__storageOriginRemoveAll__.apply(this, arguments)
        if (Memory.get("_#_hummer_tenonIp_#_")) {
            sendMessage(ws, {
                type: 'storage',
                method: 'setStorageList',
                params: {
                    tenonIp: Memory.get("_#_hummer_tenonIp_#_"),
                    storageAll: []
                }
            })
        }
    }
}
import initSocket, { sendMessage } from './socket'
import { getPartUrlByParam, getViewData, updateOptions, log } from './utils'
import { getAllStorage } from './storageintercept'
import { getAllMemory } from './memoryintercept'
/**
 * DevTool 启动入口函数
 * @param container 页面实例，通过引用可以拿到整个视图树，以及视图上的各个实例
 */
// Tip: hummer-front 兼容
let isWebPlatform = __GLOBAL__.Hummer.pageInfo && JSON.stringify(__GLOBAL__.Hummer.pageInfo) === '{}'
export function run(container: any) {
  log('get ready~')
  const { url } = __GLOBAL__.Hummer.pageInfo
  const { Storage, Memory } = __GLOBAL__
  let host = getPartUrlByParam(url, 'host')
  let port = getPartUrlByParam(url, 'port')
  let path = getPartUrlByParam(url, 'path')
  let wsTenonUrl = `ws://${host}:${port}/proxy/tenon`
  // Tip: hummer-front 兼容
  if (isWebPlatform) {
    // 本地 cli ip
    wsTenonUrl = 'ws://172.23.166.43:8000/proxy/tenon'
  }
  // @ts-ignore
  let viewMap = {}, viewId: number, view: any
  const onSocketMsgHandlers = {
    'getViewTree': function (ws: any, params: any) {
      let data = getViewData(container)
      viewMap = data.viewMap
      sendMessage(ws, {
        method: 'setViewTree',
        params: {
          ...params,
          viewTree: [data.simpleRoot],
          path:path,
          baseInfo: __GLOBAL__.Hummer.env
        }
      })
    },
    'getViewInfo': function (ws: any, params: any) {
      viewId = params.viewId
      // @ts-ignore
      view = viewMap[viewId]
      view.element.getRect((rect: any) => {
        view.element.dbg_highlight && view.element.dbg_highlight(true)
        sendMessage(ws, {
          method: 'setViewInfo',
          params: {
            ...params,
            rect: rect,
            style: view.style,
            className: view.className
          }
        })
      })
    },
    'setViewStyle': function (ws: any, params: any) {
      viewId = params.viewId
      // @ts-ignore
      view = viewMap[viewId]
      const style = params.style
      view.element.style = updateOptions(view.style, style)
      sendMessage(ws, { method: 'setStyleSuccess' })
    },
    'setStorage': function (ws: any, params: any) {
      const { type, key, value } = params.storage
      switch (type) {
        case 'delete':
          Storage.remove(key)
          break;
        case 'revise':
          Storage.set(key, value)
          break;
        default:
          break;
      }
      sendMessage(ws, { method: 'setStorageSuccess' })
    },
    'getStorage': function (ws: any, params: any) {
      Memory.set("_#_hummer_tenonIp_#_", params?.tenonIp);
      getAllStorage(ws, params);
    },
    'setMemory': function (ws: any, params: any) {
      const { type, key, value } = params.memory
      switch (type) {
        case 'delete':
          Memory.remove(key)
          break;
        case 'revise':
          Memory.set(key, value)
          break;
        default:
          break;
      }
      sendMessage(ws, { method: 'setMemorySuccess' })
    },
    'getMemory': function (ws: any, params: any) {
      Memory.set("_#_hummer_tenonIp_#_", params?.tenonIp);
      getAllMemory(ws, params);
    },
  }
  initSocket(wsTenonUrl, onSocketMsgHandlers)
}
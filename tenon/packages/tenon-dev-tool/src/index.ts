import initSocket, { sendMessage } from './socket'
import { getPartUrlByParam, getViewData, updateOptions, log, error, formatNode } from './utils'
import { getAllStorage } from './storageintercept'
import { getAllMemory } from './memoryintercept'
/**
 * DevTool 启动入口函数
 * @param container 页面实例，通过引用可以拿到整个视图树，以及视图上的各个实例
 */
// Tip: hummer-front 兼容
let isWebPlatform = __GLOBAL__.Hummer.pageInfo && JSON.stringify(__GLOBAL__.Hummer.pageInfo) === '{}'

export function run(container: any, type: string = 'tenon-vue') {
  let formatedNode = formatNode(container, type)
  log('Socket Initializing')
  const { url } = __GLOBAL__.Hummer.pageInfo || {}
  // 部分接入方使用自己的容器 没有pageInfo属性 直接报错&return
  if (!url) {
    error(`get url error, initialization failed`)
    return
  }
  const { Storage, Memory } = __GLOBAL__
  let host = getPartUrlByParam(url, 'host')
  let port = getPartUrlByParam(url, 'port')
  let path = getPartUrlByParam(url, 'path')
  let scheme = getPartUrlByParam(url, 'scheme')
  // scheme错误 or 没有端口 报错&return
  if (!['http', 'https'].includes(scheme) || !port) {
    error(`invalid url[${url}], initialization failed`)
    return
  }
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
      let data = getViewData(formatedNode, type)
      viewMap = data.viewMap
      if (formatedNode?.element?.dbg_getDescription) {
        formatedNode.element.dbg_getDescription((node: any) => {
          sendMessage(ws, {
            method: 'setViewTree',
            params: {
              ...params,
              viewTree: [data.simpleRoot],
              path: path,
              baseInfo: __GLOBAL__.Hummer.env,
              devToolType: type
            }
          })
        })
      } else {
        sendMessage(ws, {
          method: 'setViewTree',
          params: {
            ...params,
            viewTree: [data.simpleRoot],
            path: path,
            baseInfo: __GLOBAL__.Hummer.env,
            devToolType: type
          }
        })
      }
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
            className: view.className || ''
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
  log('Socket initializing complete')
}
import { log } from './utils'
import { storageintercept } from './storageintercept'
import { memoryintercept } from './memoryintercept'
import { requestintercept } from './requestintercept'

let ws:any, currentType:string
export default function (url:string, handlers:any) {
  ws = new __GLOBAL__.WebSocket(url);
  // 设置各种监听回调
  ws.onopen = () => {
    log('websocket opened~');
    storageintercept(ws);
    memoryintercept(ws);
    requestintercept(ws);
  }

  ws.onmessage = (event:any) => {
    log(JSON.stringify(event))
    let msg = JSON.parse(event.data)
    currentType = msg.type || ''
    if (handlers[msg.method]) {
      handlers[msg.method](ws, msg.params)
    }
  }

  ws.onclose = () => {
    ws = null
    log('websocket closed~');
  }
}

export const sendMessage = function (ws:any, options:any) {
  // Todo: 兜底策略模式
  const type = options.type || currentType
  const method = options.method || 'ignore'
  const params = options.params || {}
  ws.send(JSON.stringify({
    type, method, params
  }))
}
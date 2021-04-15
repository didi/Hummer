import {diff, cloneObject, getUUID, getNotifyEventKey, getMemoryKey,stringify, parseJson} from './utils/index'
import {Operation, OperationType} from './utils/types'
const id = getUUID();
const MemoryStoreKey = getMemoryKey();
const NotifyEvent = getNotifyEventKey();
let cacheData:Record<string, any> = {}; 
/**
 * 多页面同步数据
 * @param param Options
 */
export function createHummerPlugin ({
  
} = {}) {
  return (store:any) => {
    // 初始化数据
    initState(store)
    // 注册通知
    let notifyCenter =  Hummer.notifyCenter
    notifyCenter.addEventListener(NotifyEvent, ({eventId, operations}:any) => {
      if(eventId === id){
        return
      }
      // JSCore中数组Proxy对象会被转换为Object，事件通信时采用字符串
      if(typeof operations === 'string'){
        operations = JSON.parse(operations)
      }
      resetStore(store, operations);
      cacheData = cloneObject(store.state);
    })

    // 只监测Mutation的提交变化，不支持监听ResetStore
    store.subscribe((mutation:any, state:any) => {
      Memory.set(MemoryStoreKey, stringify(state));
      // TODO 限流操作
      let ops = diff(cacheData, state);
      if(!ops || ops.length === 0){
        return
      }
      notifyCenter.triggerEvent(NotifyEvent, {
        eventId: id,
        operations: JSON.stringify(ops)
      });
      cacheData = cloneObject(state);
    })
  }
}

function initState(store:any){
  let newData = Memory.get(MemoryStoreKey);
  if(newData){
    newData = typeof newData === 'string'? parseJson(newData): newData;
    cacheData = cloneObject(newData);
    store.replaceState(newData);
  }
}


function setObjectValue(ob:any, keys:Array<string>, value: any){
  let temp = ob;
  let lastKey = keys.pop();
  keys.forEach((key,index) => {
    temp = temp[key]
  })
  temp && lastKey &&  (temp[lastKey] = value)
}

function resetStore(store: any, operations:Array<Operation>){
 operations.forEach(operation=> {
   updateStore(store, operation)
 })
}

function updateStore(store:any, operation:Operation){
  let {type, key, value} = operation;

  store._withCommit(() => {
    switch(type){
      case OperationType.ADD:
        setObjectValue(store.state, key, value)
        break;
      case OperationType.DELETE:
        setObjectValue(store.state, key, undefined)
        break;
      case OperationType.UPDATE:
        setObjectValue(store.state, key, value)
        break;
      default:
        break;
    }
  })
}
import {diff, cloneObject, getUUID, getNotifyEventKey, getMemoryKey,stringify, parseJson, getMemoryByKey, setMemoryByKey} from './utils/index'
import {Operation, OperationType} from './utils/types'
const id = getUUID();
let cacheData:Record<string, any> = {}; 

/**
 * Hummer Store 插件配置项
 */
interface HummerPluginOptions {
  /**
   * 自定义的存储key
   * 默认会通过 Hummer.env.namespace 生成对应的 Memory 存储 key
   * 当应用中存在多个 Store 时，可以通过该缓存插件传入自定义的 key 做存储区分
   */
  store_key?: string
}
/**
 * 多页面同步数据
 * @param param Options
 */
export function createHummerPlugin ({
  store_key
}: HummerPluginOptions = {}) {
  const MemoryStoreKey = getMemoryKey(store_key);
  const NotifyEvent = getNotifyEventKey(store_key);

  return (store:any) => {
    // 初始化数据
    initState(store, MemoryStoreKey)
    // 注册通知
    let notifyCenter =  Hummer.notifyCenter
    notifyCenter.addEventListener(NotifyEvent, ({eventId, operations}: any) => {
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
      setMemoryByKey(MemoryStoreKey, stringify(state));
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

function initState(store: any, MemoryStoreKey: string){
  let newData = getMemoryByKey(MemoryStoreKey);
  if(newData){
    newData = parseJson(newData);
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
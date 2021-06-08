/**
 * 全局适配Api
 */
export function adapterApi(){
  adapterTimeInterval()
}

/**
 * 适配Time Interval
 */
function adapterTimeInterval(){
  const _interval = __GLOBAL__.setInterval
  __GLOBAL__.setInterval = function(...args:any){
    const intervalHandler = _interval(args)
    return intervalHandler
  }
}
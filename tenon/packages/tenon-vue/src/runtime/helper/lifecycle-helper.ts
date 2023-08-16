import { callWithAsyncErrorHandling } from "@vue/runtime-core"
interface LifeCycleMixins {
  onLoad: Array<any>,
  onReady: Array<any>,
  onShow: Array<any>,
  onHide: Array<any>,
  onUnload: Array<any>,
  onBack: Array<any>
}
enum LifeCycleEnum {
  ONLOAD = 'onLoad',
  ONREADY = 'onReady',
  ONSHOW = 'onShow',
  ONHIDE = 'onHide',
  ONUNLOAD = 'onUnload',
  ONBACK = 'onBack'
}
const LIFECYCLE = [LifeCycleEnum.ONLOAD, LifeCycleEnum.ONREADY, LifeCycleEnum.ONSHOW, LifeCycleEnum.ONHIDE, LifeCycleEnum.ONUNLOAD, LifeCycleEnum.ONBACK]

/**
 * 初始化页面生命周期
 * @param container 页面实例
 * @param instance 组件实例
 * @param config Options
 */
export const initPageLifeCycle = (container: any, instance: any, config: any) => {
  let {mixins: globalMixins} = instance._.appContext
  let { mixins, extends: extendOptions } = config
  let lifeCycleMixins: any = {
    onLoad: [],
    onReady: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onBack: []  
  }
  let globalLifeCycleMixins: any = {
    onLoad: [],
    onReady: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onBack: []  
  }
  if(globalMixins){
    globalLifeCycleMixins = applyPageMixin(globalMixins)
  }
  if (mixins) {
    lifeCycleMixins = applyPageMixin(mixins)
  }
  LIFECYCLE.forEach((lifecycle:string) => {
    // 页面生命周期执行顺序，extend => mixin => option
    // On Back 生命周期特殊处理
    if(lifecycle === LifeCycleEnum.ONBACK){
      container[lifecycle] = () => {
        /**
         * 背景：onBack Return true 拦截返回键；Return false 不拦截。
         * 依次执行 onBack 的回调，若有函数返回 true，进行拦截，后续函数不再调用
         */
        for(let i = 0; i < globalLifeCycleMixins[lifecycle].length; i++){
          if(applyLifeCycle(instance, globalLifeCycleMixins[lifecycle][i])){
            return true
          }
        }
        if(extendOptions){
          if(applyLifeCycle(instance, extendOptions[lifecycle])){
            return true
          }
        }
        for(let i = 0; i < lifeCycleMixins[lifecycle].length; i++){
          if(applyLifeCycle(instance, lifeCycleMixins[lifecycle][i])){
            return true
          }
        }
        return applyLifeCycle(instance, config[lifecycle])
      }
      return true
    }

    container[lifecycle] = () => {
      globalLifeCycleMixins[lifecycle].forEach((func: Function) => {
        applyLifeCycle(instance, func)
      })
      extendOptions && applyLifeCycle(instance, extendOptions[lifecycle])
      lifeCycleMixins[lifecycle].forEach((func: Function) => {
        applyLifeCycle(instance, func)
      })
      applyLifeCycle(instance, config[lifecycle])
    }
  })
}

function applyPageMixin(mixins: any): (LifeCycleMixins | null) {
  let lifeCycleMixins: LifeCycleMixins = {
    onLoad: [],
    onReady: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onBack: []
  }
  if (!mixins || mixins.length === 0) {
    return lifeCycleMixins
  }
  mixins.forEach((mixin: any) => {
    let { onLoad, onReady, onShow, onHide, onUnload, onBack } = mixin
    onLoad && lifeCycleMixins.onLoad.push(onLoad)
    onReady && lifeCycleMixins.onReady.push(onReady)
    onShow && lifeCycleMixins.onShow.push(onShow)
    onHide && lifeCycleMixins.onHide.push(onHide)
    onUnload && lifeCycleMixins.onUnload.push(onUnload)
    onBack && lifeCycleMixins.onBack.push(onBack)
  })
  return lifeCycleMixins
}

function applyLifeCycle(instance: any, func: Function) {
  // callWithAsyncErrorHandling 第三个参数，type 的取值
  // const ErrorTypeStrings = {
  //   ["sp"]: "serverPrefetch hook",
  //   ["bc"]: "beforeCreate hook",
  //   ["c"]: "created hook",
  //   ["bm"]: "beforeMount hook",
  //   ["m"]: "mounted hook",
  //   ["bu"]: "beforeUpdate hook",
  //   ["u"]: "updated",
  //   ["bum"]: "beforeUnmount hook",
  //   ["um"]: "unmounted hook",
  //   ["a"]: "activated hook",
  //   ["da"]: "deactivated hook",
  //   ["ec"]: "errorCaptured hook",
  //   ["rtc"]: "renderTracked hook",
  //   ["rtg"]: "renderTriggered hook",
  //   [0]: "setup function",
  //   [1]: "render function",
  //   [2]: "watcher getter",
  //   [3]: "watcher callback",
  //   [4]: "watcher cleanup function",
  //   [5]: "native event handler",
  //   [6]: "component event handler",
  //   [7]: "vnode hook",
  //   [8]: "directive hook",
  //   [9]: "transition hook",
  //   [10]: "app errorHandler",
  //   [11]: "app warnHandler",
  //   [12]: "ref function",
  //   [13]: "async component loader",
  //   [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
  // };
  const errInstance = instance._
  func && callWithAsyncErrorHandling(func, errInstance, 10)
  return func && func.apply(instance);
}

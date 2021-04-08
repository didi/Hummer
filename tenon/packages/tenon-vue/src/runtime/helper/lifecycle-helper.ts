interface LifeCycleMixins {
  onLoad: Array<any>,
  onShow: Array<any>,
  onHide: Array<any>,
  onUnload: Array<any>,
  onBack: Array<any>
}
enum LifeCycleEnum {
  ONLOAD = 'onLoad',
  ONSHOW = 'onShow',
  ONHIDE = 'onHide',
  ONUNLOAD = 'onUnload',
  ONBACK = 'onBack'
}
const LIFECYCLE = [LifeCycleEnum.ONLOAD, LifeCycleEnum.ONSHOW, LifeCycleEnum.ONHIDE, LifeCycleEnum.ONUNLOAD, LifeCycleEnum.ONBACK]

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
    onShow: [],
    onHide: [],
    onUnload: [],
    onBack: []  
  }
  let globalLifeCycleMixins: any = {
    onLoad: [],
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
    onShow: [],
    onHide: [],
    onUnload: [],
    onBack: []
  }
  if (!mixins || mixins.length === 0) {
    return lifeCycleMixins
  }
  mixins.forEach((mixin: any) => {
    let { onLoad, onShow, onHide, onUnload, onBack } = mixin
    onLoad && lifeCycleMixins.onLoad.push(onLoad)
    onShow && lifeCycleMixins.onShow.push(onShow)
    onHide && lifeCycleMixins.onHide.push(onHide)
    onUnload && lifeCycleMixins.onUnload.push(onUnload)
    onBack && lifeCycleMixins.onBack.push(onBack)
  })
  return lifeCycleMixins
}

function applyLifeCycle(instance: any, func: Function) {
  return func && func.apply(instance);
}

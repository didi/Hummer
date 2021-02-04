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
  let { mixins, extends: extendOptions } = config
  let lifeCycleMixins: any = {
    onLoad: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onBack: []  
  }
  if (mixins) {
    lifeCycleMixins = applyPageMixin(config)
  }
  LIFECYCLE.forEach((lifecycle:string) => {
    container[lifecycle] = () => {
      extendOptions && applyLifeCycle(instance, extendOptions[lifecycle])
      lifeCycleMixins[lifecycle].forEach((func: Function) => {
        applyLifeCycle(instance, func)
      })
      applyLifeCycle(instance, config[lifecycle])
    }
  })
}

function applyPageMixin(config: any): (LifeCycleMixins | null) {
  if (!config.mixins || config.mixins.length === 0) {
    return null
  }
  let lifeCycleMixins: LifeCycleMixins = {
    onLoad: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onBack: []
  }
  config.mixins.forEach((mixin: any) => {
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
  func && func.apply(instance);
}

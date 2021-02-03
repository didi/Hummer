import {Page} from '../nodes'
// import {PageComponent} from './page-helper'

interface LifeCycleMixins {
  onLoad: Array<any>,
  onShow: Array<any>,
  onHide: Array<any>,
  onUnload: Array<any>,
  onBack: Array<any>
}

/**
 * 初始化页面生命周期
 * @param container 页面实例
 * @param instance 组件实例
 * @param config Options
 */
export const initPageLifeCycle = (container:Page, instance: any, config:any) => {
  let {mixins, extends:extendOptions} = config
  let lifeCycleMixins : LifeCycleMixins | null = null
  if(mixins){
    lifeCycleMixins = applyPageMixin(config)
  }
  container.onLoad = () => {
    extendOptions && applyLifeCycle(instance, extendOptions.onLoad)
    lifeCycleMixins?.onLoad.forEach((func: Function) => {
      applyLifeCycle(instance, func)
    })
    applyLifeCycle(instance, config.onLoad)
  }
  container.onShow = () => {
    extendOptions && applyLifeCycle(instance, extendOptions.onShow)
    lifeCycleMixins?.onShow.forEach((func: Function) => {
      applyLifeCycle(instance, func)
    })
    applyLifeCycle(instance, config.onShow)
  };
  container.onHide = () => {
    extendOptions && applyLifeCycle(instance, extendOptions.onHide)
    lifeCycleMixins?.onHide.forEach((func: Function) => {
      applyLifeCycle(instance, func)
    })
    applyLifeCycle(instance, config.onHide)
  };
  container.onUnload = () => {
    extendOptions && applyLifeCycle(instance, extendOptions.onUnload)
    lifeCycleMixins?.onUnload.forEach((func: Function) => {
      applyLifeCycle(instance, func)
    })
    applyLifeCycle(instance, config.onUnload)
  };
  container.onBack = () => {
    extendOptions && applyLifeCycle(instance, extendOptions.onBack)
    lifeCycleMixins?.onBack.forEach((func: Function) => {
      applyLifeCycle(instance, func)
    })
    applyLifeCycle(instance, config.onBack)
  };
}

function applyPageMixin(config:any):(LifeCycleMixins | null){
  if(!config.mixins || config.mixins.length === 0){
    return null
  }
  let lifeCycleMixins : LifeCycleMixins = {
    onLoad: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onBack: []
  }
  config.mixins.forEach((mixin:any) => {
    let {onLoad, onShow, onHide, onUnload, onBack} = mixin
    onLoad && lifeCycleMixins.onLoad.push(onLoad)
    onShow && lifeCycleMixins.onShow.push(onShow)
    onHide && lifeCycleMixins.onHide.push(onHide)
    onUnload && lifeCycleMixins.onUnload.push(onUnload)
    onBack && lifeCycleMixins.onBack.push(onBack)
  })
  return lifeCycleMixins
}

function applyLifeCycle(instance:any, func: Function){
  func && func.apply(instance);
}

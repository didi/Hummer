import { createRenderer, RootRenderFunction, CreateAppFunction, isVNode, createVNode,AppContext } from "@vue/runtime-core";
import { Base, Page } from './nodes/index'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'
import document from './nodes/document'
import {PageOptions} from './nodes'
import {install} from './api'
import {initPageLifeCycle} from './helper/lifecycle-helper'

export {
  use,
  mixin,
  directive,
  component
} from './api'

const extend = Object.assign
const { render: baseRender, createApp: baseCreateApp } = createRenderer(
  extend({ patchProp }, nodeOps)
)

export const renderApp = baseRender as RootRenderFunction<Base>
export let appContext:(AppContext | null) = null;
export let container:(Page | null) = null
// 供自定义渲染组件渲染 Slot 模块使用，保证 AppContext 和 Global Context 统一
export const renderCustomSlot = ((vnode: any | null, container: Base) => {
  // 支持纯粹的 Component Options Case
  if(!isVNode(vnode)){
    vnode = createVNode(vnode);
  }
  vnode.appContext = appContext;
  baseRender(vnode, container);
}) as RootRenderFunction<Base>

export const createApp = ((...args) => {
  const app = baseCreateApp(...args)
  const { mount } = app
  app.mount = (container): any => {
    const proxy = mount(container)
    return proxy
  }
  return app
}) as CreateAppFunction<Base>

export {vAnimation} from './directives/vAnimation'
export {vShow} from './directives/vShow'
export {vModelText, vModelSwitch} from './directives/vModel'

export * from '@vue/runtime-core'

export * from './nodes'

export const createRootContainer = (options: PageOptions):Page => {
  return document.createPageView(options)
}

export function render(App:any){
  let {pageConfig} = App;
  let app = createApp(App);
  install(app);
  appContext = app._context;
  container = createRootContainer({
    canScroll: pageConfig && pageConfig.canScroll,
    pageStyle: pageConfig && pageConfig.pageStyle
  });
  let {plugins} = App;
  plugins && plugins.forEach((plugin:any) => {
    app.use(plugin)
  })
  let instance = app.mount(container);
  initPageLifeCycle(container, instance, App)
  container.render();
  if(NODE_DEBUG_ENV){
    // dev环境开启devtool
    require('@hummer/tenon-dev-tool').run(container)
  }
}

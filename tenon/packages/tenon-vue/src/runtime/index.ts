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
  // console.log(container)

  const NODE_VIEW = "Symbol(NODE_VIEW)";
  const NODE_TEXT = "Symbol(NODE_TEXT)";
  const NODE_IMAGE = "Symbol(NODE_IMAGE)"
  const NODE_BUTTON = "Symbol(NODE_BUTTON)"
  const NODE_TEXTAREA = "Symbol(NODE_TEXTAREA)"
  const NODE_INPUT = "Symbol(NODE_INPUT)"
  const NODE_SWITCH = "Symbol(NODE_SWITCH)"
  const NODE_SCROLLER = "Symbol(NODE_SCROLLER)"
  const NODE_REFRESH = "Symbol(NODE_REFRESH)"
  const NODE_LOADMORE = "Symbol(NODE_LOADMORE)"
  const ELEMNT_TAG_MAP = getElementTagMap();
  function getElementTagMap() {
    let tagMap = new Map();
    tagMap.set(NODE_VIEW, 'view');
    tagMap.set(NODE_TEXT, 'text');
    tagMap.set(NODE_IMAGE, 'image');
    tagMap.set(NODE_BUTTON, 'button');
    tagMap.set(NODE_TEXTAREA, 'textarea');
    tagMap.set(NODE_INPUT, 'input');
    tagMap.set(NODE_SWITCH, 'switch');
    tagMap.set(NODE_SCROLLER, 'scroller');
    tagMap.set(NODE_REFRESH, 'refresh');
    tagMap.set(NODE_LOADMORE, 'loadmore');
    return tagMap;
  }
  function getViewData (container: any) {
    let simpleRoot = Object.create({})
    let viewMap = Object.create({})
    const treeTraveler = function(node: any, rootView: any) {
      processView(node, rootView, viewMap)
      if (node.children && node.children.size > 0) {
        rootView.children = Array.apply(null, new Array(node.children.size)).map( () => {return {}})
        let arr = Array.from(node.children)
        arr.forEach((n, i) => {
          treeTraveler(n, rootView.children[i])
        })
      }
    }
    treeTraveler(container, simpleRoot)
    return {
      simpleRoot,
      viewMap
    }
  }
  const processView = function(node: any, rootView: any, viewMap: any) {
    rootView.__view_id = node.__view_id
    rootView.name = node.__NAME && ELEMNT_TAG_MAP.get(node.__NAME.toString()) || 'template'
    switch (rootView.name) {
      case 'text':
        rootView.text = node._text
        break;
      case 'image':
        rootView.src = node._src
        break;
      default:
        break;
    }
    viewMap[rootView.__view_id] = node
  }
  getViewData(container)

  if(NODE_DEBUG_ENV){
    // dev环境开启devtool
    require('@hummer/tenon-dev-tool').run(container)
  }
}

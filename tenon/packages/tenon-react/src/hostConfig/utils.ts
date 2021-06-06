import {Base as Element, isNotHasChilrenTag, isWithTextTag} from "@hummer/tenon-core"

import {parseStringStyle, styleTransformer} from '@hummer/tenon-utils'
import { isEventProp, getEventName, getListener } from "src/events";

const CHILDREN = 'children';
const CLASS_NAME = 'className';

export function diffProperties(node:Element, type: string, oldProps: any, newProps: any){
  // TODO 使用 Object 存储 updatePayload，后面可以重构成 ReactDom类似的 Array

  const updatePayload: null | any = {};
  let lastProps:any = oldProps;
  let nextProps:any = newProps;
  let propKey: string;

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  // TODO Add Style Optimize
  for (propKey in lastProps) {
    if(typeof lastProps[propKey] === 'function' && typeof nextProps[propKey] === 'function'){
      // 针对 Event 特殊处理，增加 invoker的判断，用于解决事件重复赋值的问题
      nextProps[propKey].invoker = lastProps[propKey]
    }
    if (
      hasOwnProperty.call(nextProps, propKey) ||
      !hasOwnProperty.call(lastProps, propKey) ||
      lastProps[propKey] == null
    ) {
      continue;
    }
    updatePayload[propKey] = propKey === CLASS_NAME ? '' : null;
  }

  for(propKey in nextProps){
    const nextProp = nextProps[propKey]
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if(!hasOwnProperty.call(nextProps, propKey) || nextProp === lastProp || (nextProp == null && lastProp == null)){
      continue
    }
    if(propKey === CHILDREN){
      if (lastProp !== nextProp) {
        updatePayload[propKey] = nextProp;
      }
    }else{
      updatePayload[propKey] = nextProp;
    }
  }

  return Object.keys(updatePayload).length > 0 ? updatePayload : null;
}

export function processProps(props:any, type:string, node:Element){
  if(isWithTextTag(type)){
    if(typeof props.children === 'string' || typeof props.children === 'number'){
      // Fix: 修复<text>0</text> 不能显示的问题
      node.setElementText("" + props.children)
    }else if(typeof props.children === 'object'){
      node.setElementText(props.children.join(''))
    }
  }
  Object.keys(props).forEach((key:string) => {
    if(key === 'children'){
      return
    }
    // TODO 支持动态 Remove Listener
    if(typeof props[key] === 'function' && isEventProp(key)){
      handleEvent(key, props[key], node)
    }
    switch(key){
      case 'style':
        handleStyle(props.style, node)
        break;
      default:
        node.setAttribute(key, props[key])
        break;
    }
  })
}
export function shouldSetTextContent(type:string):boolean{
  return isNotHasChilrenTag(type)
}

function handleStyle(styleValue:any, node:Element){
  let style = styleValue
  if(typeof style === 'string'){
    style = parseStringStyle(style)
  }
  // 
  style = styleTransformer.transformStyle(style, node);
  node.setStyle(style, true)
}

// TODO Refactor Event Handler To Solve "Repeatedly add delete listeners".
function handleEvent(propName: string, value: any, node:Element){
  let eventName = getEventName(propName)
  let listener:any = getListener(value)
  console.log('Add Event Listener', propName)
  let oldListener = listener.invoker
  listener.invoker = null

  if(oldListener){
    node.removeEventListener(eventName,oldListener)
  }
  node.addEventListener(eventName, listener)
}

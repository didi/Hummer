import {Base as Element, isNotHasChilrenTag, isWithTextTag} from "@hummer/tenon-core"

import {parseStringStyle, styleTransformer} from '@hummer/tenon-utils'
import { isEventProp, getEventName, getListener } from "src/events";

const CHILDREN = 'children'
const STYLE = 'style'
const CLASSNAME = 'className'
const CLASS = 'class'
const randomKey = Math.random()
  .toString(36)
  .slice(2);
const internalPropsKey = '__reactProps$' + randomKey;

export type Props = any
export function diffProperties(node:Element, type: string, oldProps: any, newProps: any){

  let updatePayload: null | Array<any> = null;
  let lastProps:any = oldProps;
  let nextProps:any = newProps;
  let propKey: string;

  const hasOwnProperty = Object.prototype.hasOwnProperty;
  // TODO Add Style Optimize
  for (propKey in lastProps) {
    if (
      hasOwnProperty.call(nextProps, propKey) ||
      !hasOwnProperty.call(lastProps, propKey) ||
      lastProps[propKey] == null
    ) {
      continue;
    }
    if(isEventProp(propKey)){
      if(!updatePayload){
        updatePayload = []
      }
    }else{
      (updatePayload = updatePayload || []).push(propKey, null)
    }
  }

  for(propKey in nextProps){
    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (
      !nextProps.hasOwnProperty(propKey) ||
      nextProp === lastProp ||
      (nextProp == null && lastProp == null)
    ) {
      continue;
    }
    if(isEventProp(propKey)){
      if(!updatePayload && lastProp !== nextProp){
        // Case: Hook Function ReRender
        updatePayload = []
      }
    }else if(propKey === CHILDREN){
      if (typeof nextProp === 'string' || typeof nextProp === 'number') {
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      }else if(isWithTextTag(type)){
        (updatePayload = updatePayload || []).push(propKey, nextProp)
      }
    }else{
      (updatePayload = updatePayload || []).push(propKey, nextProp)
    }
  }
  return updatePayload;
}

export function updateProperties(node: Element, type: string, updatePayload: Array<any>){
  for(let i =0; i< updatePayload.length; i+=2){
    const propKey = updatePayload[i];
    const propValue = updatePayload[i+1];
    if(propKey === STYLE){
      handleStyle(propValue, node)
    }else if(propKey === CHILDREN && isWithTextTag(type)){
      setTextContent(node, propValue);
    }else {
      node.setAttribute(propKey, propValue)
    }
  }
}

export function processProps(props:any, type:string, node:Element){
  if(isWithTextTag(type)){
    setTextContent(node, props.children)
  }
  Object.keys(props).forEach((key:string) => {
    if(key === 'children'){
      return
    }
    if(typeof props[key] === 'function' && isEventProp(key)){
      handleEvent(key, props[key], node)
      return
    }
    switch(key){
      case STYLE:
        handleStyle(props[key], node)
        break;
      case CLASS:
      case CLASSNAME:
        handleClassStyle(props[key], node)
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

export function getFiberCurrentPropsFromNode(node:Element):Props{
  return (node as any)[internalPropsKey] || null
}

export function updateFiberProps(node:Element, props: Props):void{
  (node as any)[internalPropsKey] = props
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

function handleClassStyle(classValue:any, node:Element){
  node.setClassStyle(classValue)
}

function handleEvent(propName: string, value: any, node:Element){
  let eventName = getEventName(propName)
  let listener:any = getListener(node, propName, value)
  node.addEventListener(eventName, listener)
}


function setTextContent(node:Element, children:any):void{
  if(typeof children === 'string' || typeof children === 'number'){
    // Fix: 修复<text>0</text> 不能显示的问题
    node.setElementText("" + children)
  }else if(typeof children === 'object'){
    node.setElementText(children.join(''))
  }
}
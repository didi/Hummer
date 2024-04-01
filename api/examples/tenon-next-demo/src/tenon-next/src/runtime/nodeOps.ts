// import {Base} from './nodes/Base'
import { HummerElement as Base } from './../../../../../../packages/hummer-api/src/index'
import document from './nodes/document'

const insert = function(child:Base, parent:Base, anchor:Base) {
  if(!parent){
    return null
  }
  if(anchor !== null){
    parent.insertBefore(child, anchor)
  }else{
    parent.appendChild(child)
  }
}

const remove = function(child:Base){
  const parent = child.parentNode as Base;
  if(parent !== null){
    parent.removeChild(child);
  }
}

const createElement = function(tag:string){
  return document.createElement(tag);
}

const createText = function(text:string){
  return document.createText(text);
}

const createComment = function(comment:string){
  return document.createComment(comment);
}

const setText = function(node:Base, text: string){
  node.setElementText(text)
  // TODO: hummer api text类通过setElementText实现在文本嵌套的case
}

const setElementText = function(node:Base, text:string){
  node.setElementText(text)
}

const parentNode = function(node:Base){
  return node.parentNode ? node.parentNode: null
}

const nextSibling = function(node:Base){
  return node.nextSibling
}

const querySelector = function(selector:string){
  return null
}

const setScopeId = function(el:Base, id:string){
  el.setScopeId(id)
}


export const nodeOps = {
  insert,
  remove,
  createElement,
  createText,
  createComment,
  setText,
  setElementText,
  parentNode,
  nextSibling,
  querySelector,
  setScopeId
}


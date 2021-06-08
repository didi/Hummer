import {Base} from './nodes/Base'
import document from './nodes/document'

const insert = function(child:Base, parent:Base, anchor:Base) {
  if(!parent){
    return null
  }
  if(anchor !== null){
    parent._insertBefore(child, anchor)
  }else{
    parent._appendChild(child)
  }
}

const remove = function(child:Base){
  const parent = child.parent as Base;
  if(parent !== null){
    parent._removeChild(child);
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
}

const setElementText = function(node:Base, text:string){
  node.setElementText(text)
}

const parentNode = function(node:Base){
  return node.parent ? node.parent: null
}

const nextSibling = function(node:Base){
  return node.nextSibling
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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


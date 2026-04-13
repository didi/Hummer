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
  const parent = child.parent as Base | undefined;
  if(parent){
    parent._removeChild(child);
    return
  }

  // Fallback cleanup: node may already be detached from parent chain.
  const target = child as any
  if (typeof target._onDestoryed === 'function') {
    target._onDestoryed()
  }
  child.prevSibling = null
  child.nextSibling = null
  child.parent = undefined
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


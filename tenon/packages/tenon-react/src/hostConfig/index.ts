import {document, Base as Element} from "@hummer/tenon-core"
import {Props, diffProperties, processProps, updateProperties, shouldSetTextContent, updateFiberProps} from './utils'

type Container = {}

export default {
  getPublicInstance:<T>(instance: T):T=>{
    return instance
  },

  getRootHostContext(){
    return {

    }
  },

  getChildHostContext(){
    return {

    }
  },

  shouldSetTextContent(type: string, nextProps: any): boolean {
    // TODO 
    return shouldSetTextContent(type)
  },

  prepareForCommit(){

  },

  resetAfterCommit: (container: Container) => {
   
  },

  createInstance(type: string, newProps: any, container: Container):Element {
    const element = document.createElement(type) as any;
    updateFiberProps(element, newProps);
    return element;
  },

  createTextInstance(text: string, container: Container):Element {
    console.log('createTextInstance:', text)
    const element = document.createText(text);
    return element
  },

  commitTextUpdate(node:Element, oldText:string, newText:string){
    console.log('CommitTextUpdate:', oldText, newText)
    if(oldText !== newText){
      node.setElementText(newText)
    }
  },

  prepareUpdate(node:Element, type:string, oldProps:Props, newProps: Props){
    return diffProperties(
      node,
      type,
      oldProps,
      newProps
    ); 
  },

  commitUpdate(node:Element, updatePayload:any, type:string, oldProps: Props, newProps: Props){
    updateFiberProps(node, newProps);
    updateProperties(node,type, updatePayload)
  },

  commitMount(node:Element, updatePayload:any, type:string, props: Props){
    // TODO 更新处理
  },


  appendInitialChild(parent:Element, child: Element){
    parent.appendChild(child)
  },

  appendChild(parent:Element, child: Element){
    parent.appendChild(child)
  },

  insertBefore(parent:Element, child: Element, anchor: Element){
    parent.insertBefore(child, anchor)
  },

  removeChild(parent:Element, child:Element){
    parent.removeChild(child)
  },

  finalizeInitialChildren(node:Element, type: string, props:Props):Boolean{
    processProps(props,type, node);
    return false
  },

  appendChildToContainer(container:any, child:Element){
    container.appendChild(child)
  },

  insertInContainerBefore(container:any, child:Element, anchor: Element){
    container.insertBefore(child, anchor)
  },

  removeChildFromContainer(container:any, child:Element){
    container.removeChild(child)
  },

  hideInstance(node: Element) {
    node.hide()
  },

  hideTextInstance(node: Element){
    node.setElementText("")
  },

  unhideInstance(node: Element){
    // TODO unhide
  },

  unhideTextInstance(node:Element, text:string){
    node.setElementText(text)
  },

  clearContainer(container:any){
    container = null
  }
}


import { HummerElement } from './../HummerElement';

export interface FixedNode {
  // id: number,
  node: HummerElement
  parents: null | Set<number>
}

// 为了便于根据 __view_id 查询对应的节点，空间换时间。为 Fixed 元素的收集服务。
// export const ViewCache:WeakMap<Base, number> = new WeakMap(); 

export const FixedViewCache:Map<number, FixedNode> = new Map<number, FixedNode>();


export const handleFixedNodeByStyle = (node:HummerElement, newStyle:Record<string, string>):Boolean =>{
  let oldPosition = node.style &&  node.style.position;
  let newPosition = newStyle && newStyle.position;
  if(newPosition === 'fixed'){
    registerFixedNode(node)
    return true
  }
  if(oldPosition === 'fixed' && newPosition !== 'fixed'){
    unRegisterFixedNode(node)
    return false
  }
  return false
}

export const registerFixedNode = (node:HummerElement) => {
  let fixedNode = {
    node,
    parents: node.parentNode? getParentIds(node): null 
  }
  FixedViewCache.set(node.__view_id, fixedNode)
}

export const unRegisterFixedNode = (node:HummerElement) => {
  let {__view_id:id} = node
  FixedViewCache.delete(id)
}

export const updateFixedNodeParents = () => {
  FixedViewCache.forEach((fixedNode: FixedNode) => {
    let {node} = fixedNode
    if(fixedNode.parents === null){
      fixedNode.parents = getParentIds(node)
    }
  })
}
export const removeChildWithFixed = (node:HummerElement) => {
  let {__view_id} = node
  FixedViewCache.forEach((fixedNode: FixedNode) => {
    let {node: iNode, parents} = fixedNode
    if(fixedNode.parents === null){
      parents = fixedNode.parents = getParentIds(iNode)
    }
    if(parents && parents.has(__view_id)){
      deleteNode(iNode)
    }
    if(node === iNode){
      FixedViewCache.delete(__view_id)
    }
  })
  // deleteCacheNode(node);
}

/**
 * 获取节点的所有Parents
 * @param node 
 */
function getParentIds(node: HummerElement):Set<number>{
  let ids = new Set<number>();
  // let node = ViewCache.get(id);
  let iNode: HummerElement | undefined = node
  while(iNode){
    if(iNode.parentNode){
      ids.add((iNode.parentNode as HummerElement).__view_id)
    }
    iNode = iNode.parentNode as HummerElement
  }
  return ids
}

/**
 *  删除节点
 * @param node Base
 */
function deleteNode(node: HummerElement){
  // let node = ViewCache.get(id);
  let {__view_id} = node
  if(node && node.parentNode){
    node.parentNode.removeChild(node);
  }
  FixedViewCache.delete(__view_id);
}
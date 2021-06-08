import {Base} from '../nodes';

export interface FixedNode {
  id: number,
  parents: null | Set<number>
}

// 为了便于根据 __view_id 查询对应的节点，空间换时间。为 Fixed 元素的收集服务。
export const ViewCache:Map<number, Base> = new Map(); 

export const FixedViewCache:Map<number,FixedNode> = new Map<number,FixedNode>();

export const setCacheNode = (node:Base) => {
  ViewCache.set(node.__view_id, node);
}

export const deleteCacheNode = (node:Base) => {
  ViewCache.delete(node.__view_id);
}

export const handleFixedNodeByStyle = (node:Base, newStyle:Record<string, string>):boolean =>{
  const oldPosition = node.style.position;
  const newPosition = newStyle.position;
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

export const registerFixedNode = (node:Base) => {
  const fixedNode = {
    id: node.__view_id,
    parents: node.parent? getParentIds(node.__view_id): null 
  }
  FixedViewCache.set(node.__view_id, fixedNode)
}

export const unRegisterFixedNode = (node:Base) => {
  const {__view_id:id} = node
  FixedViewCache.delete(id)
}

export const updateFixedNodeParents = () => {
  FixedViewCache.forEach((fixedNode: FixedNode) => {
    const {id} = fixedNode
    if(fixedNode.parents === null){
      fixedNode.parents = getParentIds(id)
    }
  })
}
export const removeChildWithFixed = (node:Base) => {
  const {__view_id} = node
  FixedViewCache.forEach((fixedNode: FixedNode) => {
    let {id, parents} = fixedNode
    if(fixedNode.parents === null){
      parents = fixedNode.parents = getParentIds(id)
    }
    if(parents && parents.has(__view_id)){
      deleteNodeByViewId(id)
    }
    if(id === __view_id){
      FixedViewCache.delete(id)
    }
  })
  deleteCacheNode(node);
}

/**
 * 获取节点的所有Parents
 * @param node 
 */
function getParentIds(id:number):Set<number>{
  const ids = new Set<number>();
  let node = ViewCache.get(id);
  while(node){
    if(node.parent){
      ids.add(node.parent.__view_id)
    }
    node = node.parent
  }
  return ids
}

/**
 * 根据 ViewId 删除节点
 * @param id ViewId
 */
function deleteNodeByViewId(id: number){
  const node = ViewCache.get(id);
  if(node && node.parent){
    node.parent._removeChild(node);
  }
  FixedViewCache.delete(id);
}
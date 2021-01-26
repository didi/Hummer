import { NodeTransform, NodeTypes } from '@vue/compiler-core'

/**
 * 去除Comment节点
 * @param node 当前节点
 * @param context 上下文
 */
export const transformComment: NodeTransform = (node, context) => {
  if(node.type === NodeTypes.COMMENT){
    context.removeNode(node)
  }
}

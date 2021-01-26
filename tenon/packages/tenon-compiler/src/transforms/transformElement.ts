import { NodeTransform, NodeTypes, buildSlots, createSimpleExpression} from '@vue/compiler-core'
import {isCustomNativeTag} from '@hummer/tenon-utils'
// 处理内置组件
export const transformElement:NodeTransform = (node:any, context:any) => {
  return function(){
    if(node.type === NodeTypes.ELEMENT){
      const { tag, props } = node

      if(isCustomNativeTag(tag)){
        // Handle Slots
        let {slots} = buildSlots(node, context)
        props.push({
          type: NodeTypes.DIRECTIVE,
          name: 'bind',
          arg: createSimpleExpression(`render`, true),
          exp: slots,
          modifiers: []
        })
        node.children = []
      }
    }
  }

}

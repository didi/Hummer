import { NodeTransform, NodeTypes} from '@vue/compiler-core'
import { camelize } from '@hummer/tenon-utils'
// 处理内置组件的参数和事件
export const transformProps:NodeTransform = (node:any) => {
  return function(){
    if(node.type === NodeTypes.ELEMENT){
      const { props } = node
      props.forEach((p: any) => {
        if(p.type === NodeTypes.ATTRIBUTE) {
            p.name = camelize(p.name)
        }
        if(p.type === NodeTypes.DIRECTIVE && p.name === 'bind') {
            p.arg.content = camelize(p.arg.content)
        }
        if(p.type === NodeTypes.DIRECTIVE && p.name === 'on' && p.arg.content === 'click') {
            p.arg.content = 'tap'
        }
    })
    }
  }
}
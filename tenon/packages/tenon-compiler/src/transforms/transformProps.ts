import { NodeTransform, NodeTypes} from '@vue/compiler-core'
import { camelize, isNativeTags } from '@hummer/tenon-utils'
// 处理内置组件的参数和事件
export const transformProps:NodeTransform = (node:any) => {
  return function(){
    const { props, tag, type } = node
    if(type === NodeTypes.ELEMENT){
      props.forEach((p: any) => {
        //FIXME: 自定义ex-开头的组件也支持驼峰设置的时候删除isNativeTags判断
        if(isNativeTags(tag)) {
          if(p.type === NodeTypes.ATTRIBUTE) {
            p.name = camelize(p.name)
          }
          if(p.type === NodeTypes.DIRECTIVE && p.name === 'bind' && p.arg && p.arg.isStatic) {
              p.arg.content = camelize(p.arg.content)
          }
        }
        if(p.type === NodeTypes.DIRECTIVE && p.name === 'on' && p.arg.content === 'click') {
            p.arg.content = 'tap'
        }
    })
    }
  }
}
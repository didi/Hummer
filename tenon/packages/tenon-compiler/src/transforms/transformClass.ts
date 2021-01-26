import {NodeTransform, NodeTypes, createSimpleExpression, SourceLocation, SimpleExpressionNode} from '@vue/compiler-core'

export const transformClass:NodeTransform = (node:any, context:any) => {
  if(node.type === NodeTypes.ELEMENT){
    node.props.forEach((p:any, index:number) => {
      if(p.type === NodeTypes.ATTRIBUTE && p.name === 'class' && p.value){
        node.props[index] = {
          type: NodeTypes.DIRECTIVE,
          name: 'bind',
          arg: createSimpleExpression(`class`, true, p.loc),
          exp: parseInlineClass(p.value.content, p.loc, context),
          modifiers: [],
          loc: p.loc
        }
      }
    })
  }
}

const parseInlineClass = (
  classText: string,
  loc: SourceLocation,
  context: any
): SimpleExpressionNode => {
  return createSimpleExpression(JSON.stringify(classText), false, loc)
}

import {NodeTransform, NodeTypes, createSimpleExpression, SourceLocation, SimpleExpressionNode} from '@vue/compiler-core'
import {parseStringStyle} from '@hummer/tenon-utils'

export const transformStyle:NodeTransform = (node:any) => {
  if(node.type === NodeTypes.ELEMENT){
    node.props.forEach((p:any, index:number) => {
      if(p.type === NodeTypes.ATTRIBUTE && p.name === 'style' && p.value){
        node.props[index] = {
          type: NodeTypes.DIRECTIVE,
          name: 'bind',
          arg: createSimpleExpression(`style`, true, p.loc),
          exp: parseInlineCSS(p.value.content, p.loc),
          modifiers: [],
          loc: p.locr
        }
      }
    })
  }
}

const parseInlineCSS = (
  cssText: string,
  loc: SourceLocation
): SimpleExpressionNode => {
  const normalized = parseStringStyle(cssText)
  return createSimpleExpression(JSON.stringify(normalized), false, loc)
}

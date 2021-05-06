import {
  baseCompile,
  baseParse,
  CompilerOptions,
  CodegenResult,
  ParserOptions,
  RootNode,
  NodeTransform,
  DirectiveTransform
} from '@vue/compiler-core'
import {extend} from '@hummer/tenon-utils'
import {parserOptions} from './parserOptions'
import {transformStyle} from './transforms/transformStyle'
import {transformClass} from './transforms/transformClass'
import {transformShow } from './transforms/vShow'
import {transformModel} from './transforms/vModel'
import {transformAnimation} from './transforms/vAnimation'
import {transformComment} from './transforms/transformComment'
import {transformElement} from './transforms/transformElement'
import {transformProps} from './transforms/transformProps'
export const DOMDirectiveTransforms: Record<string, DirectiveTransform> = {
  show: transformShow,
  model: transformModel,
  animation: transformAnimation
}

export const NodeTransforms: (NodeTransform | any)[] = [
  transformComment,
  transformStyle,
  transformClass,
  transformElement,
  transformProps
]
export function compile(template:string, options:CompilerOptions):CodegenResult{
  return baseCompile(
    template,
    extend({}, parserOptions, options, {
      cacheHandlers: false,
      nodeTransforms: [
        ...NodeTransforms
      ],
      directiveTransforms: extend({}, DOMDirectiveTransforms, options.directiveTransforms || {})
    })
  )
}

export function parse(template:string, options:ParserOptions):RootNode{
  return baseParse(template, extend({}, parserOptions, options))
}


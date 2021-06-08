import {
  transformModel as baseTransform,
  DirectiveTransform,
  ElementTypes,
  findProp,
  NodeTypes,
} from '@vue/compiler-core'
import { createDOMCompilerError, DOMErrorCodes } from '../errors'
import {
  V_MODEL_TEXT,
  V_MODEL_SWITCH
} from '../runtimeHelpers'

export const transformModel: DirectiveTransform = (dir, node, context) => {
  const baseResult = baseTransform(dir, node, context)
  // base transform has errors OR component v-model (only need props)
  if (!baseResult.props.length || node.tagType === ElementTypes.COMPONENT) {
    return baseResult
  }

  if (dir.arg) {
    context.onError(
      createDOMCompilerError(
        DOMErrorCodes.X_V_MODEL_ARG_ON_ELEMENT,
        dir.arg.loc
      )
    )
  }

  function checkDuplicatedValue() {
    const value = findProp(node, 'value')
    if (value) {
      context.onError(
        createDOMCompilerError(
          DOMErrorCodes.X_V_MODEL_UNNECESSARY_VALUE,
          value.loc
        )
      )
    }
  }

  const { tag } = node
  if (tag === 'input' || tag === 'textarea') {
    const directiveToUse = V_MODEL_TEXT
    const isInvalidType = false
    if (tag === 'input') {
      __DEV__ && checkDuplicatedValue()
    }else if (tag === 'textarea') {
      __DEV__ && checkDuplicatedValue()
    }
    if (!isInvalidType) {
      baseResult.needRuntime = context.helper(directiveToUse)
    }
  }else if(tag === 'switch'){
    const directiveToUse = V_MODEL_SWITCH
    baseResult.needRuntime = context.helper(directiveToUse)
  } else {
    context.onError(
      createDOMCompilerError(
        DOMErrorCodes.X_V_MODEL_ON_INVALID_ELEMENT,
        dir.loc
      )
    )
  }

  // native vmodel doesn't need the `modelValue` props since they are also
  // passed to the runtime as `binding.value`. removing it reduces code size.
  baseResult.props = baseResult.props.filter(p => {
    if (
      p.key.type === NodeTypes.SIMPLE_EXPRESSION &&
      p.key.content === 'modelValue'
    ) {
      return false
    }
    return true
  })

  return baseResult
}

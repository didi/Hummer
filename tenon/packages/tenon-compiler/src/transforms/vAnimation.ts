import { DirectiveTransform } from '@vue/compiler-core'
import { createDOMCompilerError, DOMErrorCodes } from '../errors'
import { V_ANIMATION } from '../runtimeHelpers'

export const transformAnimation: DirectiveTransform = (dir, node, context) => {
  const { exp, loc } = dir
  if (!exp) {
    context.onError(
      createDOMCompilerError(DOMErrorCodes.X_V_SHOW_NO_EXPRESSION, loc)
    )
  }
  return {
    props: [],
    needRuntime: context.helper(V_ANIMATION)
  }
}

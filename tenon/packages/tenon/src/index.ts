import { registerRuntimeCompiler, RenderFunction } from '@hummer/tenon-vue'
import {compile} from '@hummer/tenon-compiler'

import * as Tenon from '@hummer/tenon-vue'

function compileToFunction(
  template: string
):RenderFunction{
  let {code} = compile(
    template,
    {
      hoistStatic: true
    }
  )
  const render = new Function('Vue', code)(Tenon) as any
  console.log('code:', code)
  render._rc = true
  return  render
}
registerRuntimeCompiler(compileToFunction)

export * from '@hummer/tenon-vue'


import {transformAttr} from './transformer/attrname'
import {transformColor} from './transformer/color'
import {transformUnit} from './transformer/unit'
import {transformBreakToken} from './transformer/break-token'
import {transformBorder} from './transformer/border'
import {transformShadow} from './transformer/shadow'
import {transformAdapter} from './transformer/adapter'
import {transformBackground} from './transformer/background'
import {transformFlex} from './transformer/flex'
import {transformTransform} from './transformer/transform'
import {transformTransition} from './transformer/transition'

import {dynamicTransformAdapter} from './dynamic-transformer/adapter'

class StyleTransformer{

  private middlewares: Array<Function> = []
  constructor(){
    this.registerMiddleware()
  }

  registerMiddleware(){
    this
    .use(transformAdapter)
    .use(transformBreakToken)
    .use(transformBackground)
    .use(transformTransform)
    .use(transformTransition)
    .use(transformFlex)
    .use(transformBorder)
    .use(transformShadow)
    .use(transformColor)
    .use(transformUnit)
    .use(transformAttr)
  }

  use(middleware: Function){
    if(typeof middleware !== 'function'){
      throw "middleware must be a function"
    }
    this.middlewares.push(middleware)
    return this
  }

  transformStyle(style:Record<string, string> = {}, view?:any):Record<string, string>|null{
    let tempStyle = style
    this.middlewares.forEach(middleware => {
      let result = middleware(tempStyle, view)
      tempStyle = result? result: tempStyle
    })
    return tempStyle
  }

}
class StyleDynamicTransformer{

  private middlewares: Array<Function> = []
  constructor(){
    this.registerMiddleware()
  }

  registerMiddleware(){
    this
    .use(dynamicTransformAdapter)
  }

  use(middleware: Function){
    if(typeof middleware !== 'function'){
      throw "middleware must be a function"
    }
    this.middlewares.push(middleware)
    return this
  }

  transformStyle(style:Record<string, string> = {}, view?:any):Record<string, string>|null{
    let tempStyle = style
    this.middlewares.forEach(middleware => {
      let result = middleware(tempStyle, view)
      tempStyle = result? result: tempStyle
    })
    return tempStyle
  }

}

export const styleTransformer = new StyleTransformer()
export const styleDynamicTransformer = new StyleDynamicTransformer()

export {transformUnitValue} from './transformer/unit'
export {getColor} from './common/color'
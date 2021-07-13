import {Base} from '@hummer/tenon-react'

import {Text} from '@hummer/hummer-front'

const AttrViewKey = {
  VALUE: 'value'
}
/**
 * 普通的属性处理原生组件
 */
class AttrView extends Base{
  constructor(){
    super()
    this._initialize()
  }
  _initialize(){
    this._initElement()
  }

  _initElement(){
    this.element = new Text()
    this.element.text = 'Init Text'
  }

  _setAttribute(key, value){
    switch(key){
      case AttrViewKey.VALUE:
        this.element.text = value
        break
      default:
        break
    }
  }
}

export default {
  name: 'attr-view',
  factory(){
    let attrView = new AttrView();
    return attrView
  }
}
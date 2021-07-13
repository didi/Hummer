import {Base} from '@hummer/tenon-react'

import {Text} from '@hummer/hummer-front'

/**
 * 普通的纯视图组件
 */
class SimpleView extends Base{
  constructor(){
    super()
    this._initialize()
  }
  _initialize(){
    // 初始化
    this._initElement()
  }

  _initElement(){
    this.element = new Text()
    this.element.text = 'I am a simple view!'
  }
}

export default {
  name: 'simple-view',
  factory(){
    let simpleView = new SimpleView();
    return simpleView
  }
}
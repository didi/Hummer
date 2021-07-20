import {Base} from '@hummer/tenon-react'

import {Text} from '@hummer/hummer-front' // const {Text} = __GLOBAL__ 

/**
 * 支持原生事件传递的视图
 * 支持外部注册 Change 事件，然后 Value 属性改变的时候，触发 Change 事件。
 */
class EventView extends Base{
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
    this.changeListener = () => {}
  }

  _setAttribute(key, value){
    switch(key){
      case 'value':
        this.element.text = value
        this.changeListener.call(this, value) // Value 值首次触发的时候，不会触发 ChangeListener，由于此时 ChangeListener 尚未赋值
        break
      default:
        break
    }
  }

  addEventListener(event, func){
    switch(event){
      case 'change':
        this.changeListener = (value) => {
          func.call(this, value)
        }
        break;
      default:
        break;
    }
  }

}

export default {
  name: 'event-view',
  factory(){
    let eventView = new EventView();
    return eventView
  }
}
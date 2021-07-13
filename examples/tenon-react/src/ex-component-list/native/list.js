import {Base, View} from '@hummer/tenon-react'
const {List}  = __GLOBAL__


/**
 * <ex-list>
 *  <list-item></list-item>
 *  <list-item></list-item>
 *  <list-item></list-item>
 *  <list-item></list-item>
 * </ex-list>
 */
class ExList extends Base{
  constructor(){
    super()
    this.style = {} 
    this._initialize()
  }

  _initialize(){
    // 初始化
    this._initElement()
  }

  _initElement(){
    let list = new List()
    this.element = list
    this.element.style = {
      width: '1px'
    }
  }

  appendChild(){

  }
}

export default {
  name: 'list',
  factory(){
    let component = new ExList()
    return component
  }
}
import {Text as TextComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_TEXT} from '@hummer/tenon-utils'
export class Text extends Base{
  __NAME = NODE_TEXT
  private _text:string = ''
  constructor(){
    super()
    this.element = new TextComponent()
    // FIXME: 原生实现appendChild和insertBefore后删除
    if(!this.element.appendChild) {
      this.element.appendChild = this._setNodeText.bind(this)
    }
    if(!this.element.insertBefore) {
      this.element.insertBefore = this._setNodeText.bind(this)
    }
  }

  // FIXME: 去除 Hack SetElementText方法，直接操作属性即可
  setElementText(text:string){
    this._text = text
    this.element.text = text
  }

  // 文案
  get text(){
    return this._text
  }
  set text(text:string){
    this._text = text
    this.element.text = text
  }

  set richText(value: Array<String>){
    this.element.richText = value
  }

  // FIXME: 原生实现appendChild和insertBefore后删除
  _setNodeText (text: string | any) {
    if(typeof text !== 'string') {
      if(!text._text) return
      this.text = text._text
    } else {
      this.text = text
    }
  }

  _setAttribute(key:string, value: any){
    switch(key){
      case 'richText':
        this.richText = value
        break;
      default:
        break;
    }
  }
}
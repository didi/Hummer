import {Text as TextComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_TEXT} from '@hummer/tenon-utils'
export class Text extends Base{
  __NAME = NODE_TEXT
  private _text:string = ''
  constructor(){
    super()
    this.element = new TextComponent()
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
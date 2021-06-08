import {Text as TextComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_TEXT} from '@hummer/tenon-utils'

export interface TextProps {
  text: string
  richText: string[]
}

export class Text extends Base<TextProps>{
  __NAME = NODE_TEXT
  private _text = ''
  constructor(){
    super()
    this.element = new TextComponent()
  }

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

  set richText(value: string[]){
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
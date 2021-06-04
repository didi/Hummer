import {Button as ButtonComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_BUTTON, styleTransformer} from '@hummer/tenon-utils'

export class Button extends Base{
  __NAME = NODE_BUTTON
  private _text: string = ''
  constructor(){
    super()
    this.element = new ButtonComponent()
  }
  setElementText(text: string){
    this.text = text
  }

  // 按钮文案
  get text(){
    return this._text
  }
  set text(text:string){
    this._text = text
    this.element.text = text
  }

  set pressedStyle(style: Record<string, string>){
    this.element.pressed = styleTransformer.transformStyle(style, this) || {}
  }

  set disabledStyle(style: Record<string, string>){
    this.element.disabled = styleTransformer.transformStyle(style, this) || {}
  }


  /**
   * 重写父类属性
   */
  _setAttribute(key:string, value: any){
    switch(key){
      case 'disabled':
        this.disabled = value
        break;
      case 'disabledStyle':
        this.disabledStyle = value
        break;
      case 'pressedStyle':
        this.pressedStyle = value
        break;
      default:
        break;
    }
  }
}
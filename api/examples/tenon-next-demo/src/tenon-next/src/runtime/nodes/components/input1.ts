import {Input as InputComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_INPUT} from '@hummer/tenon-utils'

export  class Input extends Base{
  __NAME = NODE_INPUT
  private _input: Function|null = null
  private _change: Function|null = null
  private _focus: Function|null = null
  private _blur: Function|null = null
  private _confirm: Function|null = null
  private _hasInput: Boolean = false
  constructor(){
    super()
    this.element = new InputComponent()
  }

  // 当前元素值
  get value():(string| number){
    return this.element.text || ''
  }
  set value(value: string | number){
    this.element.text = value
  }

  // 是否处于激活状态
  get focused(){
    return this.element.focused || false
  }
  set focused(value:Boolean){
    this.element.focused = value !== false
  }

  // 占位提示文本
  get placeholder(){
    return this.element.placeholder || ''
  }
  set placeholder(text:string){
    this.element.placeholder = text
  }

  set type(value:string){
    this.element.style = {
      type:value
    }
  }

  set returnKeyType(value:string){
    this.element.style = {
      returnKeyType:value
    }
  }

  set maxLength(value:string){
    this.element.style = {
      maxLength:value
    }
  }

  _setAttribute(key:string, value: any){
    switch(key){
      case 'value':
        this.value = value
        break;
      case 'placeholder':
        this.placeholder = value
        break;
      case 'focused':
        this.focused = value
        break;
      case 'type':
        this.type = value
        break;
      case 'maxLength':
        this.maxLength = value
        break;
      case 'returnKeyType':
        this.returnKeyType = value
        break;
      default:
        break;
    }
  }

  addEventListener(event: string, func:Function){
    var handler = (text:string) => {
      func.call(this, text)
    }
    switch(event){
      case 'input':
        this._input = handler
        break;
      case 'change':
        this._change = handler
        break;
      case 'focus':
        this._focus = handler
        break;
      case 'blur':
        this._blur = handler
        break;
      case 'confirm':
        this._confirm = handler
        break;
      default:
        break;
    }
    this.initListener()
  }
  removeEventListener(event: string){
    switch(event){
      case 'input':
        this._input = null
        this._hasInput = false
        break;
      case 'change':
        this._change = null
        break;
      case 'focus':
        this._focus = null
        break;
      case 'blur':
        this._blur = null
        break;
      case 'confirm':
        this._confirm = null
        break;
      default:
        break;
    }
  }

  private initListener(){
    if(this._hasInput){
      return;
    }
    this.element.addEventListener('input', (event:any) => {
      let {state, text} = event
      switch(state){
        case 1:
          this._focus && this._focus(text)
          break;
        case 2:
          this._change && this._change(text)
          break;
        case 3:
          this._blur && this._blur(text)
          break;
        case 4:
          this._confirm && this._confirm(text)
          break; 
        default:
          break; 
      }
      this._input && this._input({value: text, text: text, state})
    })
    this._hasInput = true
  }
}
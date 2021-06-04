import {Switch as SwitchComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_SWITCH} from '@hummer/tenon-utils'

export class Switch extends Base{
  __NAME = NODE_SWITCH
  constructor(){
    super()
    this.element = new SwitchComponent()
  }

  get value():(Boolean){
    return this.element.checked
  }
  set value(value: Boolean){
    this.element.checked = value
  }

  set onColor(value: string){
    this.element.style = {
      onColor:value
    }
  }
  set offColor(value: string){
    this.element.style = {
      offColor:value
    }
  }
  set thumbColor(value: string){
    this.element.style = {
      thumbColor:value
    }
  }

  _setAttribute(key:string, value: any){
    switch(key){
      case 'value':
        this.value = value
        break;
      case 'openColor':
        this.onColor = value
        break;
      case 'closeColor':
        this.offColor = value
        break;
      case 'thumbColor':
        this.thumbColor = value
        break;
      default:
        break;
    }
  }

  addEventListener(event: string, func:Function){
    if(event === 'switch'){
      let invoker = (e:any) => {
        let {state} = e
        let value = (state === 1 || state === true)?true:false //  Android state true/false; iOS state 1/0；
        func.call(this, value)
      }
      this.element.addEventListener(event, invoker)
    }
  }
  removeEventListener(event: string, func?:Function){
    this.element.removeEventListener(event, func)
  }

}
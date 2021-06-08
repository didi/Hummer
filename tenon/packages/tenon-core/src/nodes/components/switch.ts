import {EventType, Switch as SwitchComponent, EventListener as HummerEventListener} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_SWITCH} from '@hummer/tenon-utils'

export interface SwitchProps {
  checked: boolean;
  style: Record<string, any>
}

export class Switch extends Base<SwitchProps>{
  __NAME = NODE_SWITCH
  constructor(){
    super()
    this.element = new SwitchComponent()
  }

  get value():(boolean){
    return this.element.checked
  }
  set value(value: boolean){
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
      const invoker = (e:any) => {
        const {state} = e
        const value = (state === 1 || state === true)?true:false //  Android state true/false; iOS state 1/0；
        func.call(this, value)
      }
      this.element.addEventListener(event, invoker)
    }
  }
  removeEventListener(event: EventType, listener: HummerEventListener){
    this.element.removeEventListener(event, listener)
  }

}
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
    this.element.checked = value !== false
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
      case 'open-color':
        this.onColor = value
        break;
      case 'close-color':
        this.offColor = value
        break;
      case 'thumb-color':
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
        let value = state === 1?true:false
        func.call(this, value)
      }
      this.element.addEventListener(event, invoker)
    }
    
  }
  removeEventListener(event: string, func?:Function){
    this.element.removeEventListener(event, func)
  }

}
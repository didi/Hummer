import {Base} from '../runtime/nodes'
export enum InputEventState{
  BEGIN=1,
  CHANGED=2,
  ENDED=3,
  CONFIRMED=4
}

export enum SwitchEventState{
  CLOSE=0,
  OPEN=1
}
export interface InputEvent extends EventListener{
  type: string,
  state: InputEventState,
  timestamp: number,
  text: string
}

export interface SwitchEvent extends EventListener{
  type: string,
  state: SwitchEventState,
  timestamp: number
}

export interface EventListener {
  (evt: any): void;
}

export function addEventListener(el:Base, event: string, handler: EventListener){
  el.addEventListener(event, handler)
}
export function removeEventListener(el:Base, event: string, handler: EventListener){
  el.removeEventListener(event, handler)
}

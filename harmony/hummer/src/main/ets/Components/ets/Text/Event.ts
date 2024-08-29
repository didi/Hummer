import { timestamp } from '../../../Utils/Utils'
import { HMEvent } from '../../Event'
import { HMNode } from '../../Node'

export const InputEventName = 'input'

// hummer InputEvent
export interface HMInputEvent extends HMEvent<InputEventState> {
  text: string
}

export enum InputEventState {
  began = 1,
  changed,
  ended,
  confirmed,
}

export function dispatchInputEvent(node:HMNode, state:InputEventState, text:string){
  const event:HMInputEvent = {
    type:InputEventName,
    timestamp : timestamp(),
    state:state,
    text:text
  }
  node.dispatchEvent(InputEventName, event);
}

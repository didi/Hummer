import { EventState,
  HMEvent,
  HMTapEvent, HMTouchEvent as HummerTouchEvent, TapEventName, TouchEventName } from '../Event'
import { HMNode } from '../Node'
import { fn, timestamp } from '../../Utils/Utils'
import { isString } from '../../Utils/is';


export function dispatchTapEvent(node:HMNode, event:ClickEvent){
  node.dispatchEvent(TapEventName, clickEvent2HummerTap(event));
}

export function dispatchTouchEvent(node:HMNode, event:TouchEvent){

  // const touchs = event.touches;
  // todo: 后续查看选择 touches 还是 changedTouches
  const touchs = event.changedTouches;
  touchs.forEach((touch:TouchObject)=>{
    node.dispatchEvent(TouchEventName, touchEvent2HummerTap(touch));
  })
}

export { shouldBindEvent } from '../EventHandler'

function clickEvent2HummerTap(event: ClickEvent) : HMTapEvent {

  const x = event.windowX;
  const y = event.windowX;
  return {
    type : TapEventName,
    state: EventState.ended,
    timestamp : timestamp(),
    position: {
      x : x,
      y : y
    }
  }
}

function touchEvent2HummerTap(event: TouchObject) : HummerTouchEvent {

  const x = event.windowX;
  const y = event.windowX;
  return {
    type : TouchEventName,
    state: EventState.ended,
    timestamp : timestamp(),
    position: {
      x : x,
      y : y
    }
  }
}
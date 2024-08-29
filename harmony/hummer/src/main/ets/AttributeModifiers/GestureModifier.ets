import { shouldBindEvent } from '../Components/ets';
import {
  EventState,
  HMEvent,
  HMLongPressEvent,
  HMPanEvent,
  HMPinchEvent,
  LongPressEventName,
  PanEventName,
  PinchEventName,
  SwipeEventName
} from '../Components/Event';
import { HMNode } from '../Components/Node';
import { timestamp } from '../Utils/Utils';

interface Point {
  x: number,
  y: number,
}

class CommonGestureModifier implements GestureModifier {
  node: HMNode | null = null

  setNode(node: HMNode) {
    this.node = node;
    return this
  }

  applyGesture(event: UIGestureEvent): void {
    const node = this.node;
    if (!node) {
      return
    }
    this.checkPan(event, node);
    this.checkLongPress(event, node);
    this.checkPinch(event, node);

    //todo: 现有ios/android 实现有问题，因此暂不实现
    // this.checkSwipe(event, node);
  }

  checkPan(event: UIGestureEvent, node: HMNode) {

    if (shouldBindEvent(node, PanEventName)) {

      let preOffset: Point = { x: 0, y: 0 }
      event.addGesture(
        new PanGestureHandler()
          .tag(node.uniqueId + PanEventName)
          .onActionStart((e: GestureEvent) => {
            preOffset = { x: e.offsetX, y: e.offsetY }
            node.dispatchEvent(PanEventName, createHMEvent<HMPanEvent>(PanEventName, (instance) => {
              instance.state = EventState.began
              instance.translation = { deltaX: 0, deltaY: 0 }
            }))
          })
          .onActionUpdate((e: GestureEvent) => {

            node.dispatchEvent(PanEventName, createHMEvent<HMPanEvent>(PanEventName, (instance) => {
              instance.translation = { deltaX: e.offsetX - preOffset.x, deltaY: e.offsetY - preOffset.y }
              instance.state = EventState.changed
            }))
            preOffset = { x: e.offsetX, y: e.offsetY }
          })
          .onActionEnd((e: GestureEvent) => {
            node.dispatchEvent(PanEventName, createHMEvent<HMPanEvent>(PanEventName, (instance) => {
              instance.translation = { deltaX: e.offsetX - preOffset.x, deltaY: e.offsetY - preOffset.y }
              instance.state = EventState.ended
            }))
            preOffset = { x: e.offsetX, y: e.offsetY }
          })
      )
    }
  }

  checkLongPress(event: UIGestureEvent, node: HMNode) {
    if (shouldBindEvent(node, LongPressEventName)) {
      event.addGesture(
        new LongPressGestureHandler()
          .tag(node.uniqueId + LongPressEventName)
          .onAction((e: GestureEvent) => {
            node.dispatchEvent(LongPressEventName, createHMEvent<HMLongPressEvent>(LongPressEventName, (instance) => {
              instance.state = EventState.began
              instance.position = { x: 0, y: 0 }
            }))
          })
          .onActionEnd((e: GestureEvent) => {
            node.dispatchEvent(LongPressEventName, createHMEvent<HMLongPressEvent>(LongPressEventName, (instance) => {
              instance.state = EventState.ended
              instance.position = { x: 0, y: 0 }
            }))
          })
          .onActionCancel(() => {
            node.dispatchEvent(LongPressEventName, createHMEvent<HMLongPressEvent>(LongPressEventName, (instance) => {
              instance.state = EventState.cancelled
              instance.position = { x: 0, y: 0 }
            }))
          })
      )
    }
  }

  checkSwipe(event: UIGestureEvent, node: HMNode) {
    if (shouldBindEvent(node, SwipeEventName)) {
      event.addGesture(
        new SwipeGestureHandler()
          .onAction((e: GestureEvent) => {

          })
      )
    }
  }

  checkPinch(event: UIGestureEvent, node: HMNode) {
    if (shouldBindEvent(node, PinchEventName)) {
      event.addGesture(
        new PinchGestureHandler()
          .onActionStart((e: GestureEvent) => {
            node.dispatchEvent(PinchEventName, createHMEvent<HMPinchEvent>(PinchEventName, (instance) => {
              instance.state = EventState.began
              instance.scale = e.scale
            }))
          })
          .onActionUpdate((e: GestureEvent) => {
            node.dispatchEvent(PinchEventName, createHMEvent<HMPinchEvent>(PinchEventName, (instance) => {
              instance.state = EventState.changed
              instance.scale = e.scale
            }))
          })
          .onActionEnd((e: GestureEvent) => {
            node.dispatchEvent(PinchEventName, createHMEvent<HMPinchEvent>(PinchEventName, (instance) => {
              instance.state = EventState.ended
              instance.scale = e.scale
            }))
          })
      )
    }
  }
}

function createHMEvent<T extends HMEvent>(name: string, builder: (instance: T) => void): T {

  const obj: HMEvent = {
    type: name,
    timestamp: timestamp(),
  };
  builder(obj as T)
  return obj as T
}


const commonGestureModifier = new CommonGestureModifier()

export default commonGestureModifier
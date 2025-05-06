import type { Node } from '../components/Node';
import type { fn } from '../Utils/Utils';
export const TapEventName = 'tap';
export const TouchEventName = 'touch';
export const LongPressEventName = 'longPress';
export const PanEventName = 'pan';
export const SwipeEventName = 'swipe';
export const PinchEventName = 'pinch';
export function dispatchTapEvent(node: Node, event: ClickEvent) {
    node.dispatchEvent(TapEventName, event);
}
export function dispatchTouchEvent(event: TouchEvent) {
}
export function shouldBindEvent(node: Node, eventName: string, cb: fn): fn | undefined {
    if (!node || node.attributes?.disabled)
        return undefined;
    if (!node.eventListeners.has(eventName)) {
        return undefined;
    }
    return cb;
}

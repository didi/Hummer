import { EventState, TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry/src/main/Hummer/components/Event";
import type { TapEvent, TouchEvent as HummerTouchEvent } from "@bundle:com.example.hummer/entry/src/main/Hummer/components/Event";
import type { Node } from '../components/Node';
import { timestamp } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
import type { fn } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
export function dispatchTapEvent(node: Node, event: ClickEvent) {
    node.dispatchEvent(TapEventName, clickEvent2HummerTap(event));
}
export function dispatchTouchEvent(node: Node, event: TouchEvent) {
    // const touchs = event.touches;
    // todo: 后续查看选择 touches 还是 changedTouches
    const touchs = event.changedTouches;
    touchs.forEach((touch: TouchObject) => {
        node.dispatchEvent(TouchEventName, touchEvent2HummerTap(touch));
    });
}
export function shouldBindEvent(node: Node, eventName: string, cb: fn): fn | undefined {
    if (!node || node.attributes?.disabled)
        return undefined;
    if (!node.eventListeners.has(eventName)) {
        return undefined;
    }
    return cb;
}
function clickEvent2HummerTap(event: ClickEvent): TapEvent {
    const x = event.windowX;
    const y = event.windowX;
    return {
        type: TapEventName,
        state: EventState.ended,
        timestamp: timestamp(),
        position: {
            x: x,
            y: y
        }
    };
}
function touchEvent2HummerTap(event: TouchObject): HummerTouchEvent {
    const x = event.windowX;
    const y = event.windowX;
    return {
        type: TouchEventName,
        state: EventState.ended,
        timestamp: timestamp(),
        position: {
            x: x,
            y: y
        }
    };
}

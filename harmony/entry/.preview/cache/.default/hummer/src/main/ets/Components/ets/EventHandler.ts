import { EventState, TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import type { HMTapEvent, HMTouchEvent as HummerTouchEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import type { HMNode } from '../Node';
import { timestamp } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import type { fn } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import { isString } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
export function dispatchTapEvent(node: HMNode, event: ClickEvent) {
    node.dispatchEvent(TapEventName, clickEvent2HummerTap(event));
}
export function dispatchTouchEvent(node: HMNode, event: TouchEvent) {
    // const touchs = event.touches;
    // todo: 后续查看选择 touches 还是 changedTouches
    const touchs = event.changedTouches;
    touchs.forEach((touch: TouchObject) => {
        node.dispatchEvent(TouchEventName, touchEvent2HummerTap(touch));
    });
}
export function shouldBindEvent(node: HMNode, eventName: string | string[], cb: fn): fn | undefined {
    if (!node || node.attributes?.disabled)
        return undefined;
    if (isString(eventName)) {
        if (node.eventListeners.has(eventName)) {
            return cb;
        }
    }
    else {
        const names = eventName;
        for (let index = 0; index < names.length; index++) {
            const name = names[index];
            if (node.eventListeners.has(name)) {
                return cb;
            }
        }
    }
    return undefined;
}
function clickEvent2HummerTap(event: ClickEvent): HMTapEvent {
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

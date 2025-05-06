import { EventState, TapEventName, TouchEventName, FocusEventName, BlurEventName, ChangeEventName, SubmitEventName } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Event";
import type { TapEvent, ChangeEvent, TouchEvent as HummerTouchEvent } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Event";
import type { Node } from '../Node';
import { timestamp } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Utils";
import type { fn } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/Utils";
import { isString } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Utils/is";
export function dispatchTapEvent(node: Node, event: ClickEvent) {
    node.dispatchEvent(TapEventName, clickEvent2HummerTap(event));
}
// change事件
export function dispatchChangeEvent(node: Node, event: string, type?: string) {
    node.dispatchEvent(ChangeEventName, changeEvent2HummerTap(event, type));
}
export function dispatchTouchEvent(node: Node, event: TouchEvent) {
    // const touchs = event.touches;
    // todo: 后续查看选择 touches 还是 changedTouches
    const touchs = event.changedTouches;
    touchs.forEach((touch: TouchObject) => {
        node.dispatchEvent(TouchEventName, touchEvent2HummerTap(touch));
    });
}
export function shouldBindEvent(node: Node, eventName: string | string[], cb: fn): fn | undefined {
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
function changeEvent2HummerTap(value: string, type?: string): ChangeEvent {
    let state = 2; // 输入框输入内容时的回调
    if (type === FocusEventName) {
        state = 1; // 输入框获得焦点时的回调
    }
    else if (type === BlurEventName) {
        state = 3; // 输入框失去焦点时的回调
    }
    else if (type === SubmitEventName) {
        state = 4; // 输入框完成输入时的回调
    }
    return {
        type: ChangeEventName,
        state: state,
        text: value,
        timestamp: timestamp()
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

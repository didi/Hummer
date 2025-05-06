import { timestamp } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import type { HMEvent } from '../../Event';
import type { HMNode } from '../../Node';
export const InputEventName = 'input';
// hummer InputEvent
export interface HMInputEvent extends HMEvent<InputEventState> {
    text: string;
}
export enum InputEventState {
    began = 1,
    changed = 2,
    ended = 3,
    confirmed = 4
}
export function dispatchInputEvent(node: HMNode, state: InputEventState, text: string) {
    const event: HMInputEvent = {
        type: InputEventName,
        timestamp: timestamp(),
        state: state,
        text: text
    };
    node.dispatchEvent(InputEventName, event);
}

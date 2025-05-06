import { getAnimationStyle } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Animation";
import type { BasicAnimation, KeyframeAnimation } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Animation";
import type { Node } from '../Components/Node';
import { HMEntranceController } from "@bundle:com.example.hummer/entry/src/main/Hummer/HMEntrance";
import { CallEts } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/CallEts";
import { HUMMER_NO_UICONTEXT_ERROR } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Error";
import { isUndefined } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
export function bindTs2EtsFunc() {
    CallEts.bind(px2vp, 'px2vp');
    CallEts.bind(addBasicAnimation, 'addBasicAnimation');
    CallEts.bind(addKeyframeAnimation, 'addKeyframeAnimation');
}
function addBasicAnimation(node: Node, data: BasicAnimation) {
    const style = getAnimationStyle(node, data.property, data.value);
    if (!style) {
        return;
    }
    let repeatCount = data.repeatCount;
    const duration = isUndefined(data.duration) ? 0 : data.duration;
    const delay = isUndefined(data.delay) ? 0 : data.delay;
    if (isUndefined(repeatCount) || repeatCount == 0) {
        repeatCount = 1;
    }
    Context.animateTo({
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: repeatCount,
        curve: convertToCurve(data.easing)
    }, () => {
        node.setStyles(style);
    });
}
function addKeyframeAnimation(node: Node, data: KeyframeAnimation) {
    let repeatCount = data.repeatCount;
    const duration = isUndefined(data.duration) ? 0 : data.duration;
    const delay = isUndefined(data.delay) ? 0 : data.delay;
    if (isUndefined(repeatCount) || repeatCount == 0) {
        repeatCount = 1;
    }
    const uiContext = HMEntranceController.getController(node.context)?.uiContext;
    if (!uiContext) {
        node.context.handleError(HUMMER_NO_UICONTEXT_ERROR);
        return;
    }
    const curve = convertToCurve(data.easing);
    const keyframes = new Array<KeyframeState>();
    const totalDuration = duration * 1000;
    let isValidStyle = true;
    data.keyframes.forEach((frame) => {
        const frameDuration = frame.percent * totalDuration;
        const style = getAnimationStyle(node, data.property, frame.value);
        if (!style) {
            isValidStyle = false;
        }
        const keyframeState: KeyframeState = {
            duration: frameDuration,
            curve: curve,
            event: () => {
                node.setStyles(style);
            }
        };
        keyframes.push(keyframeState);
    });
    if (!isValidStyle) {
        return;
    }
    uiContext.keyframeAnimateTo({
        delay: data.delay * 1000,
        iterations: repeatCount,
    }, keyframes);
}
function convertToCurve(easing: string): Curve {
    switch (easing) {
        case 'linear':
            return Curve.Linear;
        case 'ease':
            return Curve.Ease;
        case 'ease-in':
            return Curve.EaseIn;
        case 'ease-out':
            return Curve.EaseOut;
        case 'ease-in-out':
            return Curve.EaseInOut;
        default:
            return Curve.Ease;
    }
}

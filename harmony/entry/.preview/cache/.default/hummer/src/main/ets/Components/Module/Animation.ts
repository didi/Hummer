import type { IHummerStyle, ITransform } from '../../Interface/IHummerStyle';
import type { HMNode } from '../Node';
import { getVP, getVPNoPercent, timestamp } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import { invalidArg } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Error";
import type { HMEvent } from '../Event';
import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
export type AnimationProperty = 'position' | 'scale' | 'scaleX' | 'scaleY' | 'rotationX' | 'rotationY' | 'rotationZ' | 'opacity' | 'backgroundColor' | 'width' | 'height';
export type BasicAnimation = {
    key: string;
    property: AnimationProperty;
    value: number | string | Object;
    duration: number; //单位：秒, 默认值：1
    delay: number; //0	动画延时（单位：秒）	anim.delay = 2;
    // 动画重复次数
    // <0: 无限次
    // 0、1: 动画做1次
    // 2: 动画做2次
    repeatCount: number;
    // 线性运动｜ 先加速后减速（结束时会特别慢）｜ 加速运动｜ 减速运动 ｜ 先加速后减速
    easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
};
const AnimationOnStart = '__onAnimationStart__';
const AnimationOnEnd = '__onAnimationEnd__';
export interface AnimationEvent extends HMEvent<number> {
    key: string;
}
export function dispatchAnimationStartEvent(node: HMNode, key: string) {
    _dispatchAnimationEvent(node, AnimationOnStart, key);
}
export function dispatchAnimationEndEvent(node: HMNode, key: string, state?: number) {
    _dispatchAnimationEvent(node, AnimationOnEnd, key);
}
function _dispatchAnimationEvent(node: HMNode, name: string, key: string, state?: number) {
    const event: AnimationEvent = {
        type: name,
        timestamp: timestamp(),
        key: key
    };
    if (name == AnimationOnEnd) {
        event.state = 0;
    }
    node.dispatchEvent(name, event);
}
export type Keyframe = {
    value: number | string | Object;
    percent: number;
};
export type KeyframeAnimation = {
    key: string;
    property: AnimationProperty;
    keyframes: [
        Keyframe
    ];
    duration: number; //单位：秒, 默认值：1
    delay: number; //0	动画延时（单位：秒）	anim.delay = 2;
    // 动画重复次数
    // <0: 无限次
    // 0、1: 动画做1次
    // 2: 动画做2次
    repeatCount: number;
    // 线性运动｜ 先加速后减速（结束时会特别慢）｜ 加速运动｜ 减速运动 ｜ 先加速后减速
    easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
};
//
// export class transform {
//   translateX:number = 0.0
//   translateY:number = 0.0
//
//   rotationX:number = 0.0
//   rotationY:number = 0.0
//   rotationZ:number = 0.0
//
//
//   scaleX:number = 1.0
//   scaleY:number = 1.0
//
//   getMatrix4Transit(): undefined | matrix4.Matrix4Transit {
//
//   let matrix = matrix4.identity().scale({ x:this.scaleX, y:this.scaleY, z:1, centerX:0, centerY:0 })
//     matrix = matrix.combine(matrix4.identity().translate({ x:this.translateX, y:this.translateY, z:0 }))
//     matrix = matrix.combine(matrix4.identity().rotate({ x:1, y:0, z:0 , angle: this.rotationX }))
//     matrix = matrix.combine(matrix4.identity().rotate({ x:0, y:1, z:0 , angle: this.rotationY }))
//     matrix = matrix.combine(matrix4.identity().rotate({ x:1, y:0, z:1 , angle: this.rotationZ }))
//
//     return matrix
//   }
//
//   mergeTransform(){}
// }
export function getAnimationStyle(node: HMNode, propertyName: string, value: any): IHummerStyle | undefined {
    if (propertyName == 'opacity') {
        return { opacity: parseFloat(value) };
    }
    else if (propertyName == 'backgroundColor' || propertyName == 'width' || propertyName == 'height') {
        return { [propertyName]: value };
    }
    else if (propertyName == 'position') {
        const x = value['x'];
        const y = value['y'];
        if (isUndefined(x) || isUndefined(y)) {
            node.context.handleError(invalidArg('动画 position 的 value 不合法'));
        }
        const transform = mergeTransformTranslate(x, y, node.style.transformModel);
        return { transformModel: transform };
    }
    else if (propertyName == 'scale') {
        const x = value;
        const y = value;
        if (isUndefined(x) || isUndefined(y)) {
            node.context.handleError(invalidArg('动画 position 的 value 不合法'));
        }
        const transform = mergeTransformScale(x, y, node.style.transformModel);
        return { transformModel: transform };
    }
    else if (propertyName == 'scaleY') {
        const transform = mergeTransformScale(undefined, value, node.style.transformModel);
        return { transformModel: transform };
    }
    else if (propertyName == 'scaleX') {
        const transform = mergeTransformScale(value, undefined, node.style.transformModel);
        return { transformModel: transform };
    }
    else if (propertyName == 'rotationX') {
        const transform = mergeTransformRotate(value, undefined, undefined, node.style.transformModel);
        return { transformModel: transform };
    }
    else if (propertyName == 'rotationY') {
        const transform = mergeTransformRotate(undefined, value, undefined, node.style.transformModel);
        return { transformModel: transform };
    }
    else if (propertyName == 'rotationZ') {
        const transform = mergeTransformRotate(undefined, undefined, value, node.style.transformModel);
        return { transformModel: transform };
    }
    return undefined;
}
export function mergeTransformTranslate(x: string | number, y: string | number, transform?: ITransform): ITransform {
    let _transform = transform;
    if (!_transform) {
        _transform = {};
    }
    _transform.translate = { x: getVP(x), y: getVP(y) };
    return _transform;
}
export function mergeTransformScale(x?: string | number, y?: string | number, transform?: ITransform): ITransform {
    let _transform = transform;
    if (!_transform) {
        _transform = {};
    }
    let newX = getVPNoPercent(x);
    let newY = getVPNoPercent(y);
    if (isUndefined(newX) && isUndefined(newY)) {
        return _transform;
    }
    let originalX = _transform.scale?.x;
    let originalY = _transform.scale?.y;
    originalX = isUndefined(originalX) ? 1 : originalX;
    originalY = isUndefined(originalY) ? 1 : originalY;
    _transform.scale = {
        x: isUndefined(newX) ? originalX : newX,
        y: isUndefined(newY) ? originalY : newY
    };
    return _transform;
}
/// 鸿蒙没有提供适当的 rotate 叠加方法（基于矩阵的超过180有最短路径问题，基于 rotate 的没法叠加）。目前 rotate 只做覆盖
export function mergeTransformRotate(x?: string | number, y?: string | number, z?: string | number, transform?: ITransform): ITransform {
    let _transform = transform;
    if (!_transform) {
        _transform = {};
    }
    if (!isUndefined(x)) {
        _transform.rotation = { x: 1, y: 0, z: 0, angle: x };
    }
    else if (!isUndefined(y)) {
        _transform.rotation = { x: 0, y: 1, z: 0, angle: y };
    }
    else if (!isUndefined(z)) {
        _transform.rotation = { x: 0, y: 0, z: 1, angle: z };
    }
    return _transform;
}

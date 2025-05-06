import type { BasicAnimation, KeyframeAnimation } from '../Components/Module/Animation';
import type { HMNode } from '../Components/Node';
import type { fn } from './Utils';
export class CallEts {
    private static _funcRegistry: Record<string, fn> = {};
    public static bind(func: fn, name: string) {
        CallEts._funcRegistry[name] = func;
    }
    static px2vp(value: number): number {
        const func = CallEts._funcRegistry['px2vp'];
        if (!func) {
            throw 'px2vp 方法未注入';
        }
        return func(value);
    }
    static vp2px(value: number): number {
        const func = CallEts._funcRegistry['vp2px'];
        if (!func) {
            throw 'vp2px 方法未注入';
        }
        return func(value);
    }
    static addBasicAnimation(node: HMNode, data: BasicAnimation, key: string) {
        const func = CallEts._funcRegistry['addBasicAnimation'];
        if (!func) {
            throw 'addBasicAnimation 方法未注入';
        }
        return func(node, data, key);
    }
    static addKeyframeAnimation(node: HMNode, data: KeyframeAnimation, key: string) {
        const func = CallEts._funcRegistry['addKeyframeAnimation'];
        if (!func) {
            throw 'addKeyframeAnimation 方法未注入';
        }
        return func(node, data, key);
    }
}

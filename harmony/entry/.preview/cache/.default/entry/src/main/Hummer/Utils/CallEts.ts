import type { BasicAnimation, KeyframeAnimation } from '../Components/Module/Animation';
import type { Node } from '../Components/Node';
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
    static addBasicAnimation(node: Node, data: BasicAnimation) {
        const func = CallEts._funcRegistry['addBasicAnimation'];
        if (!func) {
            throw 'addBasicAnimation 方法未注入';
        }
        return func(node, data);
    }
    static addKeyframeAnimation(node: Node, data: KeyframeAnimation) {
        const func = CallEts._funcRegistry['addKeyframeAnimation'];
        if (!func) {
            throw 'addKeyframeAnimation 方法未注入';
        }
        return func(node, data);
    }
}

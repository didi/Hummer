export class CallEts {
    static bind(func, name) {
        CallEts._funcRegistry[name] = func;
    }
    static px2vp(value) {
        const func = CallEts._funcRegistry['px2vp'];
        if (!func) {
            throw 'px2vp 方法未注入';
        }
        return func(value);
    }
    static vp2px(value) {
        const func = CallEts._funcRegistry['vp2px'];
        if (!func) {
            throw 'vp2px 方法未注入';
        }
        return func(value);
    }
    static addBasicAnimation(node, data, key) {
        const func = CallEts._funcRegistry['addBasicAnimation'];
        if (!func) {
            throw 'addBasicAnimation 方法未注入';
        }
        return func(node, data, key);
    }
    static addKeyframeAnimation(node, data, key) {
        const func = CallEts._funcRegistry['addKeyframeAnimation'];
        if (!func) {
            throw 'addKeyframeAnimation 方法未注入';
        }
        return func(node, data, key);
    }
}
CallEts._funcRegistry = {};
//# sourceMappingURL=CallEts.js.map
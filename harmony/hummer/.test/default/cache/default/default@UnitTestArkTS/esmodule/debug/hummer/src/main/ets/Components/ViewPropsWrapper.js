import { TapEventName, TouchEventName } from '@bundle:com.example.hummer/hummer/ets/Components/Event';
import { MutationType } from '@bundle:com.example.hummer/hummer/ets/Components/Node';
export class ViewBasePropsWrapper {
    constructor(node, style, attributes) {
        this.node = node;
        this.style = style;
        this.attributes = attributes;
        // private _updatedWrapper;
        this._id = 0;
        this._reactiveEvents = new Set([TapEventName, TouchEventName]);
        // this._updatedWrapper = this;// hack，状态变量只有在构造函数时，this 才为自身，在ets 中调用会bindThis(proxy)
        const childReactiveEvents = this.reactiveEvents();
        childReactiveEvents === null || childReactiveEvents === void 0 ? void 0 : childReactiveEvents.forEach((event) => {
            this._reactiveEvents.add(event);
        });
    }
    bindPropsUpdate(updateFunc) {
        this.node.registerUpdateFunc(MutationType.Style, (style) => {
            this.style = style;
            this._id++;
            updateFunc === null || updateFunc === void 0 ? void 0 : updateFunc(MutationType.Style, style);
        }).registerUpdateFunc(MutationType.Attribute, (attributes) => {
            this.attributes = attributes;
            this._id++;
            updateFunc === null || updateFunc === void 0 ? void 0 : updateFunc(MutationType.Attribute, attributes);
        }).registerUpdateFunc(MutationType.Event, (event) => {
            if (this._reactiveEvents.has(event)) {
                this.events = this.node.eventListeners;
                this._id++;
                updateFunc === null || updateFunc === void 0 ? void 0 : updateFunc(MutationType.Event, event);
            }
        });
        return this;
    }
    onChildUpdate(updateFunc) {
        this.node.registerUpdateFunc(MutationType.Children, (childNodes) => {
            updateFunc(childNodes);
        });
        return this;
    }
    ///只有 reactiveEvents 返回的事件，在 eventListener 发生变动时才会触发UI刷新。
    reactiveEvents() {
        return undefined;
    }
    get child() {
        return this.node.childNodes;
    }
    dispose() {
        this.node.unregisterAllNativeFuncs();
        this.node.unregisterAllUpdateFuncs();
    }
}
//# sourceMappingURL=ViewPropsWrapper.js.map
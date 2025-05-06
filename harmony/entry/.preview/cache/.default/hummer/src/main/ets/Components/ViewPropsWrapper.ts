import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import { MutationType } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { HMNode, UpdateFunc } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
export class ViewBasePropsWrapper<TStyle, TAttribute> {
    // private _updatedWrapper;
    private _id = 0;
    public events: Set<string>;
    private _reactiveEvents: Set<string> = new Set([TapEventName, TouchEventName]);
    public constructor(public readonly node: HMNode, public style: TStyle, public attributes: TAttribute) {
        // this._updatedWrapper = this;// hack，状态变量只有在构造函数时，this 才为自身，在ets 中调用会bindThis(proxy)
        const childReactiveEvents = this.reactiveEvents();
        childReactiveEvents?.forEach((event: string) => {
            this._reactiveEvents.add(event);
        });
    }
    public bindPropsUpdate(updateFunc?: UpdateFunc): ViewBasePropsWrapper<TStyle, TAttribute> {
        this.node.registerUpdateFunc(MutationType.Style, (style: TStyle) => {
            this.style = style;
            this._id++;
            updateFunc?.(MutationType.Style, style);
        }).registerUpdateFunc(MutationType.Attribute, (attributes: TAttribute) => {
            this.attributes = attributes;
            this._id++;
            updateFunc?.(MutationType.Attribute, attributes);
        }).registerUpdateFunc(MutationType.Event, (event: string) => {
            if (this._reactiveEvents.has(event)) {
                this.events = this.node.eventListeners;
                this._id++;
                updateFunc?.(MutationType.Event, event);
            }
        });
        return this;
    }
    public onChildUpdate(updateFunc: UpdateFunc): ViewBasePropsWrapper<TStyle, TAttribute> {
        this.node.registerUpdateFunc(MutationType.Children, (childNodes: HMNode[]) => {
            updateFunc(childNodes);
        });
        return this;
    }
    ///只有 reactiveEvents 返回的事件，在 eventListener 发生变动时才会触发UI刷新。
    protected reactiveEvents(): string[] | undefined {
        return undefined;
    }
    public get child(): HMNode[] {
        return this.node.childNodes;
    }
    public dispose() {
        this.node.unregisterAllNativeFuncs();
        this.node.unregisterAllUpdateFuncs();
    }
}

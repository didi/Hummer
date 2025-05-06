import type { HMNode } from '../../Node';
import { ViewBasePropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ViewPropsWrapper";
import type { IScrollViewStyle, IScrollViewAttributes } from './IProps';
import { OnScrollBottomEventName, OnScrollTopEventName, ScrollEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
export class ScrollViewPropsWrapper extends ViewBasePropsWrapper<IScrollViewStyle, IScrollViewAttributes> {
    constructor(public readonly node: HMNode) {
        super(node, node.style, node.attributes);
    }
    protected override reactiveEvents(): string[] | undefined {
        return [ScrollEventName, OnScrollBottomEventName, OnScrollTopEventName];
    }
    public get refreshView(): HMNode | undefined {
        if (isUndefined(this.attributes?.refreshView)) {
            return undefined;
        }
        return this.attributes?.refreshView;
    }
    public get loadMoreView(): HMNode | undefined {
        if (isUndefined(this.attributes?.loadMoreView)) {
            return undefined;
        }
        return this.attributes?.loadMoreView;
    }
    public get bounces(): boolean {
        if (isUndefined(this.attributes?.bounces)) {
            return true;
        }
        return this.attributes?.bounces;
    }
    public get showScrollBar(): boolean {
        if (isUndefined(this.attributes?.showScrollBar)) {
            return false;
        }
        return this.attributes?.showScrollBar;
    }
}

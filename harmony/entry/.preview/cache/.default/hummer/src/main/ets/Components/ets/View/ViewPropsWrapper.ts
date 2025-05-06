import type { IHummerBaseAttributes } from '../../../Interface/IAttribute';
import type { IHummerStyle } from '../../../Interface/IHummerStyle';
import type { HMNode } from '../../Node';
import { ViewBasePropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ViewPropsWrapper";
export class ViewPropsWrapper extends ViewBasePropsWrapper<IHummerStyle, IHummerBaseAttributes> {
    constructor(public readonly node: HMNode) {
        super(node, node.style, node.attributes);
    }
    get flexDirection() {
        return this.node.style.flexDirection;
    }
    get alignItems() {
        return this.node.style.alignItems;
    }
}

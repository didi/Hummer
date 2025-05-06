import type { HMNode } from '../../Node';
import { ViewBasePropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ViewPropsWrapper";
import type { IImageAttributes, IImageStyle } from './IProps';
export class ImagePropsWrapper extends ViewBasePropsWrapper<IImageStyle, IImageAttributes> {
    constructor(public readonly node: HMNode) {
        super(node, node.style, node.attributes);
    }
    public get src() {
        return this.attributes.src;
    }
    public get gifSrc() {
        return this.attributes.gifSrc;
    }
    public get resize() {
        return this.style.resize;
    }
}

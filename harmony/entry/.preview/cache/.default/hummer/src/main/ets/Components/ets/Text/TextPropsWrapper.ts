import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
import { convertColorToARGB, getVPNoPercent } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import type { HMNode } from '../../Node';
import { ViewBasePropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ViewPropsWrapper";
import type { IHummerTextAttributes, IHummerTextStyle, IRichTextAttributes } from './IProps';
export class TextPropsWrapper extends ViewBasePropsWrapper<IHummerTextStyle, IHummerTextAttributes> {
    constructor(node: HMNode) {
        super(node, node.style, node.attributes);
    }
    public get text(): string {
        if (isUndefined(this.attributes?.text)) {
            return '';
        }
        return this.attributes?.text;
    }
    public get richText(): IRichTextAttributes | (IRichTextAttributes | string)[] | undefined {
        return this.attributes.richText;
    }
    public get textOverflow(): string {
        return this.style.textOverflow;
    }
    public get textAlign(): string {
        if (isUndefined(this.style?.textAlign)) {
            return 'left';
        }
        return this.style?.textAlign;
    }
    public get fontSize(): number {
        return getVPNoPercent(this.style?.fontSize, 16);
    }
    public get backgroundColor(): string {
        if (isUndefined(this.style?.backgroundColor)) {
            return '#00000000';
        }
        return convertColorToARGB(this.style?.backgroundColor);
    }
    public get color(): string {
        if (isUndefined(this.style?.color)) {
            return '#000000';
        }
        return convertColorToARGB(this.style?.color);
    }
    public get textDecoration(): string | undefined {
        return this.style?.textDecoration;
    }
    public get fontStyle(): string {
        if (isUndefined(this.style?.fontStyle)) {
            return 'normal';
        }
        return this.style?.fontStyle;
    }
    public get fontWeight(): string {
        if (isUndefined(this.style?.fontWeight)) {
            return 'normal';
        }
        return this.style?.fontWeight;
    }
    public get textVerticalAlign(): string {
        if (isUndefined(this.style?.textVerticalAlign)) {
            return 'center';
        }
        return this.style?.textVerticalAlign;
    }
    public get lineSpacingMulti(): number | undefined {
        return this.style?.lineSpacingMulti;
    }
    public get fontFamily(): string {
        if (isUndefined(this.style?.fontFamily)) {
            return 'HarmonyOS Sans';
        }
        return this.style?.fontFamily;
    }
    public get textLineClamp(): number {
        if (isUndefined(this.style?.textLineClamp)) {
            return -1;
        }
        return this.style?.textLineClamp;
    }
    public get textCopyEnable(): boolean {
        if (isUndefined(this.attributes?.textCopyEnable)) {
            return false;
        }
        return this.attributes?.textCopyEnable;
    }
}

import { HummerElement } from "../../HummerElement";
export declare class Text extends HummerElement {
    protected _text: string;
    protected _richText: string;
    protected _textCopyEnable: boolean;
    constructor(id: string | undefined, name: string | undefined, props: any);
    get text(): string;
    set text(value: string);
    get richText(): string;
    set richText(value: string);
    get textCopyEnable(): boolean;
    set textCopyEnable(value: boolean);
}

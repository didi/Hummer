import { HummerElement } from "../../HummerElement";
export declare class TextArea extends HummerElement {
    protected _text: string;
    protected _placeholder: string;
    protected _focused: boolean;
    constructor(id?: string, name?: string, props?: any);
    get text(): string;
    set text(value: string);
    get placeholder(): string;
    set placeholder(value: string);
    get focused(): boolean;
    set focused(value: boolean);
}

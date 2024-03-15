import { HummerElement } from "../../HummerElement";
export declare class Button extends HummerElement {
    protected _text: string;
    protected _pressed: object;
    protected _disabled: object;
    constructor(id?: string, name?: string, props?: any);
    get text(): string;
    set text(value: string);
    get pressed(): object;
    set pressed(value: object);
    get focused(): object;
    set focused(value: object);
}

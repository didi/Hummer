import { HummerElement } from "../../HummerElement";
export declare class View extends HummerElement {
    protected _overflow: string;
    constructor(id: string, name: string | undefined, props: any);
    set overflow(value: string);
    get overflow(): string;
}

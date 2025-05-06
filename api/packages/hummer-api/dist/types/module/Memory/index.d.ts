import { HummerComponent } from "../../HummerComponent";
export declare class Memory extends HummerComponent {
    constructor(props?: any);
    protected static get instance(): Memory;
    static set(key: string, value: any, cb?: Function): void;
    static get(key: string, cb?: Function): any;
    static remove(key: string, cb?: Function): void;
    static removeAll(cb?: Function): void;
    static exist(key: string, cb?: Function): boolean;
    protected set(key: string, value: any, cb?: Function): void;
    protected get(key: string, cb?: Function): any;
    protected remove(key: string, cb?: Function): void;
    protected removeAll(cb?: Function): void;
    protected exist(key: string, cb?: Function): boolean;
}

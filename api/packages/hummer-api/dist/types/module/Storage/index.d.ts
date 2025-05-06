import { HummerComponent } from "../../HummerComponent";
export declare class Storage extends HummerComponent {
    constructor(props?: any);
    protected static get instance(): Storage;
    static set(key: string, value: any, cb?: Function): any;
    static get(key: string, cb?: Function): any;
    static remove(key: string, cb?: Function): any;
    static removeAll(cb?: Function): any;
    static exist(key: string, cb?: Function): boolean;
    protected set(key: string, value: any, cb?: Function): any;
    protected get(key: string, cb?: Function): any;
    protected remove(key: string, cb?: Function): any;
    protected removeAll(cb?: Function): any;
    protected exist(key: string, cb?: Function): boolean;
}

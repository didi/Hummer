import { HummerComponent } from "../../HummerComponent";
export declare class Storage extends HummerComponent {
    private static instance;
    constructor(props?: any);
    protected static newInstance(): Storage;
    protected static checkInstance(): void;
    static set(key: string, value: Object): void;
    static get(key: string): any;
    static remove(key: string): void;
    static removeAll(): void;
    static exist(key: string): boolean;
    protected set(key: string, value: Object): void;
    protected get(key: string): any;
    protected remove(key: string): void;
    protected removeAll(): void;
    protected exist(key: string): boolean;
}

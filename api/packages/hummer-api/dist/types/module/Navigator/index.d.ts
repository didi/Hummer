import { HummerComponent } from "../../HummerComponent";
export declare class Navigator extends HummerComponent {
    constructor(props?: any);
    protected static get instance(): Navigator;
    static openPage(pageInfo: Record<string, any>, callback?: Function): void;
    static popPage(pageInfo?: Record<string, any>): void;
    static popToPage(pageInfo: Record<string, any>): void;
    static popToRootPage(pageInfo?: Record<string, any>): void;
    static popBack(count: number, pageInfo?: Record<string, any>): void;
    protected openPage(pageInfo: Record<string, any>, callback?: Function): void;
    protected popPage(pageInfo?: Record<string, any>): void;
    protected popToPage(pageInfo: Record<string, any>): void;
    protected popToRootPage(pageInfo?: Record<string, any>): void;
    protected popBack(count: number, pageInfo?: Record<string, any>): void;
}

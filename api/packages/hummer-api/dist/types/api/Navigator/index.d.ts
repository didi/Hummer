import { HummerComponent } from "../../HummerComponent";
export declare class Navigator extends HummerComponent {
    private static instance;
    constructor(props?: any);
    protected static newInstance(): Navigator;
    protected static checkInstance(): void;
    static openPage(pageInfo: Object, callback: Function): void;
    static popPage(pageInfo: Object): void;
    static popToPage(pageInfo: Object): void;
    static popToRootPage(pageInfo: Object): void;
    static popBack(count: number, pageInfo: Object): void;
    protected openPage(pageInfo: Object, callback: Function): void;
    protected popPage(pageInfo: Object): void;
    protected popToPage(pageInfo: Object): void;
    protected popToRootPage(pageInfo: Object): void;
    protected popBack(count: number, pageInfo: Object): void;
}

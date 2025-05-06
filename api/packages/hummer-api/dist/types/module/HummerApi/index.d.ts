import { HummerComponent } from "../../HummerComponent";
import { Element } from "../../Element";
export type Env = {
    platform: string;
    osVersion: string;
    appVersion: string;
    appName: string;
    statusBarHeight: number;
    safeAreaBottom: number;
    deviceWidth: number;
    deviceHeight: number;
    availableWidth: number;
    availableHeight: number;
    scale: number;
};
export type PageInfo = {
    id: string;
    url: string;
    animated: boolean;
    params?: any;
    closeSelf?: boolean;
};
export declare class HummerApi extends HummerComponent {
    private _rootElement;
    constructor(props?: any);
    protected static newInstance(): HummerApi;
    protected static checkInstance(): void;
    static get instance(): HummerApi;
    static getEnv(): Env;
    protected getEnv(): Env;
    static getPageInfo(): PageInfo;
    protected getPageInfo(): PageInfo;
    static setPageResult(param: any): any;
    protected setPageResult(param: any): any;
    static get rootElement(): Element | undefined;
    static set rootElement(rootElement: Element | undefined);
}

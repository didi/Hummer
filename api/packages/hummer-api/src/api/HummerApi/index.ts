import { HummerComponent } from "../../HummerComponent"
import { Element } from "../../Element"

const HUMMER = __Hummer__;


export type Env = {
    platform: string,
    osVersion: string,
    appVersion: string,
    appName: string,
    statusBarHeight: number
    safeAreaBottom: number
    deviceWidth: number
    deviceHeight: number
    availableWidth: number
    availableHeight: number
    scale: number
}

export type PageInfo = {
    id: string;
    url: string;
    animated: boolean;
    params?: any
};


export class HummerApi extends HummerComponent {

    private _rootElement: Element | undefined = undefined

    public constructor(props: any = {}) {
        super("Hummer", props);
    }

    protected static newInstance(): HummerApi {
        return new HummerApi();
    }

    protected static checkInstance() {
        if (!HUMMER.__hummerApi__) {
            HUMMER.__hummerApi__ = HummerApi.newInstance();
        }
    }

    static get instance(): HummerApi {
        return HUMMER.__hummerApi__
    }

    /**
     * 获取全局env
     *
     */
    static getEnv(): Env {
        HummerApi.checkInstance();
        return HummerApi.instance.getEnv();
    }

    protected getEnv(): Env {
        return this.call("getEnv");
    }

    /**
     * 获取pageInfo
     */
    static getPageInfo(): PageInfo {
        HummerApi.checkInstance();
        return HummerApi.instance.getPageInfo();
    }

    protected getPageInfo(): PageInfo {
        return this.call("getPageInfo");
    }



    /**
     * 设置setPageResult
     *
     */
    static setPageResult(param: any) {
        HummerApi.checkInstance();
        return HummerApi.instance.setPageResult(param);
    }

    protected setPageResult(param: any) {
        return this.call("setPageResult", param);
    }


    static get rootElement() {
        HummerApi.checkInstance();
        return HummerApi.instance._rootElement;
    }

    static set rootElement(rootElement: Element | undefined) {
        HummerApi.checkInstance();
        HummerApi.instance._rootElement = rootElement;
    }



}
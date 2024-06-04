import { HummerComponent } from "../../HummerComponent"
import { Element } from "../../Element"

const HUMMER = __Hummer__;



// platform	string	平台类型	'iOS' | 'Android' | 'Web'
// osVersion	string	平台系统版本号	'14.0' | '10'
// appVersion	string	App版本号	'1.0'
// appName	string	App名字	'Hummer'
// statusBarHeight	number	状态栏高度（单位：dp或pt）	44
// safeAreaBottom	number	iOS安全区域高度（单位：dp或pt）（Android可忽略）	34
// deviceWidth	number	设备宽度（单位：dp或pt）	414
// deviceHeight	number	设备高度（单位：dp或pt）	896
// availableWidth	number	可用范围宽度（单位：dp或pt）	414
// availableHeight	number	可用范围高度（单位：dp或pt）	852
// scale	number	像素缩放比例	3

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

// url【必填】	string	页面Url，以 scheme://xxx/yyy 的形式传入
// params	Object	页面间传递的参数
// animated	boolean	是否需要转场动画（默认是true）
// id	string	页面唯一标示，可以不传，当需要pop到该页面时，需要指定page的id
// closeSelf	boolean	打开页面时是否关闭自身

export type PageInfo = {
    id: string;

    // url 格式:
    // Hummer Bundle页面	hummer://home/index.js
    // Hummer Url页面	http://xxx.xxx.xxx.xxx:8000/index.js
    // Hummer 相对路径页面	./index.js
    // H5 页面	https://hummer.didi.cn
    // 自定义页面	native://album
    // wechat://xxx/yyy
    url: string;
    animated: boolean;
    params?: any;
    closeSelf?: boolean;
};


export class HummerApi extends HummerComponent {

    private _rootElement: Element | undefined = undefined

    public constructor(props: any = {}) {
        super("Hummer", props,false);
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
import { HummerComponent } from "../../HummerComponent"

const HUMMER = __Hummer__;
export class Navigator extends HummerComponent {

    public constructor(props: any = {}) {
        super("Navigator", props);
    }

    protected static get instance(): Navigator {
        if (!HUMMER.__navigator__) {
            HUMMER.__navigator__ = new Navigator();
        }
        return HUMMER.__navigator__
    }

    /**
    * 打开某个页面
    * @param pageInfo 页面信息
    * @param callback 页面结果回调
    */
    public static openPage(pageInfo: Record<string, any>, callback?: Function) {
        Navigator.instance.openPage(pageInfo, callback);
    }


    /**
     * 关闭当前页面
     * @param pageInfo 页面信息
     */
    public static popPage(pageInfo?: Record<string, any>) {
        Navigator.instance.popPage(pageInfo);
    }

    /**
     * 回退到指定页面
     * @param pageInfo 页面信息
     */
    public static popToPage(pageInfo: Record<string, any>) {
        Navigator.instance.popToPage(pageInfo);
    }

    /**
     * 回退到首页
     * @param pageInfo 页面信息（是否需要动画）
     */
    public static popToRootPage(pageInfo?: Record<string, any>) {
        Navigator.instance.popToRootPage(pageInfo);
    }


    /**
     * 向前回退指定数量的页面
     * @param count 要回退的页面级数（默认是1）
     * @param pageInfo 页面信息（是否需要动画）
     */
    public static popBack(count: number, pageInfo?: Record<string, any>) {
        Navigator.instance.popBack(count, pageInfo);
    }

    protected openPage(pageInfo: Record<string, any>, callback?: Function) {
        this.call("openPage", pageInfo, callback);
    }

    protected popPage(pageInfo?: Record<string, any>) {
        this.call("popPage", pageInfo);
    }

    protected popToPage(pageInfo: Record<string, any>) {
        this.call("popToPage", pageInfo);
    }

    protected popToRootPage(pageInfo?: Record<string, any>) {
        this.call("popToRootPage", pageInfo);
    }

    protected popBack(count: number, pageInfo?: Record<string, any>) {
        this.call("popBack", count, pageInfo);
    }

}
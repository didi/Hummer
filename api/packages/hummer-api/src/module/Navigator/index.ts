import { HummerComponent } from "../../HummerComponent"

const HUMMER = __Hummer__;
export class Navigator extends HummerComponent {

    public constructor(props: any = {}) {
        super("Navigator", props);
    }

    protected static newInstance(): Navigator {
        return new Navigator();
    }

    protected static checkInstance() {
        if (!HUMMER.__navigator__) {
            HUMMER.__navigator__ = Navigator.newInstance();
        }
    }

    static get instance(): Navigator {
        return HUMMER.__navigator__
    }

    /**
    * 打开某个页面
    * @param pageInfo 页面信息
    * @param callback 页面结果回调
    */
    static openPage(pageInfo: Record<string, any>, callback?: Function) {
        Navigator.checkInstance();
        Navigator.instance.openPage(pageInfo, callback);
    }


    /**
     * 关闭当前页面
     * @param pageInfo 页面信息
     */
    static popPage(pageInfo?: Record<string, any> ) {
        Navigator.checkInstance();
        Navigator.instance.popPage(pageInfo);

    }

    /**
     * 回退到指定页面
     * @param pageInfo 页面信息
     */
    static popToPage(pageInfo: Record<string, any>) {
        Navigator.checkInstance();
        Navigator.instance.popToPage(pageInfo);
    }

    /**
     * 回退到首页
     * @param pageInfo 页面信息（是否需要动画）
     */
    static popToRootPage(pageInfo?: Record<string, any>) {
        Navigator.checkInstance();
        Navigator.instance.popToRootPage(pageInfo);
    }


    /**
     * 向前回退指定数量的页面
     * @param count 要回退的页面级数（默认是1）
     * @param pageInfo 页面信息（是否需要动画）
     */
    static popBack(count: number, pageInfo?: Record<string, any>) {
        Navigator.checkInstance();
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
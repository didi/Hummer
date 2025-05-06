import type Base from '../Components/Base';
export type ComponentRegistry = Record<string, typeof Base>;
export const HummerDefaultNamespace = "hummer_default_namespace_";
export type HMContextConfig = {
    nameSpace: string;
    componentRegistry?: ComponentRegistry;
    navigatorAdapter?;
};
export const DefaultConfig: HMContextConfig = {
    nameSpace: HummerDefaultNamespace,
};
export interface HMNavigator {
    /**
     * 打开某个页面
     * @param pageInfo 页面信息
     * @param callback 页面结果回调
     */
    openPage(pageInfo: Object, callback: fn);
    /**
     * 关闭当前页面
     * @param pageInfo 页面信息
     */
    popPage(pageInfo: Object);
    /**
     * 回退到指定页面
     * @param pageInfo 页面信息
     */
    popToPage(pageInfo: Object);
    /**
     * 回退到首页
     * @param pageInfo 页面信息（是否需要动画）
     */
    popToRootPage(pageInfo: Object);
    /**
     * 向前回退指定数量的页面
     * @param count 要回退的页面级数（默认是1）
     * @param pageInfo 页面信息（是否需要动画）
     */
    popBack(count: number, pageInfo: Object);
}

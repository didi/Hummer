import type { PageInfo } from '../../Context/Config/IHMNavigator';
import { HMEntranceController } from "@bundle:com.example.hummer/entry/src/main/Hummer/HMEntrance";
import { HUMMER_NO_NAVSTACK_ERROR } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Error";
import { isUndefined } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
import type { fn, HMAny } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
import { Component } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Component";
class PageData implements IPageData {
    pageInfo?: PageInfo;
    closeCallback?: fn;
    navStack?: NavPathStack;
    result?: HMAny;
}
export interface IPageData {
    pageInfo?: PageInfo; //当前页面信息
    closeCallback?: fn; //返回上一个页面时的回调
    navStack?: NavPathStack;
    result?: HMAny; //返回上个页面时的数据
}
export class HMNavigator extends Component {
    /**
     * 打开某个页面
     * @param pageInfo 页面信息
     * @param callback 页面结果回调
     */
    openPage(pageInfo: PageInfo, callback?: fn) {
        const navigatorAdapter = this.context.config?.navigatorAdapter;
        if (navigatorAdapter) {
            navigatorAdapter.openPage(this.context, pageInfo, callback);
        }
        else {
            const navStack = this.getNavStack();
            if (navStack) {
                const data = new PageData();
                data.pageInfo = pageInfo;
                data.closeCallback = callback;
                data.navStack = navStack;
                const closeSelf = pageInfo.closeSelf;
                if (closeSelf) {
                    navStack.replacePath({
                        name: pageInfo.url,
                        param: data
                    }, this.getAnimated(pageInfo));
                }
                else {
                    navStack.pushPath({
                        name: pageInfo.url,
                        param: data
                    }, this.getAnimated(pageInfo));
                }
            }
            else {
                this.context.handleError(HUMMER_NO_NAVSTACK_ERROR);
            }
        }
    }
    /**
     * 关闭当前页面
     * @param pageInfo 页面信息
     */
    popPage(pageInfo: PageInfo) {
        const navigatorAdapter = this.context.config?.navigatorAdapter;
        if (navigatorAdapter) {
            navigatorAdapter.popPage(this.context, pageInfo);
        }
        else {
            const navStack = this.getNavStack();
            if (navStack) {
                navStack.pop(this.getAnimated(pageInfo));
            }
            else {
                this.context.handleError(HUMMER_NO_NAVSTACK_ERROR);
            }
        }
    }
    /**
     * 回退到指定页面
     * @param pageInfo 页面信息
     */
    popToPage(pageInfo: PageInfo) {
        const navigatorAdapter = this.context.config?.navigatorAdapter;
        if (navigatorAdapter) {
            navigatorAdapter.popToPage(this.context, pageInfo);
        }
        else {
            const navStack = this.getNavStack();
            if (navStack) {
                navStack.popToName(pageInfo.url, this.getAnimated(pageInfo));
            }
            else {
                this.context.handleError(HUMMER_NO_NAVSTACK_ERROR);
            }
        }
    }
    /**
     * 回退到首页
     * @param pageInfo 页面信息（是否需要动画）
     */
    popToRootPage(pageInfo: PageInfo) {
        const navigatorAdapter = this.context.config?.navigatorAdapter;
        if (navigatorAdapter) {
            navigatorAdapter.popToRootPage(this.context, pageInfo);
        }
        else {
            const navStack = this.getNavStack();
            if (navStack) {
                navStack.clear(this.getAnimated(pageInfo));
            }
            else {
                this.context.handleError(HUMMER_NO_NAVSTACK_ERROR);
            }
        }
    }
    /**
     * 向前回退指定数量的页面
     * @param count 要回退的页面级数（默认是1）
     * @param pageInfo 页面信息（是否需要动画）
     */
    popBack(count: number, pageInfo: PageInfo) {
        const navigatorAdapter = this.context.config?.navigatorAdapter;
        if (navigatorAdapter) {
            navigatorAdapter.popBack(this.context, count, pageInfo);
        }
        else {
            const navStack = this.getNavStack();
            if (navStack) {
                const pages = navStack.getAllPathName();
                const targetIdx = pages.length - count - 1;
                if (targetIdx < 0) {
                    navStack.clear(this.getAnimated(pageInfo));
                }
                else {
                    navStack.popToIndex(targetIdx, this.getAnimated(pageInfo));
                }
            }
            else {
                this.context.handleError(HUMMER_NO_NAVSTACK_ERROR);
            }
        }
    }
    getNavStack(): NavPathStack | undefined {
        return HMEntranceController.getController(this.context)?.pageData?.navStack;
    }
    getAnimated(pageInfo: PageInfo): boolean {
        if (isUndefined(pageInfo.animated)) {
            return true;
        }
        return pageInfo.animated;
    }
}

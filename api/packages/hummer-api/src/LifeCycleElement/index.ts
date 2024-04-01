
const { document: _Document, proxy: _Proxy } = __Hummer__

import { HummerElement } from "../HummerElement"


/**
 * LifeCycleManager
 * 
 * 1、提供生命周期能力
 */
export class LifeCycleElement extends HummerElement {

    public constructor(tag: string, name: string = tag, props: any) {
        super(tag, name, props);
    }


    /**
     * 分发页面事件
     * 
     * 页面事件无需注册，自动向下分发
     * 
     * @param eventName  事件名称
     * @param event 事件类型
     */
    public override dispatchEvent(eventName: string, event: any): void {
        switch (eventName) {
            case '__onCreate__':
                this.onCreate();
                break;
            case '__onAppear__':
                this.onAppear();
                break;
            case '__onDisappear__':
                this.onDisappear();
                break;
            case '__onDestroy__':
                this.onDestroy();
                break;
            case '__onBack__':
                this.onBack();
                break;
        }
        //继续向下分发事件
        super.dispatchEvent(eventName, event);
    }


    /**
     * 页面创建
     *  native 不提供onReady， 
     *  需手动加一个onReady生命周期
     */
    public onCreate(e?: undefined|Function|any) {

    }


    /**
     * 页面显示周期
     */
    public onAppear() {

    }

    /**
     * 页面隐藏
     */
    public onDisappear() {

    }

    /**
     * 页面销毁
     */
    public onDestroy() {

    }

    /**
     * 页面返回事件
     * 需要控制页面是否可以返回，需要设置属性：canGoBack；而不是通过返回值
     * @param event  事件信息，包含当前页面是否可返回:canGoBack
     * @returns 
     */
    public onBack() {

    }

    public get canGoBack(): boolean {
        return this._getAttribute('canGoBack');
    }

    public set canGoBack(canGoBack: boolean) {
        this._setAttribute('canGoBack', canGoBack);
    }


}
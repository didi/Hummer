import { HummerElement, HMEvent, ViewEvent } from "../../HummerElement"
import { FlexStyle } from "../../Element"



export interface SwitchStyle extends FlexStyle {
    /**
     * 打开时的颜色	
     * 默认:系统默认
     * 
     * onColor: '#FF0000'
     */
    onColor?: string,
    /**
     * 关闭时的颜色	
     * 默认:系统默认
     * 
     * offColor: '#999999'
     */
    offColor?: string,
    /**
     * 滑块颜色	
     * 默认:系统默认
     * 
     * thumbColor: '#0000FF'
     */
    thumbColor?: string
}


/**
 * 文本输入事件
 * 
 * eventName:'switch'
 */
export interface SwitchEvent extends HMEvent<number> {

    /**
     * 选择状态（0:未选中或1:选中）	
     * 
     * state: 1
     */
    state: number

}


export class Switch extends HummerElement {


    /**
     * 构造方法
     * 
     * @param id 
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Switch", name, { ...props, viewId: id });
    }


    //扩展样式属性：有代理时通过代理处理
    public set style(value: SwitchStyle | Record<string, any>) {
        this.setStyle(value, false);
    }

    // FIXME: 鸿蒙下样式问题
    public get style() {
        return this.getStyle() || {};
    }

    /**
     * 扩展属性
     * 默认值:false
     */
    set checked(value: boolean) {
        this._setAttribute("checked", value);
    }


    get checked(): boolean {
        return this._getAttribute('checked');
    }


    /**
     * 添加事件监听
     * 
     * @param eventName 
     * @param eventListener   滚动事件:scroll @see SwitchEvent
     * @param useCapture 
     */
    public override addEventListener(eventName: string, eventListener: (event: SwitchEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void {
        super.addEventListener(eventName, eventListener, useCapture);
    }


}
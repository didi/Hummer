import { EventListener } from "../../EventTarget";
import { HummerElement } from "../../HummerElement"
import { HMEvent, ViewEvent } from "../../HummerElement"
import { FlexStyle } from "../../Element"


export interface InputStyle extends FlexStyle {

    /**
     * 键盘可输入字符类型
     * 默认:'default'
     * 
     * 	type: 'default' | 'number' | 'tel' | 'email' | 'password'
     */
    type?: string
    /**
     * 输入文本颜色	
     * 默认:系统默认
     * 
     * color: '#000000'
     */
    color?: string
    /**
     * 占位提示文本颜色
     * 默认:系统默认
     * 
     * placeholderColor: '#999999'
     */
    placeholderColor?: string
    /**
     * 光标颜色	
     * 默认:系统默认
     * 
     * cursorColor: '#007AFF'
     */
    cursorColor?: string
    /**
     * 文本对齐方式	
     * 默认:'left'
     * 
     * textAlign: 'left' | 'center' | 'right'
     */
    textAlign?: string
    /**
     * 字体	
     * 默认:系统默认
     * 
     * fontFamily: "New Times Roma"
     */
    fontFamily?: string
    /**
     * 字体大小
     * 默认:16
     * 
     * fontSize: 16 | '48px'
     */
    fontSize?: number | string
    /**
     * 最大输入长度	
     * 默认:0（无限制）	
     * 
     * maxLength: 10
     */
    maxLength?: number
    /**
     * 键盘输入结束按钮类型	
     * 默认:'done'
     * 
     * returnKeyType: 'done' | 'go' | 'next' | 'search' | 'send'
     */
    returnKeyType?: string
}



/**
 * 文本输入事件
 * 
 * eventName:'input'
 */
export interface InputEvent extends HMEvent<number> {

    /**
     * 输入状态
     * 
     * state: 1 // began（输入框获得焦点时的回调）
     * state: 2 // changed（输入框输入内容时的回调）
     * state: 3 // ended（输入框失去焦点时的回调）
     * state: 4 // confirmed（输入框完成输入时的回调）
     */
    state: number;
    /**
     * 输入文本	
     * 
     * text: 'xxx'
     * 
     */
    text: string
}


export class Input extends HummerElement {


    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Input", name, { ...props, viewId: id });
        this.addEventListener('input', (event: InputEvent) => {
            this._setAttribute("text", event.text, false);
        });
    }

    //扩展样式属性：有代理时通过代理处理
    public set style(value: InputStyle | Record<string, any>) {
        this.setStyle(value, false);
    }

    /**
     * 默认输入内容
     */
    get text() {
        return this._getAttribute("text")
    }

    set text(value: string) {
        this._setAttribute("text", value);
    }

    /**
     * placeholder内容
     */
    get placeholder() {
        return this._getAttribute("placeholder")
    }

    set placeholder(value: string) {
        this._setAttribute("placeholder", value);
    }


    /**
     * 是否处于激活状态
     */
    get focused() {
        return this._getAttribute("focused")
    }

    set focused(value: boolean) {
        this._setAttribute("focused", value);
    }


    /**
     * 添加事件监听
     * 
     * @param eventName 
     * @param eventListener   新增事件:input @see InputEvent
     * @param useCapture 
     */
    public override addEventListener(eventName: string, eventListener: (event: InputEvent | ViewEvent | any) => void | Function | EventListener, useCapture?: boolean | undefined): void {
        super.addEventListener(eventName, eventListener, useCapture);
    }

}


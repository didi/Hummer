import { EventListener } from "src/EventTarget";
import { HummerElement } from "../../HummerElement"
import { HMEvent } from "../../HummerElement"
import { FlexStyle } from "../../Element"

interface InputStyle extends FlexStyle {
    type?: string
    color?:	string
    placeholderColor?:	string
    cursorColor?:	string
    textAlign?:	string
    fontFamily?:	string
    fontSize?:	number|string
    maxLength?:	number
    returnKeyType?:	string
}



interface InputEvent extends HMEvent<number> {
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
     * 
     * @param eventName 
     * @param eventListener   新增事件:input @see InputEvent
     * @param useCapture 
     */
    public override addEventListener(eventName: string, eventListener: (event: InputEvent) => void | Function | EventListener, useCapture?: boolean | undefined): void {
        super.addEventListener(eventName, eventListener, useCapture);
    }

}


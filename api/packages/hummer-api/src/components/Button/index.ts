import { HummerElement } from "../../HummerElement"
import { FlexStyle } from "../../Element"


export interface ButtonStyle extends FlexStyle {
    /**
     * 文本颜色	
     * 默认:系统默认
     * 
     * color: '#000000'
     */
    color?: string
    /**
     * 字体	
     * 默认:系统默认
     * 
     * fontFamily: 'Times New Roman'
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
     * 文本对齐方式	
     * 默认:'left'
     * 
     * textAlign:'left' | 'center' | 'right'
     */
    textAlign?: string
}


export class Button extends HummerElement {


    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Button", name, { ...props, viewId: id });
    }

    //扩展样式属性：有代理时通过代理处理
    public set style(value: ButtonStyle | Record<string, any>) {
        this.setStyle(value, false);
    }


    /**
     * 按钮文案
     */
    get text() {
        return this._getAttribute("text")
    }

    set text(value: string) {
        this._setAttribute("text", value);
    }

    /**
     * 按压状态下的样式
     */
    get pressed() {
        return this._getAttribute("pressed")
    }

    set pressed(value: object) {
        this._setAttribute("pressed", value);
    }


    public setElementText(text: string): void {
        this.text = text;
    }


    /**
     * 禁用状态下的样式
     */
    override get disabled() {
        return this._getAttribute("disabled")
    }

    override set disabled(value: Boolean | Record<string, any>) {
        if (typeof value === "boolean") {
            super.disabled = value
        } else {
            this._setAttribute("disabled", value);
        }
    }


    /**
    * 
    * @param key 
    * @param value 
    * @returns 
    * 
    * 1、所有组件支持的属性都需要写 get set方法 兼容旧版本api使用。
    * 2、对有额外处理的需要重新setAttribute方法，对tenon调用接口做补充，增加额外处理
    */
    public setAttribute(key: string, value: any): void {
        switch (key) {
            case 'disabled':
                if (typeof value === "boolean") {
                    super.disabled = value
                } else {
                    this._setAttribute("disabled", value);
                }
                return;
        }
        super.setAttribute(key, value);
    }



}
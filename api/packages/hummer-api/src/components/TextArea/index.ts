import { HummerElement } from "../../HummerElement"
import { FlexStyle } from "../../Element"

interface TextAreaStyle extends FlexStyle {
    type?: string
    color?:	string
    placeholderColor?:	string
    cursorColor?:	string
    textAlign?:	string
    fontFamily?:	string
    fontSize?:	number|string
    maxLength?:	number
    returnKeyType?:	string
    textLineClamp?:	number
}


export class TextArea extends HummerElement {


    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("TextArea", name, { ...props, viewId: id });
        this._initAttributes({
            text: '',
            placeholder: '',
            focused: 'false'
        });
        this.addEventListener('input', (event: any) => {
            this._setAttribute("text", event.text, false);
        });
    }

    //扩展样式属性：有代理时通过代理处理
    public set style(value: TextAreaStyle | Record<string, any>) {
        this.setStyle(value, false);
    }


    
    /**
     * 默认输入内容
     */
    get text() {
        return this._getAttribute('text');
    }

    set text(value: string) {
        this._setAttribute("text", value);
    }

    /**
     * placeholder内容
     */
    get placeholder() {
        return this._getAttribute('placeholder');
    }

    set placeholder(value: string) {
        this._setAttribute("placeholder", value);
    }


    /**
     * 是否处于激活状态
     */
    get focused() {
        return this._getAttribute('focused');
    }

    set focused(value: boolean) {
        this._setAttribute("focused", value);
    }




}
import { HummerElement } from "../../HummerElement"
import { FlexStyle } from "../../Element"





export interface TextAreaStyle extends FlexStyle {

    // type	string	'default'	键盘可输入字符类型	type: 'default' | 'number' | 'tel' | 'email' | 'password'
    // color	string	系统默认	输入文本颜色	color: '#000000'
    // placeholderColor	string	系统默认	占位提示文本颜色	placeholderColor: '#999999'
    // cursorColor	string	系统默认	光标颜色	cursorColor: '#007AFF'

    type?: string
    color?: string
    placeholderColor?: string
    cursorColor?: string


    // textAlign	string	'left'	文本对齐方式	textAlign: 'left' | 'center' | 'right'
    // fontFamily	string	系统默认	字体	fontFamily: "New Times Roma"
    // fontSize	number|string	16	字体大小	fontSize: 16 | '48px'

    textAlign?: string
    fontFamily?: string
    fontSize?: number | string

    // maxLength	number	0（无限制）	最大输入长度	maxLength: 10
    // returnKeyType	string	'done'	键盘输入结束按钮类型	returnKeyType: 'done' | 'go' | 'next' | 'search' | 'send'
    // textLineClamp	number	0（无限制）	最大输入行数	textLineClamp: 1 // 单行输入

    maxLength?: number
    returnKeyType?: string
    textLineClamp?: number
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
            focused: false
        });
        this.addEventListener('input', (event: any) => {
            this._setAttribute("text", event.text, false);
        });
    }

    //扩展样式属性：有代理时通过代理处理
    public set style(value: TextAreaStyle | Record<string, any>) {
        this.setStyle(value, false);
    }

    //扩展样式属性
    // FIXME: 鸿蒙下样式问题
    // public get style() {
    //     return this.getStyle() || {};
    // }

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
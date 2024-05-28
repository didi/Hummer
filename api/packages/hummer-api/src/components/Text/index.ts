import { HummerElement } from "../../HummerElement"
import { FlexStyle } from "../../Element"



export interface TextStyle extends FlexStyle {

    // color	string	系统默认	文本颜色	color: '#000000'
    // fontFamily	string	系统默认	字体	fontFamily: 'Times New Roman'
    // fontSize	number|string	16	字体大小	fontSize: 16 | '48px'
    // fontWeight	string	'normal'	字体粗细	fontWeight: 'normal' | 'bold'
    // fontStyle	string	'normal'	字体样式（斜体）	fontStyle: 'normal' | 'italic'

    color?: string
    fontStyle?: string
    fontFamily?: string
    fontSize?: number | string
    fontWeight?: string

    // textAlign	string	'left'	文本水平对齐方式	textAlign: 'left' | 'center' | 'right'
    // textVerticalAlign	string	'center'	文本垂直对齐方式	textVerticalAlign: 'top' | 'center' | 'bottom'
    // textDecoration	string	'none'	文本装饰（下划线等）	textDecoration: 'none' | 'underline' | 'line-through'
    // textOverflow	string	'ellipsis'	文本内容超出控件时的省略样式	textOverflow: 'clip' | 'ellipsis'
    // textLineClamp	number	0（无限制）	文本行数	textLineClamp: 1

    textAlign?: string
    textVerticalAlign?: string
    textDecoration?: string
    textOverflow?: string
    textLineClamp?: number

    // letterSpacing	number	0	字间距（标准字体大小的倍数，单位是em）	letterSpacing: 0.5
    // lineSpacingMulti	number	1	行间距（倍数）	lineSpacingMulti: 1.2

    letterSpacing?: number
    lineSpacingMulti?: number
}

export class Text extends HummerElement {

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Text", name, { ...props, viewId: id });
        this._initAttributes({
            textCopyEnable: 'false'
        });
    }


    //扩展样式属性：有代理时通过代理处理
    public set style(value: TextStyle | Record<string, any>) {
        this.setStyle(value, false);
    }


    /**
     * 普通文本内容
     */
    get text() {
        return this._getAttribute('text');
    }

    set text(value: string) {
        this._setAttribute("text", value);
    }

    public setElementText(text: string): void {
        this.text = text;
    }

    /**
     * 富文本内容
     */
    get richText() {
        return this._getAttribute('richText');
    }

    set richText(value: any) {
        this._setAttribute("richText", value);
    }


    /**
     * 是否支持长按复制功能
     * 默认：false
     */
    get textCopyEnable() {
        return this._getAttribute('textCopyEnable');
    }

    set textCopyEnable(value: boolean) {
        this._setAttribute("textCopyEnable", value);
    }


}
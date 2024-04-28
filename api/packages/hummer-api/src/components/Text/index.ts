import { HummerElement } from "../../HummerElement"
import { FlexStyle } from "../../Element"


/**
 * 
 */
interface TextStyle extends FlexStyle {
    fontStyle?: string
    fontFamily?: string
    fontSize?: number | string
    fontWeight?: string
    textAlign?: string
    textVerticalAlign?: string
    textDecoration?: string
    textOverflow?: string
    textLineClamp?: number
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

    set richText(value: string) {
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
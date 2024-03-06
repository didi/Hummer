const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

export class Text extends HummerElement {


    protected _text: string = "";

    protected _richText: string = "";

    protected _textCopyEnable: boolean = false;

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Text", name, { ...props, viewId: id });
    }


    /**
     * 普通文本内容
     */
    get text() {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
        this._setAttribute("text", value);
    }

    /**
     * 富文本内容
     */
    get richText() {
        return this._richText;
    }

    set richText(value: string) {
        this._richText = value;
        this._setAttribute("richText", value);
    }


    /**
     * 是否支持长按复制功能
     * 默认：false
     */
    get textCopyEnable() {
        return this._textCopyEnable;
    }

    set textCopyEnable(value: boolean) {
        this._textCopyEnable = value;
        this._setAttribute("textCopyEnable", value);
    }

}
const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"

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
            text: '',
            richText: '',
            textCopyEnable: 'false'
        });
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
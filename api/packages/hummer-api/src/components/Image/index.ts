const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"
import { ImageStyle } from "./ImageStyle"


export class Image extends HummerElement {



    /**
    * 
    * @param id
    * @param name 
    * @param props 
    */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Image", name, { ...props, viewId: id });
        //设置默认属性值
        this._initAttributes({
            gifRepeatCount: 0
        });
    }


    /**
    * 普通图片
    */
    get src() {
        return this._getAttribute("src")
    }

    set src(value: string) {
        this._setAttribute("src", value);
    }

    /**
    * Gif图片
    */
    get gifSrc() {
        return this._getAttribute("gifSrc")
    }

    set gifSrc(value: string) {
        this._setAttribute("gifSrc", value);
    }

    /**
    * Gif播放次数
    */
    get gifRepeatCount() {
        return this._getAttribute("gifRepeatCount")
    }

    set gifRepeatCount(value: number) {
        this._setAttribute("gifRepeatCount", value);
    }


    /**
     * 加载资源
     * 
     * @param src 资源
     * @param listener 结果监听
     */
    load(src: string | ImageStyle, listener: Function) {
        this.call("load", src, listener);
    }
}


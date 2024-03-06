const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"
import { ImageStyle } from "./ImageStyle"


export class Image extends HummerElement {


    protected _src: string = "";

    protected _gifSrc: string = "";

    protected _gifRepeatCount: number = 0;

    /**
    * 
    * @param id
    * @param name 
    * @param props 
    */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Image", name, { ...props, viewId: id });
    }


    /**
    * 普通图片
    */
    get src() {
        return this._src;
    }

    set src(value: string) {
        this._src = value;
        this._setAttribute("src", value);
    }

    /**
    * Gif图片
    */
    get gifSrc() {
        return this._gifSrc;
    }

    set gifSrc(value: string) {
        this._gifSrc = value;
        this._setAttribute("gifSrc", value);
    }

    /**
    * Gif播放次数
    */
    get gifRepeatCount() {
        return this._gifRepeatCount;
    }

    set gifRepeatCount(value: number) {
        this._gifRepeatCount = value;
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


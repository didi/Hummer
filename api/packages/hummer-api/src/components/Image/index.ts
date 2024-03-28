const { document: _Document } = __Hummer__

import { HummerElement } from "../../HummerElement"
import { ImageStyle } from "./ImageStyle"




export class Image extends HummerElement {


    private _onLoad?: Function = undefined;

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

        this.addEventListener("__onImageLoad__", (event: any) => {
            this.onImageOnLoad(event);
        })
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
    * 加载失败资源
    */
    get failedImage() {
        return this._getAttribute("failedImage")
    }

    set failedImage(value: string) {
        this._setAttribute("failedImage", value);
    }

    /**
    * 占位资源
    */
    get placeholder() {
        return this._getAttribute("placeholder")
    }

    set placeholder(value: string) {
        this._setAttribute("placeholder", value);
    }

    /** 
    *资源加载结果
    */
    get onLoad(): Function | undefined {
        return this._onLoad;
    }

    set onLoad(value: Function | undefined) {
        this._onLoad = value;
    }


    /**
     * 分发资源加载结果回调
     * 
     * @param event @see 
     */
    protected onImageOnLoad(event: any) {
        if (this._onLoad) {
            this._onLoad(event.srcType, event.state);
        }
    }

    /**
     * 加载资源
     * 
     * @param src 资源
     * @param listener 结果监听
     */
    load(source: string | ImageStyle, callback: Function) {
        if (typeof source === 'string') {
            this._setAttribute("src", source);
            this._setAttribute("gifSrc", undefined);
        } else {
            this._setAttribute("src", source.src);
            this._setAttribute("gifSrc", undefined);

            if (!source.gifSrc && source.gifSrc !== "") {
                this._setAttribute("gifSrc", source.gifSrc);
                this._setAttribute("src", undefined);
            }
            if (source.placeholder) {
                this._setAttribute("placeholder", source.placeholder);
            }
            if (source.failedImage) {
                this._setAttribute("failedImage", source.failedImage);
            }
            if (source.gifRepeatCount) {
                this._setAttribute("gifRepeatCount", source.gifRepeatCount);
            }

        }
        this._onLoad = callback;
    }

}


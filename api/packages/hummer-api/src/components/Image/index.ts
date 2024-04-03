import { HummerElement } from "../../HummerElement"
import { ImageAttribute } from "./ImageAttribute"
import { HMEvent } from "../../HummerElement"
import { FlexStyle } from "../../Element"

interface ImageStyle extends FlexStyle {
    resize?: string
}


interface ImageEvent extends HMEvent<number> {
    srcType:number;
}

export class Image extends HummerElement {


    private _onLoad?: ( (srcType: number, isSuccess: boolean) => void ) | Function | undefined;

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

        this.addEventListener("__onImageLoad__", (event: ImageEvent) => {
            this.onImageOnLoad(event);
        })
    }

    //扩展样式属性：有代理时通过代理处理
    public set style(value: ImageStyle | Record<string, any>) {
        this.setStyle(value, false);
    }


    /**
     * 普通图片
     */
    get src() {
        return this._getAttribute("src")
    }

    set src(value: string) {
        this._setAttribute("src", value);
        this._removeAttribute("gifSrc");
    }

    /**
    * Gif图片
    */
    get gifSrc() {
        return this._getAttribute("gifSrc")
    }

    set gifSrc(value: string) {
        this._setAttribute("gifSrc", value);
        this._removeAttribute("src");
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
    get onLoad(): ( (srcType: number, isSuccess: boolean) => void ) | Function | undefined {
        return this._onLoad;
    }

    set onLoad(value: ( (srcType: number, isSuccess: boolean) => void ) | Function| undefined ) {
        this._onLoad = value;
    }


    /**
     * 分发资源加载结果回调
     * 
     * @param event @see 
     */
    protected onImageOnLoad(event: ImageEvent) {
        if (this._onLoad) {
            let isSuccess = false
            if(event.state === 0 ){
                isSuccess = true
            }

            this._onLoad(event.srcType, isSuccess);
        }
    }

    /**
     * 加载资源
     * 
     * @param src 资源
     * @param listener 结果监听
     */
    load(source: string | ImageAttribute, callback: ( (srcType: number, isSuccess: boolean) => void ) | Function | undefined) {
        if (typeof source === 'string') {
            this._setAttribute("src", source);
            this._removeAttribute("gifSrc");
        } else {
            this._setAttribute("src", source.src);
            this._removeAttribute("gifSrc");

            if (!source.gifSrc && source.gifSrc !== "") {
                this._setAttribute("gifSrc", source.gifSrc);
                this._removeAttribute("src");
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
            case 'src':
                this.src = value;
                return;
            case 'gifSrc':
                this.gifSrc = value;
                return;

        }
        this._setAttribute(key, value);
    }

}



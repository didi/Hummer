interface HMImage_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: Node;
    src?: string | undefined;
    style?: IHummerImageStyle | undefined;
    attributes?: AttributesType | undefined;
    imageSource?: ImageSourceHolder | undefined;
}
import { MutationType } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Node";
import type { AttributesType, Node } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Node";
import type { HMContext } from '../../Context/HMContext';
import commonStyleModifier from "@bundle:com.example.hummer/entry/src/main/Hummer/AttributeModifiers/CommonStyleModifier";
import type { ComponentBuilderContext } from './ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/EventHandler";
import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Event";
import type { IHummerImageStyle } from '../../Style/IHummerStyle';
class ImageSourceHolder {
    public source?: string | Resource | PixelMap;
    constructor(source?: string | Resource | PixelMap) {
        this.source = source;
    }
}
class CombineState {
    public node!: Node;
    public attributes: AttributesType | undefined = undefined;
    public style: IHummerImageStyle | undefined = undefined;
    constructor() {
    }
}
export default class HMImage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.src = undefined;
        this.__style = new ObservedPropertyObjectPU(undefined, this, "style");
        this.__attributes = new ObservedPropertyObjectPU(undefined, this, "attributes");
        this.__imageSource = new ObservedPropertyObjectPU(undefined, this, "imageSource");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMImage_Params) {
        if (params.builderContext !== undefined) {
            this.builderContext = params.builderContext;
        }
        if (params.hmContext !== undefined) {
            this.hmContext = params.hmContext;
        }
        if (params.node !== undefined) {
            this.node = params.node;
        }
        if (params.src !== undefined) {
            this.src = params.src;
        }
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.attributes !== undefined) {
            this.attributes = params.attributes;
        }
        if (params.imageSource !== undefined) {
            this.imageSource = params.imageSource;
        }
    }
    updateStateVars(params: HMImage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__attributes.purgeDependencyOnElmtId(rmElmtId);
        this.__imageSource.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        this.__attributes.aboutToBeDeleted();
        this.__imageSource.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: Node;
    private src: string | undefined;
    private __style: ObservedPropertyObjectPU<IHummerImageStyle | undefined>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: IHummerImageStyle | undefined) {
        this.__style.set(newValue);
    }
    private __attributes: ObservedPropertyObjectPU<AttributesType | undefined>;
    get attributes() {
        return this.__attributes.get();
    }
    set attributes(newValue: AttributesType | undefined) {
        this.__attributes.set(newValue);
    }
    private __imageSource: ObservedPropertyObjectPU<ImageSourceHolder | undefined>;
    get imageSource() {
        return this.__imageSource.get();
    }
    set imageSource(newValue: ImageSourceHolder | undefined) {
        this.__imageSource.set(newValue);
    }
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.style = this.node.style as IHummerImageStyle;
        this.attributes = this.node.attributes;
        this.updateImageSource();
        // todo: 是否有更好的 监听改动机制
        this.node.registerUpdateFunc(MutationType.Style, (style: IHummerImageStyle) => {
            this.style = style;
        }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
            this.attributes = attributes;
            this.updateImageSource();
        });
    }
    aboutToDisappear(): void {
        this.node.unregisterAllUpdateFuncs();
    }
    updateImageSource() {
        const uri: string = this.attributes?.src ? this.attributes?.src : this.attributes?.gifSrc;
        // 重复设置
        if (this.src == uri && this.src) {
            return;
        }
        this.src = uri;
        if (uri && uri.startsWith("asset://")) {
            this.imageSource = new ImageSourceHolder($rawfile(uri.replace("asset://", "assets/")));
            return;
        }
        if (uri && uri.startsWith("data:")) {
            this.imageSource = new ImageSourceHolder(uri);
            return;
        }
        this.imageSource = new ImageSourceHolder(uri);
        //todo: 开发图片库
    }
    dispatchOnError(event: ImageError) {
        //todo: 回调 error
    }
    dispatchOnComplete(event: ImageError) {
        //todo: 回调 error
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imageSource?.source);
            Image.debugLine("entry/src/main/Hummer/Components/ets/Image.ets(104:5)");
            Image.objectFit(this.resize);
            Image.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, ObservedObject.GetRawObject(this.style)));
            Image.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
            Image.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
            Image.onComplete((e) => { });
            Image.onError((event: ImageError) => this.dispatchOnError(event));
        }, Image);
    }
    rerender() {
        this.updateDirtyElements();
    }
}

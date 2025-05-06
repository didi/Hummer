interface HMImage_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: HMNode;
    src?: string | undefined;
    props?: ImagePropsWrapper | undefined;
    imageSource?: ImageSourceHolder | undefined;
}
import type { HMNode } from '../../Node';
import type { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import type { ComponentBuilderContext } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import { parseImageSrc } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Image/utils";
import { ImagePropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Image/ImagePropsWrapper";
import { dispatchImageEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Image/Event";
import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
class ImageSourceHolder {
    public source?: string | Resource | PixelMap;
    constructor(source?: string | Resource | PixelMap) {
        this.source = source;
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
        this.__props = new ObservedPropertyObjectPU(undefined, this, "props");
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
        if (params.props !== undefined) {
            this.props = params.props;
        }
        if (params.imageSource !== undefined) {
            this.imageSource = params.imageSource;
        }
    }
    updateStateVars(params: HMImage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__props.purgeDependencyOnElmtId(rmElmtId);
        this.__imageSource.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__props.aboutToBeDeleted();
        this.__imageSource.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: HMNode;
    private src: string | undefined;
    private __props: ObservedPropertyObjectPU<ImagePropsWrapper | undefined>;
    get props() {
        return this.__props.get();
    }
    set props(newValue: ImagePropsWrapper | undefined) {
        this.__props.set(newValue);
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
        this.props = new ImagePropsWrapper(this.node);
        this.updateImageSource();
        this.props.bindPropsUpdate(() => {
            this.updateImageSource();
        });
    }
    aboutToDisappear(): void {
        this.props?.dispose();
    }
    updateImageSource() {
        const uri: string | undefined = this.props?.src ? this.props?.src : this.props?.gifSrc;
        // 重复设置
        if (isUndefined(uri) || (this.src == uri && this.src)) {
            return;
        }
        this.src = uri;
        if (uri && uri.startsWith("data:")) {
            this.imageSource = new ImageSourceHolder(uri);
            return;
        }
        const resourceStr = parseImageSrc(uri, this.hmContext.baseUrl);
        this.imageSource = new ImageSourceHolder(resourceStr);
        return;
        //todo: 开发图片库
    }
    dispatchOnError(event: ImageError) {
        //todo: 回调 error
    }
    dispatchOnComplete(event: ImageError) {
        //todo: 回调 error
    }
    resize(): ImageFit {
        const hummerResize = this.props?.resize;
        // 'origin' | 'contain' | 'cover' | 'stretch'
        switch (hummerResize) {
            case 'origin':
                return ImageFit.None;
            case 'contain':
                return ImageFit.Contain;
            case 'cover':
                return ImageFit.Cover;
            case 'stretch':
                return ImageFit.Fill;
            default:
                return ImageFit.Fill;
        }
    }
    handleEvent(isSuccess: boolean) {
        dispatchImageEvent(this.node, isSuccess);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imageSource?.source);
            Image.debugLine("hummer/src/main/ets/Components/ets/Image/Image.ets(96:5)");
            Image.objectFit(this.resize());
            Image.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node, this.props?.style));
            Image.onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)));
            Image.onTouch(shouldBindEvent(this.props!.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)));
            Image.onComplete((e) => {
                this.handleEvent(true);
            });
            Image.onError((event: ImageError) => {
                this.handleEvent(false);
            });
        }, Image);
    }
    rerender() {
        this.updateDirtyElements();
    }
}

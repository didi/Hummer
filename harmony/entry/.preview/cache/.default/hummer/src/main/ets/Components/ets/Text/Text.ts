interface HMText_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: HMNode;
    props?: TextPropsWrapper | undefined;
    text?: string | undefined;
    richText?: IRichTextAttributes | (IRichTextAttributes | string)[] | undefined;
    controller?: TextController;
    options?: TextOptions;
}
import type { HMNode } from '../../Node';
import type { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import type { ComponentBuilderContext } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import type { IRichTextAttributes } from './IProps';
import { getCopyOptions, getFontStyle, getFontWeight, getImageSpanAlignment, getTextAlign, getTextDecoration, getTextOverflow, getTextVerticalAlign, } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/Utils";
import { convertColorToARGB, getVP, getVPNoPercent } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import { parseImageSrc } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Image/utils";
import { TextPropsWrapper } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Text/TextPropsWrapper";
export default class HMText extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.__props = new ObservedPropertyObjectPU(undefined, this, "props");
        this.__text = new ObservedPropertyObjectPU(undefined, this, "text");
        this.__richText = new ObservedPropertyObjectPU(undefined, this, "richText");
        this.controller = new TextController();
        this.options = { controller: this.controller };
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMText_Params) {
        if (params.builderContext !== undefined) {
            this.builderContext = params.builderContext;
        }
        if (params.hmContext !== undefined) {
            this.hmContext = params.hmContext;
        }
        if (params.node !== undefined) {
            this.node = params.node;
        }
        if (params.props !== undefined) {
            this.props = params.props;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.richText !== undefined) {
            this.richText = params.richText;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.options !== undefined) {
            this.options = params.options;
        }
    }
    updateStateVars(params: HMText_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__props.purgeDependencyOnElmtId(rmElmtId);
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__richText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__props.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__richText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: HMNode;
    private __props: ObservedPropertyObjectPU<TextPropsWrapper | undefined>;
    get props() {
        return this.__props.get();
    }
    set props(newValue: TextPropsWrapper | undefined) {
        this.__props.set(newValue);
    }
    private __text: ObservedPropertyObjectPU<string | undefined>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string | undefined) {
        this.__text.set(newValue);
    }
    private __richText: ObservedPropertyObjectPU<IRichTextAttributes | (IRichTextAttributes | string)[] | undefined>;
    get richText() {
        return this.__richText.get();
    }
    set richText(newValue: IRichTextAttributes | (IRichTextAttributes | string)[] | undefined) {
        this.__richText.set(newValue);
    }
    private controller: TextController;
    private options: TextOptions;
    // webviewController: web_webview.WebviewController = new web_webview.WebviewController();
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.props = new TextPropsWrapper(this.node);
        this.props.bindPropsUpdate(() => {
            this.updateContent();
        });
        this.updateContent();
    }
    updateContent() {
        this.richText = this.props?.richText || undefined;
        if (this.props?.richText && !Array.isArray(this.props?.richText)) {
            this.richText = [this.props?.richText];
        }
        this.text = this.props?.text;
    }
    aboutToDisappear(): void {
        this.props?.dispose();
    }
    getImageResource(uri: string) {
        if (uri && uri.startsWith("data:")) {
            return uri;
        }
        return parseImageSrc(uri, this.hmContext.baseUrl);
        //todo: 开发图片库
    }
    getLineHeight(lineSpacingMulti: number = 1, fontSize: string | number = 16) {
        return getVPNoPercent(fontSize, 16) * lineSpacingMulti;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.richText) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(undefined, this.options);
                        Text.debugLine("hummer/src/main/ets/Components/ets/Text/Text.ets(75:9)");
                        Text.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
                    }, Text);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const richTextNode = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (typeof richTextNode === 'string') {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.create(richTextNode);
                                            Span.debugLine("hummer/src/main/ets/Components/ets/Text/Text.ets(79:15)");
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontColor(this.props?.color);
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.textBackgroundStyle({ color: this.props?.backgroundColor });
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontFamily(this.props?.fontFamily);
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontStyle(getFontStyle(this.props?.fontStyle));
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontWeight(getFontWeight(this.props?.fontWeight));
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontSize(this.props?.fontSize);
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.lineHeight(this.getLineHeight(this.props?.lineSpacingMulti, this.props?.fontSize) || undefined);
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.decoration({
                                                type: getTextDecoration(this.props?.textDecoration),
                                                color: this.props?.color
                                            });
                                        }, Span);
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            If.create();
                                            if (richTextNode.image) {
                                                this.ifElseBranchUpdateFunction(0, () => {
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        ImageSpan.create(this.getImageResource(richTextNode?.image));
                                                        ImageSpan.debugLine("hummer/src/main/ets/Components/ets/Text/Text.ets(93:17)");
                                                        ImageSpan.verticalAlign(getImageSpanAlignment(richTextNode?.imageAlign || 'baseline'));
                                                        ImageSpan.width(getVP(richTextNode?.imageWidth as string));
                                                        ImageSpan.height(getVP(richTextNode?.imageHeight as string));
                                                    }, ImageSpan);
                                                });
                                            }
                                            else {
                                                this.ifElseBranchUpdateFunction(1, () => {
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.create(richTextNode.text);
                                                        Span.debugLine("hummer/src/main/ets/Components/ets/Text/Text.ets(99:17)");
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontColor(richTextNode?.color || this.props?.color);
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.textBackgroundStyle({ color: (convertColorToARGB(richTextNode?.backgroundColor) || this.props?.backgroundColor) });
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontFamily(richTextNode?.fontFamily || this.props?.fontFamily);
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontStyle(getFontStyle(richTextNode?.fontStyle || this.props?.fontStyle));
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontWeight(getFontWeight(richTextNode?.fontWeight || this.props?.fontWeight));
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontSize((getVP(richTextNode?.fontSize) || this.props?.fontSize));
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.decoration({
                                                            type: getTextDecoration(richTextNode?.textDecoration || this.props?.textDecoration),
                                                            color: convertColorToARGB(richTextNode?.color) || this.props?.color
                                                        });
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.onClick(() => {
                                                            console.warn('暂不支持链接跳转');
                                                            // this.webviewController.loadUrl(richTextNode?.href)
                                                        });
                                                    }, Span);
                                                });
                                            }
                                        }, If);
                                        If.pop();
                                    });
                                }
                            }, If);
                            If.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.richText as IRichTextAttributes[], forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.text, this.options);
                        Text.debugLine("hummer/src/main/ets/Components/ets/Text/Text.ets(122:7)");
                        Text.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
                        Text.textAlign(getTextAlign(this.props?.textAlign));
                        Text.textOverflow({ overflow: getTextOverflow(this.props?.textOverflow) });
                        Text.maxLines(this.props?.textLineClamp);
                        Text.lineHeight(this.getLineHeight(this.props?.lineSpacingMulti, this.props?.fontSize) || undefined);
                        Text.decoration({
                            type: getTextDecoration(this.props?.textDecoration),
                            color: this.props?.color
                        });
                        Text.copyOption(getCopyOptions(this.props?.textCopyEnable));
                        Text.fontColor(this.props?.color);
                        Text.fontSize(this.props?.fontSize);
                        Text.fontFamily(this.props?.fontFamily);
                        Text.fontStyle(getFontStyle(this.props?.fontStyle));
                        Text.fontWeight(getFontWeight(this.props?.fontWeight));
                        Text.align(getTextVerticalAlign(this.props?.textVerticalAlign));
                        Text.onClick(shouldBindEvent(this.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.node, e)));
                        Text.onTouch(shouldBindEvent(this.node, TouchEventName, (e: TouchEvent) => dispatchTouchEvent(this.node, e)));
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

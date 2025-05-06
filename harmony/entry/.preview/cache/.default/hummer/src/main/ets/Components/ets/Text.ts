interface HMText_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: Node;
    style?: IHummerTextStyle | undefined;
    attributes?: AttributesType | undefined;
    text?: string | undefined;
    richText?: IHummerRichTextAttribute | (IHummerRichTextAttribute | string)[] | undefined;
    controller?: TextController;
    options?: TextOptions;
}
import { MutationType } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { AttributesType, Node } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { HMContext } from '../../Context/HMContext';
import commonStyleModifier from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import type { ComponentBuilderContext } from './ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/EventHandler";
import { TapEventName, TouchEventName } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Event";
import type { IHummerTextStyle } from '../../Interface/IHummerStyle';
import { getCopyOptions, getFontStyle, getFontWeight, getImageSpanAlignment, getTextAlign, getTextDecoration, getTextOverflow, getTextVerticalAlign, getVP } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/Utils";
import { convertColorToARGB } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import { parseImageSrc } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Image/utils";
interface IHummerRichTextAttribute {
    text?: string;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: string | number;
    fontWeight?: 'normal' | 'bold';
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline' | 'line-through';
    image?: string;
    imageWidth?: string | number;
    imageHeight?: string | number;
    imageAlign?: 'baseline' | 'top' | 'center' | 'bottom';
    href?: string;
    hrefColor?: string;
}
export default class HMText extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.__style = new ObservedPropertyObjectPU(undefined, this, "style");
        this.__attributes = new ObservedPropertyObjectPU(undefined, this, "attributes");
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
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.attributes !== undefined) {
            this.attributes = params.attributes;
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
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__attributes.purgeDependencyOnElmtId(rmElmtId);
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__richText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        this.__attributes.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__richText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: Node;
    private __style: ObservedPropertyObjectPU<IHummerTextStyle | undefined>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: IHummerTextStyle | undefined) {
        this.__style.set(newValue);
    }
    private __attributes: ObservedPropertyObjectPU<AttributesType | undefined>;
    get attributes() {
        return this.__attributes.get();
    }
    set attributes(newValue: AttributesType | undefined) {
        this.__attributes.set(newValue);
    }
    private __text: ObservedPropertyObjectPU<string | undefined>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string | undefined) {
        this.__text.set(newValue);
    }
    private __richText: ObservedPropertyObjectPU<IHummerRichTextAttribute | (IHummerRichTextAttribute | string)[] | undefined>;
    get richText() {
        return this.__richText.get();
    }
    set richText(newValue: IHummerRichTextAttribute | (IHummerRichTextAttribute | string)[] | undefined) {
        this.__richText.set(newValue);
    }
    private controller: TextController;
    private options: TextOptions;
    // webviewController: web_webview.WebviewController = new web_webview.WebviewController();
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.style = this.node.style as IHummerTextStyle;
        this.attributes = this.node.attributes;
        this.richText = this.attributes.richText || undefined;
        if (this.attributes.richText && !Array.isArray(this.attributes.richText)) {
            this.richText = [this.attributes.richText];
        }
        this.text = this.attributes.text || '';
        this.node.registerUpdateFunc(MutationType.Style, (style: IHummerTextStyle) => {
            this.style = style;
        }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
            this.richText = attributes.richText || undefined;
            if (attributes.richText && !Array.isArray(attributes.richText)) {
                this.richText = [attributes.richText];
            }
            this.text = attributes.text || '';
        });
    }
    aboutToDisappear(): void {
        this.node.unregisterAllUpdateFuncs();
    }
    getImageResource(uri: string) {
        if (uri && uri.startsWith("data:")) {
            return uri;
        }
        return parseImageSrc(uri, this.hmContext.baseUrl);
        //todo: 开发图片库
    }
    getLineHeight(lineSpacingMulti: number = 1, fontSize: string | number = 16) {
        return (getVP(fontSize) || 16) * lineSpacingMulti;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.richText) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(undefined, this.options);
                        Text.debugLine("hummer/src/main/ets/Components/ets/Text.ets(95:9)");
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
                                            Span.debugLine("hummer/src/main/ets/Components/ets/Text.ets(99:15)");
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontColor(this.style?.color || '#000000');
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.textBackgroundStyle({ color: convertColorToARGB(this.style?.backgroundColor) });
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontFamily(this.style?.fontFamily || 'HarmonyOS Sans');
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontStyle(getFontStyle(this.style?.fontStyle || 'normal'));
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontWeight(getFontWeight(this.style?.fontWeight || 'normal'));
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.fontSize(getVP(this.style?.fontSize || 16));
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.lineHeight(this.getLineHeight(this.style?.lineSpacingMulti, this.style?.fontSize) || undefined);
                                            // 来自于Text本身的样式属性也要尝试作用到子节点上
                                            Span.decoration({
                                                type: getTextDecoration(this.style?.textDecoration),
                                                color: this.style?.color || '#000000'
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
                                                        ImageSpan.debugLine("hummer/src/main/ets/Components/ets/Text.ets(113:17)");
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
                                                        Span.debugLine("hummer/src/main/ets/Components/ets/Text.ets(119:17)");
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontColor(richTextNode?.color || this.style?.color || '#000000');
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.textBackgroundStyle({ color: convertColorToARGB(richTextNode?.backgroundColor || this.style?.backgroundColor) });
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontFamily(richTextNode?.fontFamily || this.style?.fontFamily || 'HarmonyOS Sans');
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontStyle(getFontStyle(richTextNode?.fontStyle || this.style?.fontStyle || 'normal'));
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontWeight(getFontWeight(richTextNode?.fontWeight || this.style?.fontWeight || 'normal'));
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.fontSize(getVP(richTextNode?.fontSize || this.style?.fontSize || 16));
                                                        // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                                                        Span.decoration({
                                                            type: getTextDecoration(richTextNode?.textDecoration || this.style?.textDecoration),
                                                            color: richTextNode?.color || this.style?.color || '#000000'
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
                        this.forEachUpdateFunction(elmtId, this.richText as IHummerRichTextAttribute[], forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.text, this.options);
                        Text.debugLine("hummer/src/main/ets/Components/ets/Text.ets(142:7)");
                        Text.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
                        Text.textAlign(getTextAlign(this.style?.textAlign || 'left'));
                        Text.textOverflow({ overflow: getTextOverflow(this.style?.textOverflow) });
                        Text.maxLines(this.style?.textLineClamp || 9999);
                        Text.lineHeight(this.getLineHeight(this.style?.lineSpacingMulti, this.style?.fontSize) || undefined);
                        Text.decoration({
                            type: getTextDecoration(this.style?.textDecoration),
                            color: this.style?.color || '#000000'
                        });
                        Text.copyOption(getCopyOptions(this.attributes?.textCopyEnable));
                        Text.fontColor(this.style?.color || '#000000');
                        Text.fontSize(getVP(this.style?.fontSize || 16));
                        Text.fontFamily(this.style?.fontFamily || 'HarmonyOS Sans');
                        Text.fontStyle(getFontStyle(this.style?.fontStyle || 'normal'));
                        Text.fontWeight(getFontWeight(this.style?.fontWeight || 'normal'));
                        Text.align(getTextVerticalAlign(this.style?.textVerticalAlign || 'center'));
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

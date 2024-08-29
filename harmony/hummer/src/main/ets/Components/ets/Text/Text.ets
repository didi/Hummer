import { AttributesType, MutationType, HMNode } from '../../Node';
import { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from '../../../AttributeModifiers/CommonStyleModifier';
import { ComponentBuilderContext } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from '../EventHandler';
import { TapEventName, TouchEventName } from '../../Event';
import { IHummerTextStyle, IRichTextAttributes } from './IProps';


import { getCopyOptions,
  getFontStyle,
  getFontWeight,
  getImageSpanAlignment,
  getTextAlign, getTextDecoration, getTextOverflow,
  getTextVerticalAlign,
} from '../../../AttributeModifiers/Utils';
import { convertColorToARGB, getVP, getVPNoPercent } from '../../../Utils/Utils';
import { parseImageSrc } from '../Image/utils';
import { TextPropsWrapper } from './TextPropsWrapper';


@Component
export default struct HMText {
  builderContext!: ComponentBuilderContext
  private hmContext!: HMContext;
  private node!: HMNode;

  @State props : TextPropsWrapper | undefined = undefined
  @State text: string | undefined = undefined;
  @State richText: IRichTextAttributes | (IRichTextAttributes | string)[] | undefined = undefined;
  controller: TextController = new TextController();
  options: TextOptions = { controller: this.controller };

  // webviewController: web_webview.WebviewController = new web_webview.WebviewController();

  aboutToAppear(): void {
    this.hmContext = this.builderContext.hmContext;
    this.node = this.builderContext.node;
    this.props = new TextPropsWrapper(this.node);

    this.props.bindPropsUpdate(()=>{
      this.updateContent()
    })
    this.updateContent()
  }

  updateContent(){
    this.richText = this.props?.richText || undefined;
    if (this.props?.richText && !Array.isArray(this.props?.richText)) {
      this.richText = [this.props?.richText]
    }
    this.text = this.props?.text
  }

  aboutToDisappear(): void {
    this.props?.dispose();
  }

  getImageResource(uri: string) {
    if (uri && uri.startsWith("data:")) {
      return uri
    }

    return parseImageSrc(uri, this.hmContext.baseUrl);
    //todo: 开发图片库
  }

  getLineHeight(lineSpacingMulti: number = 1, fontSize: string | number = 16) {
    return getVPNoPercent(fontSize, 16) * lineSpacingMulti
  }


  build() {
    if (this.richText) {
        Text(undefined, this.options){
          ForEach(this.richText as IRichTextAttributes[], (richTextNode:IRichTextAttributes)=>{
            if (typeof richTextNode === 'string') {
              // 来自于Text本身的样式属性也要尝试作用到子节点上
              Span(richTextNode)
                .fontColor(this.props?.color)
                .textBackgroundStyle({color: this.props?.backgroundColor})
                .fontFamily(this.props?.fontFamily)
                .fontStyle(getFontStyle(this.props?.fontStyle))
                .fontWeight(getFontWeight(this.props?.fontWeight))
                .fontSize(this.props?.fontSize)
                .lineHeight(this.getLineHeight(this.props?.lineSpacingMulti, this.props?.fontSize) || undefined)
                .decoration({
                  type: getTextDecoration(this.props?.textDecoration),
                  color: this.props?.color
                })
            } else {
              if (richTextNode.image) {
                ImageSpan(this.getImageResource(richTextNode?.image))
                  .verticalAlign(getImageSpanAlignment(richTextNode?.imageAlign || 'baseline'))
                  .width(getVP(richTextNode?.imageWidth as string))
                  .height(getVP(richTextNode?.imageHeight as string))
              } else {
                // 来自于Text本身的样式属性也要尝试作用到子节点上 优先使用节点自身样式
                Span(richTextNode.text)
                  .fontColor(richTextNode?.color || this.props?.color)
                  .textBackgroundStyle({color:(convertColorToARGB(richTextNode?.backgroundColor) || this.props?.backgroundColor)})
                  .fontFamily(richTextNode?.fontFamily || this.props?.fontFamily)
                  .fontStyle(getFontStyle(richTextNode?.fontStyle || this.props?.fontStyle))
                  .fontWeight(getFontWeight(richTextNode?.fontWeight || this.props?.fontWeight))
                  .fontSize((getVP(richTextNode?.fontSize)||this.props?.fontSize))
                  // .lineHeight(this.getLineHeight(this.style?.lineSpacingMulti || 1,richTextNode?.fontSize || this.style?.fontSize) || undefined)
                  .decoration({
                    type: getTextDecoration(richTextNode?.textDecoration || this.props?.textDecoration),
                    color: convertColorToARGB(richTextNode?.color) || this.props?.color
                  })
                  .onClick(() => {
                    console.warn('暂不支持链接跳转')
                    // this.webviewController.loadUrl(richTextNode?.href)
                  })
                // TODO: 处理href 同时确认业务当前有没有用 必要时使用点击事件执行跳转逻辑替代
              }
            }
          })
        }
        .attributeModifier(commonStyleModifier.setNode(this.node))
    } else {
      Text(this.text, this.options)
        .attributeModifier(commonStyleModifier.setNode(this.node))
        .textAlign(getTextAlign(this.props?.textAlign))
        .textOverflow({overflow: getTextOverflow(this.props?.textOverflow)})
        .maxLines(this.props?.textLineClamp)
        // TODO: 对齐单位 lineHeight
        .lineHeight(this.getLineHeight(this.props?.lineSpacingMulti, this.props?.fontSize) || undefined)
        .decoration({
          type: getTextDecoration(this.props?.textDecoration),
          color: this.props?.color
        })
          // TODO: 对齐单位 letterSpacing
          // .letterSpacing
        .copyOption(getCopyOptions(this.props?.textCopyEnable))
        .fontColor(this.props?.color)
        .fontSize(this.props?.fontSize)
        .fontFamily(this.props?.fontFamily)
        .fontStyle(getFontStyle(this.props?.fontStyle))
        .fontWeight(getFontWeight(this.props?.fontWeight))
        .align(getTextVerticalAlign(this.props?.textVerticalAlign))
    }
  }
}
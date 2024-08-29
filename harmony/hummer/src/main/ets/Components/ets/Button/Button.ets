import { AttributesType, MutationType, HMNode } from '../../Node';
import { HMContext } from '../../../Context/HMContext';
import { CommonStyleModifier } from '../../../AttributeModifiers/CommonStyleModifier';
import { ComponentBuilderContext } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from '../EventHandler';
import { TapEventName, TouchEventName } from '../../Event';
import { ButtonPropsWrapper } from './ButtonPropsWrapper';



class ButtonStyleModfier extends CommonStyleModifier {
  // 暂只实现按压和禁用状态下的 字体颜色&背景色 设置
  applyPressedAttribute(instance: ButtonAttribute) {
    if (this.node?.attributes?.pressedStyle?.backgroundColor) {
      instance.backgroundColor(this.node.attributes.pressedStyle.backgroundColor)
    }

    if (this.node?.attributes?.pressedStyle?.color) {
      instance.fontColor(this.node.attributes.pressedStyle.color)
    }
  }

  applyDisabledAttribute(instance: ButtonAttribute) {
      if (this.node?.attributes?.disabledStyle?.backgroundColor) {
        instance.backgroundColor(this.node.attributes.disabledStyle.backgroundColor)
      }

      if (this.node?.attributes?.disabledStyle?.color) {
        instance.fontColor(this.node.attributes.disabledStyle.color)
      }
  }
}

const buttonStyleModfier = new ButtonStyleModfier()

function getTextAlign(textAlign?:string) : number | undefined {
  if(textAlign == 'left'){
    return Alignment.Start
  }else if(textAlign == 'center'){
    return Alignment.Center
  }else if(textAlign == 'right'){
    return Alignment.End
  }
  return undefined
}

@Component
export default struct HMButton {
  builderContext!: ComponentBuilderContext
  private hmContext!: HMContext;
  private node!: HMNode;

  @State private props:ButtonPropsWrapper | undefined = undefined;
  aboutToAppear(): void {

    this.hmContext = this.builderContext.hmContext;
    this.node = this.builderContext.node;

    this.props = new ButtonPropsWrapper(this.node);
    this.props.bindPropsUpdate()
  }

  aboutToDisappear(): void {
    this.props?.dispose();
  }


  build() {
    Button(this.props?.text, {
      stateEffect: true,
      type: ButtonType.Normal,
      controlSize: ControlSize.NORMAL
    })
      .padding(0)
      .fontColor(this.props?.color)
      .fontSize(this.props?.fontSize)
      .fontFamily(this.props?.fontFamily)
      .attributeModifier(buttonStyleModfier.setNode(this.node))
      .enabled(this.props?.enable)
      .align(getTextAlign(this.props?.textAlign))
  }
}
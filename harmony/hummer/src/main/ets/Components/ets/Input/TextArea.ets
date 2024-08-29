import { HMNode } from '../../Node';
import { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from '../../../AttributeModifiers/CommonStyleModifier';
import { ComponentBuilderContext } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from '../EventHandler';
import { TouchEventName, TapEventName } from '../../Event';
import { getTextAlign } from '../../../AttributeModifiers/Utils';
import { InputPropsWrapper } from './InputPropsWrapper';
import { dispatchInputEvent, InputEventName, InputEventState } from './Event';
import { isUndefined } from '../../../Utils/is';

// type映射
const TYPE = {
  "default": InputType.Normal,
  "password": InputType.Password,
  "email": InputType.Email,
  "number": InputType.Number,
  "tel":InputType.PhoneNumber,
  "username": InputType.USER_NAME,
  "new_password": InputType.NEW_PASSWORD,
  "number_password": InputType.NUMBER_PASSWORD,
  "number_decimal": InputType.NUMBER_DECIMAL,
} as Record<string,number>

// enterKeyType映射
const ENTERKEYTYPE = {
  "go": EnterKeyType.Go,
  "done": EnterKeyType.Done,
  "next": EnterKeyType.Next,
  "search":EnterKeyType.Search,
  "send": EnterKeyType.Send
} as Record<string,number>



@Component
export default struct HMTextArea {
  builderContext!: ComponentBuilderContext
  private hmContext!: HMContext;
  private node!: HMNode;

  @State private props:InputPropsWrapper | undefined = undefined;

  private text: string = ''; // 输入框绑定的值
  private focused: boolean = false;

  controller: TextAreaController = new TextAreaController()

  aboutToAppear(): void {
    this.hmContext = this.builderContext.hmContext;
    this.node = this.builderContext.node;

    this.props = new InputPropsWrapper(this.node);
    this.text = this.props?.text

    this.focused = this.props?.focused

    this.props.bindPropsUpdate(()=>{
      this.updateFocus()
    })
  }

  updateFocus(){
    if(isUndefined(this.props?.attrFocused)){
      return
    }
    if(this.props?.focused){
      focusControl.requestFocus(this.node.uniqueId);
    }else{
      this.controller.stopEditing();
    }
    this.focused = this.props!.focused;
  }

  aboutToDisappear(): void {
    this.props?.dispose()
  }

  build() {
    TextArea({ text: this.text, placeholder: this.props?.placeholder, controller: this.controller })
      .padding(0)
      .borderRadius(0)
      .type(TYPE[this.props!.keyboardType])
      .maxLength(this.props?.maxLength)
      .enterKeyType(ENTERKEYTYPE[this.props!.returnKeyType])
      .textAlign(getTextAlign(this.props?.textAlign))
      .placeholderColor(this.props?.placeholderColor)
      .caretColor(this.props?.cursorColor)
      .fontSize(this.props?.fontSize)
      .fontColor(this.props?.color)
      .fontFamily(this.props?.fontFamily)
      .defaultFocus(this.focused)
      .maxLines(this.props?.textLineClamp) // todo 待鸿蒙提供新属性
      .attributeModifier(commonStyleModifier.setNode(this.node))
      .onChange(shouldBindEvent(this.node, [InputEventName], (e: string) =>{
        this.text = e
        if(this.node?.eventListeners.has(InputEventName)){
          dispatchInputEvent(this.node, InputEventState.changed, e);
        }
      }))
      .onSubmit(shouldBindEvent(this.node, InputEventName, (enterKey: EnterKeyType, event: SubmitEvent) => dispatchInputEvent(this.node, InputEventState.confirmed, event?.text)))
      .onFocus(shouldBindEvent(this.node, InputEventName, () => {
        this.focused = true;
        dispatchInputEvent(this.node, InputEventState.began, this.text);
      }))
      .onBlur(shouldBindEvent(this.node, InputEventName, () => {
        this.focused = false;
        dispatchInputEvent(this.node, InputEventState.ended, this.text);
      }))
    }
}

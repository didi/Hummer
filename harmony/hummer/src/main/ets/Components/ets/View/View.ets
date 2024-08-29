import { FlexManager, useRelativeContainer } from '../../../AttributeModifiers/Utils';
import { HMNode } from '../../Node';
import { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from '../../../AttributeModifiers/CommonStyleModifier';
import { ComponentBuilderContext, componentFactoryBuilder, ComponentWrappedBuilder } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from '../EventHandler';
import { TapEventName, TouchEventName } from '../../Event';
import { ViewPropsWrapper } from './ViewPropsWrapper';
import commonGestureModifier from '../../../AttributeModifiers/GestureModifier';

@Component
export default struct View {

  builderContext!:ComponentBuilderContext
  private hmContext!:HMContext;
  private node!:HMNode;
  @State private props:ViewPropsWrapper | undefined = undefined;
  @State private children: HMNode[] = []
  aboutToAppear(): void {

    this.hmContext = this.builderContext.hmContext;
    this.node = this.builderContext.node;

    this.props = new ViewPropsWrapper(this.node);
    this.children = this.props.child;
    this.props.bindPropsUpdate()
    this.props.onChildUpdate((child:HMNode[])=>{
      this.children = child;
    })
  }


// hdc
  aboutToDisappear(): void {
    this.props?.dispose();
  }

  build() {

    if(this.hmContext.useYoga){

      Stack(){

      }
      .attributeModifier(commonStyleModifier.setNode(this.props!.node))
      .onClick(shouldBindEvent(this.props!.node, TapEventName, (e: ClickEvent) => dispatchTapEvent(this.props!.node, e)))
      .onTouch(shouldBindEvent(this.props!.node, TapEventName, (e: TouchEvent) => dispatchTouchEvent(this.props!.node, e)))
    }else{
      //当父容器为RelativeContainer, 且子组件设置了alignRules属性, 则子组件的position属性不生效。
      if(useRelativeContainer(this.props?.style)){
        RelativeContainer(){
          this.buildContent()
        }
        .hitTestBehavior(HitTestMode.None)
        .width('100%')
        .height('100%')
        .position({x:0, y:0})
      }else{
        this.buildContent()
      }
    }
  }

  @Builder
  buildContent(){
    if(this.hmContext.flexOptimize && FlexManager.canConvertToRow(this.props?.style)){
      this.buildRow();
    } else if(this.hmContext.flexOptimize && FlexManager.canConvertToColumn(this.props?.style)){
      this.buildColumn();
    } else{
      this.buildFlex();
    }
  }

  @Builder
  buildColumn(){
    Column(){
      this.buildChildren()
    }
    .gestureModifier(commonGestureModifier.setNode(this.node))
    .attributeModifier(commonStyleModifier.setNode(this.node, this.props?.style))
    .alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.props?.flexDirection, this.props?.alignItems) as HorizontalAlign)
    .justifyContent(FlexManager.flexOptions(this.props?.style).justifyContent)    .onAppear(()=>this.props?.node.onMounted())
  }

  @Builder
  buildRow(){
    Row(){
      this.buildChildren()
    }
    .alignItems(FlexManager.convertFlexAlignItemsToColumnOrRow(this.props?.flexDirection, this.props?.alignItems) as VerticalAlign)
    .justifyContent(FlexManager.flexOptions(this.props?.style).justifyContent)
    .gestureModifier(commonGestureModifier.setNode(this.node))
    .attributeModifier(commonStyleModifier.setNode(this.node, this.props?.style))
    .onAppear(()=>this.props?.node.onMounted())
  }

  @Builder
  buildFlex(){
    Flex(FlexManager.flexOptions(this.props?.style)){
      this.buildChildren()
    }
    .gestureModifier(commonGestureModifier.setNode(this.node))
    .attributeModifier(commonStyleModifier.setNode(this.node, this.props?.style))
    .onAppear(()=>this.props?.node.onMounted())
  }

  @Builder
  buildChildren(){
    ForEach(this.children, (node:HMNode)=>{
      componentFactoryBuilder({
        hmContext : this.hmContext,
        tag : node.name,
        node : node,
        customComponentBuilder : this.builderContext.customComponentBuilder
      })
    }, (node:HMNode)=>node.id.toString())
  }
}

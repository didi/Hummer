import { HMComponent } from '../Component';
import { ComponentContent, promptAction } from '@kit.ArkUI';
import { HMNode } from '../Node';
import { fn } from '../../Utils/Utils';
import { AlertDialogData, ConfirmDialogData, LoadingDialogData } from './DialogType';
import { HMEntranceController } from '../../HMEntrance';
import { HUMMER_NO_UICONTEXT_ERROR } from '../../Utils/Error';
import { ComponentBuilderContext, componentFactoryBuilder } from '../ets';
import { isUndefined } from '../../Utils/is';


export enum HMDialogType {
  Alert,
  Confirm,
  Loading,
  Custom
}

@Builder
function loadingBuilder(data?:LoadingDialogData){
  Row() {
    Progress({ value: 0, total: 100, type: ProgressType.Ring })
      .width(30).color(Color.White)
      .style({ strokeWidth: 5, status: ProgressStatus.LOADING })
    if(data && data.msg && data.msg.length>0){
      Text(data.msg)
        .fontColor(Color.White)
        .margin({left:5})
    }
  }.backgroundColor('#A0000000')
  .padding(10)
  .alignItems(VerticalAlign.Center)
  .borderRadius(5)
}

@Builder
function alertBuilder(data:AlertDialogData){
  Column() {
    Text(data.msg)
      .fontColor(Color.Black)
      .constraintSize({minHeight:40})
      .width('100%')
      .textAlign(TextAlign.Center)
    Text(data.btnText)
      .fontColor(Color.Black)
      .fontWeight(500)
      .width('100%')
      .textAlign(TextAlign.Center)
      .constraintSize({minHeight:40})
      .onClick(()=>{
        data.callback?.()
      })
  }.backgroundColor('#FFFFFFFF')
  .padding(10)
  .alignItems(HorizontalAlign.Center)
  .borderRadius(20)
  .width('80%')
  .constraintSize({minHeight:100})
}


@Builder
function confirmBuilder(data:ConfirmDialogData){
  Column() {
    Text(data?.title)
      .fontColor(Color.Black)
      .height(40)
      .fontSize(17)
      .fontWeight(500)
      .width('100%')
      .textAlign(TextAlign.Start)
    Text(data?.msg)
      .fontColor(Color.Black)
      .constraintSize({minHeight:40})
      .width('100%')
      .textAlign(TextAlign.Start)
    Row(){
      Text(data?.cancelBtnText)
        .fontColor(Color.Black)
        .fontWeight(500)
        .width('49%')
        .textAlign(TextAlign.Center)
        .height(40)
        .onClick(()=>{
          data?.cancelCallback?.()
        })
      Text('')
        .backgroundColor('#30000000')
        .width(0.5)
        .height(20)
      Text(data?.okBtnText)
        .fontColor(Color.Black)
        .fontWeight(500)
        .width('49%')
        .textAlign(TextAlign.Center)
        .height(40)
        .onClick(()=>{
          data?.okCallback?.()
        })
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)

  }.backgroundColor('#FFFFFFFF')
  .padding({top:10, bottom:10, left:20, right:20})
  .alignItems(HorizontalAlign.Center)
  .borderRadius(20)
  .width('80%')
  .constraintSize({minHeight:100})
}


export class HMDialog extends HMComponent {

  private contentNode? : ESObject;
  private cancelable:boolean = true;
  /**
   * 显示提示对话框（用户需要点击【确定】按钮才能继续进行操作）
   *
   * @param msg 内容
   * @param btnText 按钮内容
   * @param callback 按钮点击回调
   */
  private alert(msg: string, btnText: string, callback: () => void) {

    const data:AlertDialogData = {
      msg:msg,
      btnText:btnText,
      callback:callback
    }
    this.contentNode = this.show(wrapBuilder(alertBuilder), data)
  }

  /**
   * 显示确认对话框（用户需要点击【确定】或【取消】按钮才能继续进行操作）
   *
   * @param title 标题
   * @param msg 内容
   * @param okBtnText [确认]按钮内容
   * @param cancelBtnText [取消]按钮内容
   * @param okCallback [确认]按钮点击回调
   * @param cancelCallback [取消]按钮点击回调
   */
  private confirm(title: string, msg: string, okBtnText: string, cancelBtnText: string, okCallback: () => void, cancelCallback: () => void) {

    const data:ConfirmDialogData = {
      title:msg,
      msg:msg,
      okBtnText:okBtnText,
      cancelBtnText:cancelBtnText,
      okCallback:okCallback,
      cancelCallback:cancelCallback
    }
    this.contentNode = this.show(wrapBuilder(confirmBuilder), data)
  }

  /**
   * 显示等待对话框（只能通过调用dismiss方法关闭对话框）
   *
   * @param msg 内容
   */
  private loading(msg: string) {
    const data:LoadingDialogData = {msg:msg}
    this.contentNode = this.show(wrapBuilder(loadingBuilder), data)
  }

  /**
   * 显示自定义对话框
   *
   * @param view 自定义View
   */
  private custom(view: HMNode) {
    const entranceController = HMEntranceController.getController(this.context);
    if(!entranceController){
      this.context.handleError('弹框失败：'+ HUMMER_NO_UICONTEXT_ERROR)
      return;
    }
    const builderContext:ComponentBuilderContext = {
      hmContext: this.context,
      tag: view.name,
      node:view,
      customComponentBuilder : entranceController.customComponentBuilder
    }
    this.contentNode = this.show(wrapBuilder(componentFactoryBuilder), builderContext)
  }

  private show<T extends Object>(builder: WrappedBuilder<[T]>, args: T){

    const entranceController = HMEntranceController.getController(this.context);
    const uiContext = entranceController?.uiContext;
    if(!uiContext){
      this.context.handleError(HUMMER_NO_UICONTEXT_ERROR);
      return;
    }
    const promptAction = uiContext.getPromptAction();
    const contentNode = new ComponentContent(uiContext, builder, args);
    try {
      promptAction.openCustomDialog(contentNode, {alignment:DialogAlignment.Center, autoCancel:this.cancelable});
    } catch (e) {
      this.context.handleError('弹框失败：'+e.toString())
    };
    return contentNode;
  }

  /**
   * 关闭对话框
   */
  private dismiss() {

    if(isUndefined(this.contentNode)){return}
    const entranceController = HMEntranceController.getController(this.context);
    const uiContext = entranceController?.uiContext;
    if(!uiContext){
      this.context.handleError(HUMMER_NO_UICONTEXT_ERROR);
      return;
    }
    const promptAction = uiContext.getPromptAction();
    promptAction.closeCustomDialog(this.contentNode);
  }

}
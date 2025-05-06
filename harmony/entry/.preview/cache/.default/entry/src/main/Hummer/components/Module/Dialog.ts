import { Component } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Component";
import promptAction from "@ohos:promptAction";
import type { Node } from '../Node';
import type { AlertDialogData, ConfirmDialogData, LoadingDialogData } from './DialogType';
export enum HMDialogType {
    Alert = 0,
    Confirm = 1,
    Loading = 2,
    Custom = 3
}
export class HMDialog extends Component {
    public alertData?: AlertDialogData;
    public confirmData?: ConfirmDialogData;
    public loadingData?: LoadingDialogData;
    public type: HMDialogType = HMDialogType.Alert;
    private dialogId: number = -1;
    public node?: Node;
    /**
     * 显示提示对话框（用户需要点击【确定】按钮才能继续进行操作）
     *
     * @param msg 内容
     * @param btnText 按钮内容
     * @param callback 按钮点击回调
     */
    alert(msg: string, btnText: string, callback: () => void) {
        this.alertData = {
            msg: msg,
            btnText: btnText,
            callback: callback
        };
        this.type = HMDialogType.Alert;
        this.open();
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
    confirm(title: string, msg: string, okBtnText: string, cancelBtnText: string, okCallback: () => void, cancelCallback: () => void) {
        this.confirmData = {
            title: title,
            msg: msg,
            okBtnText: okBtnText,
            cancelBtnText: cancelBtnText,
            okCallback: okCallback,
            cancelCallback: cancelCallback
        };
        this.type = HMDialogType.Confirm;
        this.open();
    }
    /**
     * 显示等待对话框（只能通过调用dismiss方法关闭对话框）
     *
     * @param msg 内容
     */
    loading(msg: string) {
        this.loadingData = {
            msg: msg,
        };
        this.type = HMDialogType.Loading;
        this.open();
    }
    private open() {
        // CustomUIComponentBuilderMap.getBuilderByContext(this.context);
        let msg = "Alert";
        switch (this.type) {
            case HMDialogType.Alert:
                msg = 'Alert';
                break;
            case HMDialogType.Confirm:
                msg = 'Confirm';
                break;
            case HMDialogType.Loading:
                msg = 'Loading';
                break;
            case HMDialogType.Custom:
                msg = 'Custom';
                break;
            default:
                break;
        }
        promptAction.showDialog({
            title: '受鸿蒙能力限制，预计6月初可用',
            message: msg
        });
        //todo: 确认是否依赖struct，考虑是否把模块作为ets
        // promptAction.openCustomDialog({
        //   builder:dialogBuilder
        // }).then((id)=>{
        //   this.dialogId = id;
        // })
    }
    /**
     * 显示自定义对话框
     *
     * @param view 自定义View
     */
    custom(view: Node) {
        this.node = view;
        this.type = HMDialogType.Loading;
        this.open();
    }
    /**
     * 关闭对话框
     */
    dismiss() {
        if (this.dialogId < 0) {
            return;
        }
        promptAction.closeCustomDialog(this.dialogId);
    }
}

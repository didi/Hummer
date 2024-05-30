import { HummerComponent } from "../../HummerComponent"
import { View } from "../../components/View";

const HUMMER = __Hummer__;
export class Dialog extends HummerComponent {

    protected _cancelable: boolean = true;
    protected _lowLayer: boolean = false;

    public constructor(props: any = {}) {
        super("Dialog", props);
    }

    protected static newInstance(): Dialog {
        return new Dialog();
    }

    protected static checkInstance() {
        if (!HUMMER.__dialog__) {
            HUMMER.__dialog__ = Dialog.newInstance();
        }
    }

    static get instance(): Dialog {
        return HUMMER.__dialog__
    }


    // 	是否可以被取消（按返回键或者点击空白区域是否可以关闭对话框）
    set cancelable(value: boolean) {
        this._cancelable = value;
        this.call("setCancelable", value);
    }

    // 	对话框显示层级是否是低层级（比系统对话框层级低）
    set lowLayer(value: boolean) {
        this._lowLayer = value;
        this.call("setLowLayer", value);
    }



    /**
     * 显示提示对话框（用户需要点击【确定】按钮才能继续进行操作）
     *
     * @param msg 内容
     * @param btnText 按钮内容
     * @param callback 按钮点击回调
     */
    static alert(msg: string, btnText: string, callback: () => void) {
        Dialog.checkInstance();
        Dialog.instance.alert(msg, btnText, callback);
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
    static confirm(title: string, msg: string, okBtnText: string, cancelBtnText: string, okCallback: () => void, cancelCallback: () => void) {
        Dialog.checkInstance();
        Dialog.instance.confirm(title, msg, okBtnText, cancelBtnText, okCallback, cancelCallback);
    }


    /**
     * 显示等待对话框（只能通过调用dismiss方法关闭对话框）
     *
     * @param msg 内容
     */
    static loading(msg: string) {
        Dialog.checkInstance();
        Dialog.instance.loading(msg);
    }

    /**
     * 显示自定义对话框
     *
     * @param view 自定义View
     */
    static custom(view: View) {
        Dialog.checkInstance();
        Dialog.instance.custom(view);
    }


    /**
     * 关闭对话框
     */
    static dismiss() {
        Dialog.checkInstance();
        Dialog.instance.dismiss();
    }


    public alert(msg: string, btnText: string, callback: () => void) {
        this.call("alert", msg, btnText, callback);
    }




    public confirm(title: string, msg: string, okBtnText: string, cancelBtnText: string, okCallback: () => void, cancelCallback: () => void) {
        this.call("confirm", title, msg, okBtnText, cancelBtnText, okCallback, cancelCallback);
    }


    public loading(msg: string) {
        this.call("loading", msg);
    }



    public custom(view: View) {
        this.call("custom", view.getOriginObject());
    }


    public dismiss() {
        this.call("dismiss");
    }

}
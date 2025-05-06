import { HummerComponent } from "../../HummerComponent";
import { View } from "../../components/View";
export declare class Dialog extends HummerComponent {
    protected _cancelable: boolean;
    protected _lowLayer: boolean;
    constructor(props?: any);
    protected static newInstance(): Dialog;
    protected static checkInstance(): void;
    static get instance(): Dialog;
    set cancelable(value: boolean);
    set lowLayer(value: boolean);
    static alert(msg: string, btnText: string, callback: () => void): void;
    static confirm(title: string, msg: string, okBtnText: string, cancelBtnText: string, okCallback: () => void, cancelCallback: () => void): void;
    static loading(msg: string): void;
    static custom(view: View): void;
    static dismiss(): void;
    alert(msg: string, btnText: string, callback: () => void): void;
    confirm(title: string, msg: string, okBtnText: string, cancelBtnText: string, okCallback: () => void, cancelCallback: () => void): void;
    loading(msg: string): void;
    custom(view: View): void;
    dismiss(): void;
}

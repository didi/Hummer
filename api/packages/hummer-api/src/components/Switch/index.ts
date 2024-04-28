import { HummerElement } from "../../HummerElement"
import { FlexStyle } from "../../Element"

interface SwitchStyle extends FlexStyle {
    onColor?: string,
    offColor?: string,
    thumbColor?: string
}

export class Switch extends HummerElement {


    /**
     * 构造方法
     * 
     * @param id 
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Switch", name, { ...props, viewId: id });
    }


    //扩展样式属性：有代理时通过代理处理
    public set style(value: SwitchStyle | Record<string, any>) {
        this.setStyle(value, false);
    }

    /**
     * 扩展属性
     * 默认值:false
     */
    set checked(value: boolean) {
        this._setAttribute("checked", value);
    }


    get checked(): boolean {
        return this._getAttribute('checked');
    }

}
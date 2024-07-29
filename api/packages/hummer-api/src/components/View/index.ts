import { LifeCycleElement } from "../../LifeCycleElement"
import { FlexStyle } from "../../Element"


/**
 * 除支持 通用布局样式 和 通用视图样式 以外，还支持以下样式
 */
export interface ViewStyle extends FlexStyle {

    /**
     * 子控件超出父容器部分是否显示
     * 默认:'visible'	
     * 
     * overflow: 'hidden' | 'visible'
     */
    overflow?: string
}


export class View extends LifeCycleElement {


    /**
     * 构造方法
     * 
     * @param id 
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("View", name, { ...props, viewId: id });
        //设置默认属性值
        this._initAttributes({
            overflow: 'visible'
        });
    }


    //扩展样式属性：有代理时通过代理处理
    public set style(value: ViewStyle | Record<string, any>) {
        this.setStyle(value, false);
    }

    //扩展样式属性
    public get style() {
        return this.getStyle() || {};
    }


    /**
     * 扩展属性:子控件超出父容器部分是否显示
     * 默认:'visible'
     * 
     * 可选:overflow: 'hidden' | 'visible'
     */
    set overflow(value: string) {
        this._setAttribute("overflow", value);
    }


    get overflow(): string {
        return this._getAttribute('overflow');
    }

}
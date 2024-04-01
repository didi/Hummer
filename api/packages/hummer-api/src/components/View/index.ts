import { LifeCycleElement } from "../../LifeCycleElement"
import { FlexStyle } from "../../Element"

interface ViewStyle extends FlexStyle {
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

    /**
     * 扩展属性
     * 可选值:overflow: 'hidden' | 'visible'
     * 默认值:'visible'
     */
    set overflow(value: string) {
        this._setAttribute("overflow", value);
    }


    get overflow(): string {
        return this._getAttribute('overflow');
    }

}
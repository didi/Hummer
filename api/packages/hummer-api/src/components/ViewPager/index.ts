import { HummerElement } from "../../HummerElement"
import { Element } from "../../Element"
import { FlexStyle } from "../../Element"



export interface ViewPagerStyle extends FlexStyle {
    /**
     * 整个ViewPager的圆角半径
     * 默认值：0
     */
    borderRadius?: number|string;
    /**
     * 两个page之间的距离
     * 默认值：0
     */
    itemSpacing?: number|string;
    /**
     * 正中间的page离手机边缘的距离
     * 默认值：0
     */
    edgeSpacing?: number|string;
    /**
     * 是否可以无限循环	
     * 默认值：false
     */
    canLoop?: boolean;
    /**
     * 是否自动播放
     * 默认值：false
     */
    autoPlay?: boolean;

    /**
     * 自动轮播的时间间隔，单位ms（0时autoPlay失效）
     * 默认值：0
     */
    loopInterval?: number;
    /**
     * 当前元素前后两个的缩放比例
     * 默认值：0.85
     */
    scaleFactor?: number;
    /**
     * 	当前元素前后两个的透明度
     *  默认值：0.5	
     */
    alphaFactor?: number; 
}

/**
 * ViewPager 组件
 * //TODO 目前使用API仅支持鸿蒙，多线程版本中不适用（不能同步返回组件） 
 */
export class ViewPager extends HummerElement {

    /**
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Input", name, { ...props, viewId: id });
    }

    //扩展样式属性：有代理时通过代理处理
    public set style(value: ViewPagerStyle | Record<string, any>) {
        this.setStyle(value, false);
    }

    /**
     * 默认输入内容
     */
    get data() {
        return this._getAttribute("data")
    }

    set data(value: string) {
        this._setAttribute("data", value);
    }

    /**
     * 设置当前显示的页面
     *
     * @param position 当前显示页面的位置
     */
    public setCurrentItem(position: number) {
        this.call("setCurrentItem", position);
    }

    /**
     * 设置ViewPager翻页时的回调
     *
     * @param callback 回调。参数：current:当前位置； total:item总个数
     */
    public onPageChange(callback: (current: number, total: number) => void) {
        this.call("onPageChange", callback);
    }
    /**
     * 设置ViewPager页面被点击的回调
     *
     * @param callback 回调。参数：参数position:页面的位置
     */
    public onItemClick(callback: (position: number) => void) {
        this.call("onItemClick", callback);
    }
    /**
     * 设置ViewPager页面自定义View创建和更新的回调
     *
     * @param callback 回调。参数position:当前位置；view:当前控件，当view为null时说明要创建view。最后返回view。
     */
    public onItemView(callback: (position: number, view: Element) => Element) {
        this.call("onItemView", (position: number, view: any) => {
            let thisElement = view?.__element__;
            let element: Element = callback(position, thisElement);
            return element.getThis();
        });
    }
}


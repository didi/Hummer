import { Node } from "../Node"
import { BasicAnimation } from "../anim/BasicAnimation"
import { KeyframeAnimation } from "../anim/KeyframeAnimation"

const AnimationStartName = "__onAnimationStart__"
const AnimationEndName = "__onAnimationEnd__"

/**
 * 基础样式类型
 */
export interface FlexStyle {

    //***************************************************************************
    // * 
    // * 通用布局样式：Flexbox 样式
    // *
    //***************************************************************************

    /**
     *
     * 布局方式，分相对布局和绝对布局，相对布局即flex布局
     * 默认: 'relative'	
     * 可选: position: 'relative' | 'absolute' | 'fixed'
     */
    position?: string,

    /** 
     * 主轴方向
     * flexDirection:'column' | 'row'
     * 默认:'column'
     */
    flexDirection?: string,

    /**
     * 子控件是否折行排列
     * 默认: 'nowrap'
     * 可选: flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse'
     */
    flexWrap?: string,

    /**
     * 主轴方向上的子控件排列方式
     * 
     * 默认: 'flex-start'
     * 可选: justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
     */
    justifyContent?: string,

    /**
     * 	
     * 交叉轴方向上的子控件的对齐方式
     * 默认: 'stretch'
     * 可选: alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
     */
    alignItems?: string,

    /**
     * flex-start'	
     * 多主轴情况下，交叉轴方向上的子控件的排列方式	
     * 默认: ‘flex-start’
     * 默认: alignContent: flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'
     */
    alignContent?: string,

    /**
     * 0	
     * 子控件占有父容器剩余空间的权重	
     * 默认: 0
     * 可选: flexGrow: 1
     * 
     */
    flexGrow?: number,

    /**
     * 父容器空间不足时，子控件的收缩权重	flexShrink: 1
     * 默认:0
     */
    flexShrink?: number,

    /**
     * 子控件在进行拉伸和收缩计算前的基础尺寸
     * 默认: 'auto'	
     * 可选: flexBasis: 500 | 'auto'
     */
    flexBasis?: number | string,

    /**
     * 
     * 子控件在交叉轴上的对齐方式	
     * 默认: 'auto'	
     * 可选: alignSelf: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
     */
    alignSelf?: string,


    //***************************************************************************
    // * 
    // * 通用布局样式：盒模型样式
    // *
    //***************************************************************************


    width?: number | string,
    height?: number | string,
    minWidth?: number | string,
    minHeight?: number | string,
    maxWidth?: number | string,
    maxHeight?: number | string,

    margin?: number | string,
    marginAll?: number | string,
    marginLeft?: number | string,
    marginTop?: number | string,
    marginRight?: number | string,
    marginBottom?: number | string,

    padding?: number | string,
    paddingAll?: number | string,
    paddingLeft?: number | string,
    paddingTop?: number | string,
    paddingRight?: number | string,
    paddingBottom?: number | string,

    left?: number | string,
    top?: number | string,
    right?: number | string,
    bottom?: number | string,
    display?: number | string,

    // width	number|string	'auto'	宽度	width: 10 | '10px'
    // height	number|string	'auto'	高度	height: 10 | '10px'
    // minWidth	number|string	0	最小宽度	minWidth: 10 | '10px'
    // minHeight	number|string	0	最小高度	minHeight: 10 | '10px'
    // maxWidth	number|string		最大宽度	maxWidth: 10 | '10px'
    // maxHeight	number|string		最大高度	maxHeight: 10 | '10px'
    // margin/marginAll	number|string	0	所有四个边的外边距	margin: 10 | '10px'
    // marginLeft	number|string	0	左外边距	marginLeft: 10 | '10px'
    // marginTop	number|string	0	上外边距	marginTop: 10 | '10px'
    // marginRight	number|string	0	右外边距	marginRight: 10 | '10px'
    // marginBottom	number|string	0	下外边距	marginBottom: 10 | '10px'
    // padding/paddingAll	number|string	0	所有四个边的内边距	padding: 10 | '10px'
    // paddingLeft	number|string	0	左内边距	paddingLeft: 10 | '10px'
    // paddingTop	number|string	0	上内边距	paddingTop: 10 | '10px'
    // paddingRight	number|string	0	右内边距	paddingRight: 10 | '10px'
    // paddingBottom	number|string	0	下内边距	paddingBottom: 10 | '10px'
    // left	number|string	0	距离左边的偏移量	left: 10 | '10px'
    // top	number|string	0	距离上方的偏移量	top: 10 | '10px'
    // right	number|string	0	距离右边的偏移量	right: 10 | '10px'
    // bottom	number|string	0	距离下方的偏移量	bottom: 10 | '10px'
    // display	string	'flex'	控件是否显示（'none'为不显示，且不参与布局）	display: 'none' | 'flex'


    //***************************************************************************
    // * 
    // * 通用视图样式
    // *
    //***************************************************************************


    backgroundColor?: string,
    backgroundImage?: string,
    boxSizing?: string,

    borderStyle?: string,
    borderLeftStyle?: string,
    borderTopStyle?: string,
    borderRightStyle?: string,
    borderBottomStyle?: string,

    borderColor?: string,
    borderLeftColor?: string,
    borderTopColor?: string,
    borderRightColor?: string,
    borderBottomColor?: string,

    borderWidth?: number | string,
    borderLeftWidth?: number | string,
    borderTopWidth?: number | string,
    borderRightWidth?: number | string,
    borderBottomWidth?: number | string,

    borderRadius?: number | string,
    borderTopLeftRadius?: number | string,
    borderTopRightRadius?: number | string,
    borderBottomLeftRadius?: number | string,
    borderBottomRightRadius?: number | string,

    shadow?: string,
    opacity?: number,
    visibility?: string,
    zIndex?: number,
    transform?: string,

    // backgroundColor	string	'#000000'	背景色	backgroundColor: '#FF0000' | '#FF000080' | 'linear-gradient(90deg #FF000080 #00FF0080)'
    // backgroundImage	string		背景图片	同 Image 组件 的src属性
    // boxSizing	string	'none'	盒模型模式	boxSizing: 'none' | 'border-box'
    // borderStyle	string	'solid'	四个边的边框类型	borderStyle: 'none' | 'solid' | 'dashed' | 'dotted'
    // borderLeftStyle	string	'solid'	左边框类型	borderLeftStyle: 'none' | 'solid' | 'dashed' | 'dotted'
    // borderTopStyle	string	'solid'	上边框类型	borderTopStyle: 'none' | 'solid' | 'dashed' | 'dotted'
    // borderRightStyle	string	'solid'	右边框类型	borderRightStyle: 'none' | 'solid' | 'dashed' | 'dotted'
    // borderBottomStyle	string	'solid'	下边框类型	borderBottomStyle: 'none' | 'solid' | 'dashed' | 'dotted'
    // borderColor	string	'#00000000'	四个边的边框颜色	borderColor: '#000000'
    // borderLeftColor	string	'#00000000'	左边框颜色	borderLeftColor: '#000000'
    // borderTopColor	string	'#00000000'	上边框颜色	borderTopColor: '#000000'
    // borderRightColor	string	'#00000000'	右边框颜色	borderRightColor: '#000000'
    // borderBottomColor	string	'#00000000'	下边框颜色	borderBottomColor: '#000000'
    // borderWidth	number|string	0	四个边的边框宽度	borderWidth: 10 | '10px'
    // borderLeftWidth	number|string	0	左边框宽度	borderLeftWidth: 10 | '10px'
    // borderTopWidth	number|string	0	上边框宽度	borderTopWidth: 10 | '10px'
    // borderRightWidth	number|string	0	右边框宽度	borderRightWidth: 10 | '10px'
    // borderBottomWidth	number|string	0	下边框宽度	borderBottomWidth: 10 | '10px'
    // borderRadius	number|string	0	四个角的边框圆角半径	borderRadius: 10 | '10px'
    // borderTopLeftRadius	number|string	0	左上角边框圆角半径	borderTopLeftRadius: 10 | '10px'
    // borderTopRightRadius	number|string	0	右上角边框圆角半径	borderTopRightRadius: 10 | '10px'
    // borderBottomLeftRadius	number|string	0	左下角边框圆角半径	borderBottomLeftRadius: 10 | '10px'
    // borderBottomRightRadius	number|string	0	右下角边框圆角半径	borderBottomRightRadius: 10 | '10px'
    // shadow	string		控件阴影（属性分别为：水平偏移量，垂直偏移量，模糊度，颜色）	shadow: '5px 5px 10px #000000'
    // opacity	number	1	透明度	opacity: 0.5
    // visibility	string	'visible'	控件是否显示（'hidden'为不显示，但会参与布局）	visibility: 'hidden' | 'visible'
    // zIndex	number	0	控件z轴层级	zIndex: 1
    // transform	string		元素变换	transform: 'translate(100,100),scale(0.5)

    //***************************************************************************
    // * 
    // * 通用视图样式：动画
    // *
    //***************************************************************************

    transitionProperty?: string,
    transitionDuration?: number,
    transitionDelay?: number,
    transitionTimingFunction?: string,

    // transitionProperty	string		过渡效果的属性名称	transitionProperty: 'transform, backgroundColor'
    // transitionDuration	number	0	过渡效果持续时间（单位：秒）	transitionDuration: '2, 2'
    // transitionDelay	number	0	过渡效果延时时间（单位：秒）	transitionDelay: 2
    // transitionTimingFunction	string	'ease'	过渡效果的运动速率曲线	transitionTimingFunction: 'linear'

    // linear: 线性运动
    // ease: 先加速后减速（结束时会特别慢）
    // ease-in: 加速运动
    // ease-out: 减速运动
    // ease-in-out: 先加速后减速

}


/**
 * Element 
 * 
 * 需要对齐前端Element方法，参数MDN
 * 
 */
export class Element extends Node {

    /**
     * 元素属性集合
     */
    private _attributes: Record<string, any> = {};


    /**
     * 样式集合
     */
    private _style: Record<string, any> | null = {};

    /**
     * 动画集合
     */
    private _animationMap: Map<string, BasicAnimation | KeyframeAnimation> = new Map();

    /**
     * 节点构造函数
     * 
     * @param tag  节点标签
     * @param name 节点名称
     * @param props  构造参数
     */
    constructor(tag: string, name: string = tag, props: any = undefined) {
        super(tag, name, props)
    }

    /**
    * 设置属性
    * 
    * @param key 属性名称
    * @param value  属性值
    */
    public setAttribute(key: string, value: any) {
        this._setAttribute(key, value);
    }


    protected _setAttribute(key: string, value: any, update: boolean = true) {
        this._attributes[key] = value;
        if (update) {
            this.getThis().setAttributes({ [key]: value });
        }
    }

    protected _removeAttribute(key: string) {
        delete this._attributes[key];
    }


    /**
    * 初始化属性
    * 
    * @param attribute  属性
    */
    protected _initAttributes(attribute: object) {
        this._attributes = attribute || {};
        this.getThis().setAttributes(attribute);

    }

    /**
     * 设置属性
     * 
     * @param attribute  属性
     */
    protected _setAttributes(attribute: object) {
        this._attributes = { ...this._attributes, ...attribute }
        this.getThis().setAttributes(attribute);
    }


    /**
     * 获取属性名
     * @param key 属性名
     */
    public getAttribute(key: string) {
        return this._getAttribute(key);
    }

    protected _getAttribute(key: string) {
        return this._attributes[key];
    }


    public setEnable(enabled: any) {
        this._setAttribute("enable", enabled);
    }


    public getEnable(): any {
        return this._getAttribute("enable");
    }

    /**
     * 设置样式
     * 
     * @param style 样式对象
     * @param flag 标记
     */
    protected setStyle(style: FlexStyle | Record<string, any>, flag: boolean = false) {
        this._setStyles(style);
    }


    protected _setStyles(style: FlexStyle | Record<string, any> | any) {
        //TODO 临时代码，待优化
        let newStyle: any = {};
        if (style.margin) {
            newStyle.marginLeft = style.margin;
            newStyle.marginTop = style.margin;
            newStyle.marginRight = style.margin;
            newStyle.marginBottom = style.margin;
        }
        if (style.padding) {
            newStyle.paddingLeft = style.padding;
            newStyle.paddingTop = style.padding;
            newStyle.paddingRight = style.padding;
            newStyle.paddingBottom = style.padding;
        }
        if (style.borderStyle) {
            newStyle.borderLeftStyle = style.borderStyle;
            newStyle.borderTopStyle = style.borderStyle;
            newStyle.borderRightStyle = style.borderStyle;
            newStyle.borderBottomStyle = style.borderStyle;
        }
        if (style.borderColor) {
            newStyle.borderLeftColor = style.borderColor;
            newStyle.borderTopColor = style.borderColor;
            newStyle.borderRightColor = style.borderColor;
            newStyle.borderBottomColor = style.borderColor;
        }
        if (style.borderWidth) {
            newStyle.borderLeftWidth = style.borderWidth;
            newStyle.borderTopWidth = style.borderWidth;
            newStyle.borderRightWidth = style.borderWidth;
            newStyle.borderBottomWidth = style.borderWidth;
        }

        if (style.borderRadius) {
            newStyle.borderTopLeftRadius = style.borderRadius;
            newStyle.borderTopRightRadius = style.borderRadius;
            newStyle.borderBottomLeftRadius = style.borderRadius;
            newStyle.borderBottomRightRadius = style.borderRadius;
        }

        this._style = { ...newStyle, ...style };

        this.getThis().setStyles(this._style);
    }


    public getStyle() {
        return this._style || {}
    }

    /**
     *  添加动画
     * 
     * @param animation 动画对象
     * @param key  动画唯一key
     */
    public addAnimation(animation: BasicAnimation | KeyframeAnimation, key: string = "") {
        if (animation) {
            this._addAnimation(animation, key);
        } else {
            console.warn("addAnimation() animation is " + typeof (animation));
        }
    }


    /**
     * //TODO 建议在这边做事件分发。
     * 
     * @param animation 
     * @param key 
     */
    private _addAnimation(animation: BasicAnimation | KeyframeAnimation, key: string = "__default__") {
        // 监听动画的开始和结束事件
        let lastAnim = this._animationMap.get(key);

        if (lastAnim) {
            this.removeEventListener(AnimationStartName, lastAnim.startCallback);
            this.removeEventListener(AnimationEndName, lastAnim.endCallback);
        }
        this.addEventListener(AnimationStartName, animation.startCallback);
        this.addEventListener(AnimationEndName, animation.endCallback);

        // 临时存储，方面后面移除监听
        this._animationMap && this._animationMap.set(key, animation)
        this.getThis().addAnimation(animation, key);
    }

    /**
     * 移除指定动画
     * @param key 动画对象的唯一key
     */
    public removeAnimationForKey(key: string) {
        this._removeAnimationForKey(key);
    }

    private _removeAnimationForKey(key: string) {
        // 移除事件监听
        let lastAnim = this._animationMap.get(key);
        if (lastAnim) {
            this.removeEventListener(AnimationStartName, lastAnim.startCallback);
            this.removeEventListener(AnimationEndName, lastAnim.endCallback);
        }
        this._animationMap.delete(key);
        this.getThis().removeAnimationForKey(key);
    }

    /**
     * 移除全部动画
     */
    public removeAllAnimation() {
        this._removeAllAnimation();
    }


    private _removeAllAnimation() {
        // 移除事件监听
        this.removeEventListener(AnimationStartName)
        this.removeEventListener(AnimationEndName)
        this._animationMap.clear();
        this.getThis().removeAllAnimation();
    }

    /**
     * 获取视图区域
     * @param callback  区域信息回调
     */
    public getRect(callback: Function) {
        this.getThis().getRect((rect: object) => {
            callback.call(this, rect);
        })
    }


    /**
     * 获取节点调试信息
     * 
     * @param callback 
     * @param id 
     */
    public dbg_getDescription(callback: Function, id: Number) {
        console.log("dbg_getDescription()");
    }

}
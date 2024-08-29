/**
 * 1. ets 组件以id为参数，内部通过 id 查询组件属性
 * 优点：
 * 减少组件构造复杂度，
 * 缺点：
 * 无法很好的兼容 buidler 和自定义组件共存
 *
 * 2. ets 组件以node为参数，针对每个组件有特定的 node 类
 * 优点：
 * 承担数据处理逻辑 viewmodel
 * 可以适配builder 和自定义组件
 * 感知组件是否被创建
 * 缺点：
 * 除了需要自定义builder 还需要注册 node
 *
 * 目前暂时使用方案2
 * */
import { IHummerStyle, ITransform } from '../Interface/IHummerStyle';
import { CallEts } from '../Utils/CallEts';
import { domOperationError, invalidArg, unrecognizedMethod } from '../Utils/Error';
import { fn, forceToString, getVPNoPercent, nextTick, px2vp } from '../Utils/Utils';
import HMBase from './Base';
import { IDomInstruction } from './IPlatformInst';
import { BasicAnimation, KeyframeAnimation } from './Module/Animation';
import componentUtils from '@ohos.arkui.componentUtils';
import { HMContext } from '../Context/HMContext';
import { EventHandler } from './EventHandler';

export enum MutationType {
  Style = 'style',
  Attribute = 'attribute',
  Children = 'children',
  Event = 'event',
}

export type AttributesType = Record<string, any>;
type MutationFunction = (mutationType: MutationType)=>void

export interface ILayoutInfo {
  width:number
  height:number
  left:number
  top:number
  right:number
  bottom:number
  windowLeft:number
  windowTop:number
  windowRight:number
  windowBottom:number
}

interface FixedData {
  parent:HMNode
  index:number
}

export type UpdateFunc = fn;
export type NativeFunc = fn;
export class HMNode extends HMBase implements IDomInstruction{

  public parentNode? : HMNode;
  public childNodes: HMNode[] = []

  /* 状态变量 */
  public attributes : AttributesType = {};
  private _updateFuncRegistry? : Map<string, UpdateFunc> = new Map();
  private _nativeFuncRegistry? : Map<string, NativeFunc> = new Map();

  // 保存fixe之前的愿容器
  private _fixedData?:FixedData;
  private _styleStore:IHummerStyle = generateDefaultAnimationStyle();
  private _eventHandler?:EventHandler

  public getEventHandler(): EventHandler{
    if(!this._eventHandler){
      this._eventHandler =  new EventHandler(this)
    }
   return this._eventHandler
  }

  public setStyles(style : IHummerStyle){

    const currentStyle = this._styleStore;
    const newStyle : IHummerStyle = {
      ...currentStyle,
      ...style
    }
    this._styleStore = newStyle;
    if(style && style.transform){
      mergeTransformStyle(style.transform, this._styleStore.transformModel)
    }
    //todo: notify reload
    this.fixedPatch();
    this.triggerMutation(MutationType.Style, newStyle);
  }

  public registerUpdateFunc(key:string, updateFunc:UpdateFunc) : HMNode{

    this._updateFuncRegistry.set(key, updateFunc);
    return this;
  }
  public registerNativeFunc(key:string, updateFunc:UpdateFunc) : HMNode{

    this._nativeFuncRegistry.set(key, updateFunc);
    return this;
  }

  public unregisterAllUpdateFuncs(){

    this._updateFuncRegistry = new Map();;
  }

  public unregisterAllNativeFuncs(){

    this._nativeFuncRegistry = new Map();;
  }

  public registerUpdateFuncs(funcs:Record<string, UpdateFunc>){

    for(const key in funcs){
      this._updateFuncRegistry.set(key, funcs[key]);
    }
  }

  public triggerMutation(type:MutationType, ...args){
    const func = this._updateFuncRegistry.get(type);
    if(func){
      func(...args);
    }
  }


  public isFixedNode():boolean{
    return this.style?.position === 'fixed';
  }

  get style():IHummerStyle{
    return this._styleStore;
  }

  /**
   * 方法将一个节点附加到指定父节点的子节点列表的末尾处。
   * 如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置
   *
   * https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
   * */
  appendChild(child: HMNode): HMNode | undefined {
   return this._insertBefore(child);
  }

  /**
   * 在参考节点(referenceNode) 之前，插入 新节点(newNode)，可能会出发以下行为：
   * 如果引用节点为 null && newNode不在 node 的子树中，则将指定的节点添加到指定父节点的子节点列表的末尾。
   * https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore
   * */
  private _insertBefore(newNode: HMNode, referenceNode?: HMNode): HMNode | undefined {

    if(!newNode){
      this.context.handleError(domOperationError('append/insert `newNode` cannot be nil'));
      return undefined
    }

    if(newNode.parentNode && newNode.parentNode != this){
      // 从原有节点中移除
      newNode.parentNode?.removeChild(newNode)
    }

    // 没有参考节点，则直接添加
    if(!referenceNode){
      const idxOfRef = this.findIndex(newNode)
      if(idxOfRef >= 0){
        this.childNodes.splice(idxOfRef, 1)
      }
      this.childNodes.push(newNode);
    }else{
      const idxOfRef = this.findIndex(referenceNode)
      this.childNodes.splice(idxOfRef, 0, newNode)
      // todo: notify add
    }
    newNode.parentNode = this
    if(newNode.fixedPatch()){
      this.triggerMutation(MutationType.Children, this.childNodes);
    }
    return newNode;
  }

  //处理 fixed 节点，返回外部是否需要调用 triggerMutation
  private fixedPatch() : boolean{
    //当前是fixed 节点 && 父节点不是 rootNode，则记录当前位置，并添加到 root 上
    let needCallTriggerMutation:boolean = true
    const rootNode = this.context.rootNode;
    if(this.isFixedNode() && this.parentNode && rootNode && (rootNode != this.parentNode)){
      const idxOfRef = this.parentNode.findIndex(this)//记录当前位置
      this._fixedData = {
        index: idxOfRef,
        parent:this.parentNode
      }
      this.parentNode.removeChild(this);
      rootNode.appendChild(this);
      needCallTriggerMutation = false;
    }else if(!this.isFixedNode() && this._fixedData && this._fixedData.parent != this.parentNode){
      this.parentNode.removeChild(this);
      const oriParent = this._fixedData.parent;
      const oriIndex = this._fixedData.index;
      if(oriIndex < oriParent.childNodes.length){
        oriParent.childNodes.splice(oriIndex, 0, this)
      }else{
        oriParent.childNodes.push(this)
      }
      this.parentNode = oriParent;
      this._fixedData = undefined;
      oriParent.triggerMutation(MutationType.Children, oriParent.childNodes);
      needCallTriggerMutation = false;
    }
    if (rootNode && this.parentNode == rootNode) {
      rootNode.triggerMutation(MutationType.Children, rootNode.childNodes);
    }
    return needCallTriggerMutation;
  }

  /**
   * 方法从 DOM 中删除一个子节点。返回删除的节点
   * child 节点不是node节点的子节点，则该方法会抛出异常
   * */
  removeChild(child: HMNode): HMNode | undefined{
    if (!child) {
      this.context.handleError(domOperationError('Node:removeChild `child` cannot be nil'));
      return undefined
    }
    if(child.parentNode && child.parentNode != this){
      return child.parentNode.removeChild(child);
    }
    const idx = this.findIndex(child)
    if (idx < 0){
      this.context.handleError(domOperationError('Node:removeChild NotFoundError'));
      return undefined
    }
    this.childNodes.splice(idx, 1)
    child.parentNode = undefined;
    this.triggerMutation(MutationType.Children, this.childNodes);
    return child
  }

  removeAll(): void {

    this.childNodes.forEach((child)=>{
      child.parentNode = undefined;
    })
    this.childNodes = [];
    this.triggerMutation(MutationType.Children, this.childNodes);
  }

  /**
   * 在参考节点(referenceNode) 之前，插入 新节点(newNode)，可能会出发以下行为：
   * 如果引用节点为 null && newNode不在 node 的子树中，则将指定的节点添加到指定父节点的子节点列表的末尾。
   * https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore
   * */
  insertBefore(newNode: HMNode, referenceNode?: HMNode): HMNode | undefined {

    return this._insertBefore(newNode, referenceNode)
  }

  /**
   * 方法用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点。
   *
   * */
  replaceChild(newChild: HMNode, oldChild: HMNode): HMNode | undefined{

    if (!newChild) {
      this.context.handleError(domOperationError('Node:replaceChild `child` cannot be nil'));
      return undefined
    }

    newChild.parentNode?.removeChild(newChild)
    const idxOfRef = this.findIndex(oldChild)
    if (idxOfRef < 0) {
      this.context.handleError(domOperationError('Node:replaceChild NotFoundError'));
      return undefined;
    }

    this.childNodes[idxOfRef] = newChild
    oldChild.parentNode = undefined;
    newChild.parentNode = this;
    if(newChild.fixedPatch()){
      this.triggerMutation(MutationType.Children, this.childNodes);
    }
    return oldChild
  }

  override addEventListener(event:string) : boolean {
    const res = super.addEventListener(event);
    this.triggerMutation(MutationType.Event, event);
    return res
  }

  override removeEventListener(event:string) : boolean {
    const res = super.removeEventListener(event);
    this.triggerMutation(MutationType.Event, event);
    return res
  }

  setAttributes(attrs : Record<string, any>){
    for(const key in attrs){
      this.attributes[key] = attrs[key];
    }
    this.triggerMutation(MutationType.Attribute, this.attributes);
  }

  getAttribute(key:string, callback:fn){
    callback(this.attributes[key]);
  }

  getRect(callback: fn){

    nextTick(()=>{
      let info:componentUtils.ComponentInfo = componentUtils.getRectangleById(this.uniqueId);
      const width = px2vp(info.size.width);
      const height = px2vp(info.size.height);
      const left = px2vp(info.localOffset.x);
      const top = px2vp(info.localOffset.y);
      const right = left + width;
      const bottom = top + height;
      const windowLeft = px2vp(info.windowOffset.x);
      const windowTop = px2vp(info.windowOffset.y);
      const windowRight = windowLeft + width;
      const windowBottom = windowTop + height;
      const layoutResult:ILayoutInfo = {
        width:width,
        height:height,
        left:left,
        top:top,
        right:right,
        bottom:bottom,
        windowLeft:windowLeft,
        windowTop:windowTop,
        windowRight:windowRight,
        windowBottom:windowBottom,
      }
      callback(layoutResult);
    })
  }

  //优先使用 ets 订阅结果，如果没有，则使用 node 自身方法，实现类似 override 的效果
  invoke(funcName:string, ...args:any[]): undefined | any{
    let func = this._nativeFuncRegistry.get(funcName);
    let _this = undefined;
    if(!func){
      func = this[funcName];
      _this = func ? this : undefined;
    }
    if(func){
      try {
        return func.call(_this, ...args);
      } catch (e) {
        this.context.handleException(forceToString(e));
      }
    }else{
      this.context.handleError(unrecognizedMethod(funcName));
    }
    return undefined
  }

  // type：basic
  addAnimation(animation:object, key:string){
    if(animation['type'] == 'basic'){
      CallEts.addBasicAnimation(this, animation as BasicAnimation, key);
    }else if(animation['type'] == 'keyframe'){
      CallEts.addKeyframeAnimation(this, animation as KeyframeAnimation, key);
    }else{
      this.context.handleError(invalidArg('动画参数type无效'));
    }
  }
  // todo: 鸿蒙暂不支持 移除
  removeAnimationForKey(key:string){}
  removeAllAnimation(){}

  public findIndex (refChild: HMNode): number {
    const idx = this.childNodes.findIndex((element)=>{
      return refChild === element
    })
     return idx
  }

  public dispose () {
    this.parentNode = null
    this.childNodes = []
  }

  public onMounted(){}
}

function generateDefaultAnimationStyle() : IHummerStyle{

  return {
    opacity:1,
    backgroundColor:'transparent',
    transformModel:{
      translate:{x:0, y:0},
      scale:{x:1, y:1},
      rotation:{x:0, y:0 ,z:0, angle:0}
    }
  }
}
// transform: 'translate(100,100),scale(0.5),rotateZ(30)'
function mergeTransformStyle(transform:string, model:ITransform) {

  let str = transform.replaceAll(' ', '');
  str = str.replaceAll('),', ');');
  const transforms = str.split(';');

  transforms.forEach((transformStr)=>{
    const valuePairs = transformStr.split('(')
    if(valuePairs.length!=2){return;}
    const key = valuePairs[0];
    let value = valuePairs[1];
    value = value.replaceAll(')','');
    if(key == 'translate'){
      const values = value.split(',');
      const x = getVPNoPercent(values[0])
      const y = getVPNoPercent(values[1])
      model.translate = {x:x, y:y};

    }else if(key.startsWith('scale')){

      const valueNum = parseFloat(value)
      const scale = model.scale ? model.scale : {x:1, y:1};
      if(key.endsWith('X')){
        scale.x = valueNum
      }else if(key.endsWith('Y')){
        scale.y = valueNum
      }else{
        scale.x = valueNum
        scale.y = valueNum
      }
      model.scale = scale
    }else if(key.startsWith('rotate')){
      const rotate = model.rotation ? model.rotation : {x:0, y:0 ,z:0, angle:0};
      if(key.endsWith('X')){
        rotate.x = 1;
        rotate.angle = value
      }else if(key.endsWith('Y')){
        rotate.y = 1;
        rotate.angle = value
      }else if(key.endsWith('Z')){
        rotate.z = 1;
        rotate.angle = value
      }
      model.rotation = rotate
    }
  })

}
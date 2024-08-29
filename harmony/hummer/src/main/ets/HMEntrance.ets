import { getETSBuiltinComponentRegistry } from './BuiltinComponentRegistry'
import { ComponentBuilderContext, componentFactoryBuilder } from './Components/ets/ComponentBuilder'
import { EngineType, HMContext, HMContextEventType, setBuiltinComponentRegistryProvider } from './Context/HMContext'
import { common } from '@kit.AbilityKit'
import { HMContextConfig } from './Context/Config/Config'
import { fn, HMAny, isEqualArray } from './Utils/Utils'
import { MutationType, HMNode } from './Components/Node'
import { CleanupCallback } from './Context/EventEmitter'
import { RootNode } from './Components/RootNode'
import { PageOnAppear, PageOnBack, PageOnCreate, PageOnDestroy, PageOnDisappear } from './Components/RootNode'
import { bindTs2EtsFunc } from './Utils/Binder'
import { IContentProvider } from './Interface/IContentProvider'
import { IPageData } from './Interface/IPageData'
import { isUndefined } from './Utils/is'

@Builder
function defaultBuilder(ctx: ComponentBuilderContext) {

}

// HMEntranceController -> HMEntrance
// HMContext -> HMEntranceController
// 解引用：HMEntrance 在 从组件树移除后，移除 HMEntranceController -> HMEntrance 、HMContext -> HMEntranceController 的引用
// 这个类 不要导出。绑定 HMEntranceController, HMEntrance， HMEntrance 在 从组件树移除后，移除 HMEntranceController -> HMEntrance 的引用
class HMEntranceBinder {
  static funcRegistry? : Map<string, fn> = new Map();
  public static __entranceWeakMap : WeakMap<HMEntranceController, HMEntrance> = new WeakMap();
  public static bind(controller: HMEntranceController, entrance:HMEntrance){
    HMEntranceBinder.__entranceWeakMap.set(controller, entrance);
  }
  public static unbind(controller: HMEntranceController){
    HMEntranceBinder.__entranceWeakMap.delete(controller);
  }
  public static getEntrance(controller: HMEntranceController) : HMEntrance | undefined{
    return  HMEntranceBinder.__entranceWeakMap.get(controller);
  }
}

// 可以调用 HMEntrance 方法，获取 HMEntrance 状态
export class HMEntranceController {

  private static _contextControllerMap: WeakMap<HMContext, HMEntranceController> = new WeakMap();
  // private _entrance
  onBackPress(): boolean {
    const entrance = HMEntranceBinder.getEntrance(this);
    if(entrance){
      return entrance.onBackPress();
    }
    return false;
  }

  onPageShow(): void {
    const entrance = HMEntranceBinder.getEntrance(this);
    if(entrance){
      return entrance.onPageShow();
    }
  }

  onPageHide(): void {
    const entrance = HMEntranceBinder.getEntrance(this);
    if(entrance){
      return entrance.onPageHide();
    }
  }


  get uiContext() : UIContext | undefined{
    const entrance = HMEntranceBinder.getEntrance(this);
    return entrance?.fetchUIContext();
  }
  get pageData() : IPageData | undefined{
    const entrance = HMEntranceBinder.getEntrance(this);
    if(entrance){
      return entrance.pageData;
    }
    return undefined;
  }

  get customComponentBuilder() : WrappedBuilder<[ctx: ComponentBuilderContext]> | undefined{
    const entrance = HMEntranceBinder.getEntrance(this);
    if(entrance){
      return entrance.customComponentBuilder;
    }
    return undefined;
  }

  public static bindContext(context: HMContext, controller:HMEntranceController) {
    HMEntranceController._contextControllerMap.set(context, controller);
  }
  public static unBindContext(context: HMContext) {
    HMEntranceController._contextControllerMap.delete(context);
  }
  public static getController(context: HMContext) : HMEntranceController | undefined{
    return  HMEntranceController._contextControllerMap.get(context);
  }
}

enum EntranceState {
  Create,
  Appear,
  Disappear,
  Destroy
}

@Component
export struct HMEntrance {
  /// 自定义组件构建器
  customComponentBuilder: WrappedBuilder<[ctx: ComponentBuilderContext]> = wrapBuilder(defaultBuilder);
  public controller!: HMEntranceController;
  public config?: HMContextConfig
  public pageData: IPageData = {};
  public contentProvider!: IContentProvider;

  /// 包含 root 和 fixd 视图
  @State private children?: HMNode[] = new Array();

  private _ctx!: HMContext;
  private closeCallback?: fn;
  private rootNode!: RootNode;
  private renderNode?: HMNode;
  private renderViewCleanupCallback?: CleanupCallback;
  private onErrorCleanupCallback?: CleanupCallback;
  private onExceptionCleanupCallback?: CleanupCallback;
  private _uiContext: UIContext | undefined = undefined;
  private state = EntranceState.Create
  updateRoot(root: HMNode) {

    this.children = [root];
  }

  aboutToAppear() {
    bindTs2EtsFunc();
    setBuiltinComponentRegistryProvider(getETSBuiltinComponentRegistry)
    const abilityContext = getContext(this) as common.UIAbilityContext;
    this._ctx = new HMContext(abilityContext, this.pageData?.pageInfo?.url ,EngineType.HarmonyRuntime, this.config);
    this._uiContext = this.getUIContext?.();
    this.rootNode = new RootNode(this._ctx);
    HMEntranceController.bindContext(this._ctx, this.controller);
    HMContext.setRootView(this._ctx, this.rootNode);
    HMEntranceBinder.bind(this.controller, this);

    this.closeCallback = this.pageData?.closeCallback;

    this.rootNode.registerUpdateFunc(MutationType.Children, (childNodes: HMNode[]) => {
      const sortedChild = this.rootNode.getSortedChild();
      if(isEqualArray(sortedChild, this.children, (n1, n2)=>n1.id == n2.id)){
        return;
      }
      this.children = sortedChild;
    })

    this.onErrorCleanupCallback = this._ctx.eventEmitter.on(HMContextEventType.OnReady, (e: string) => {
      this.contentProvider.render(this._ctx);
    });

    this.renderViewCleanupCallback = this._ctx.eventEmitter.on(HMContextEventType.RenderSuccess, (renderView: HMNode) => {
      this.renderNode = renderView;
      if(this.state == EntranceState.Destroy){return;}
      this.renderNode?.dispatchEvent(PageOnCreate)

      this.rootNode.appendChild(renderView);
      this.renderNode?.dispatchEvent(PageOnAppear)
      if(this.state == EntranceState.Disappear){
        this.renderNode?.dispatchEvent(PageOnDisappear)
      }
    });

    this.onErrorCleanupCallback = this._ctx.eventEmitter.on(HMContextEventType.OnError, (e: string) => {
      //todo devtool & 条件编译
      console.error(e);
    });
    this.onExceptionCleanupCallback = this._ctx.eventEmitter.on(HMContextEventType.OnException, (e: string) => {
      //todo devtool & 条件编译
      console.error(e);
    });
  }

  fetchUIContext() : UIContext | undefined {
    return this._uiContext;
  }
  get context(): HMContext {
    return this._ctx;
  }

  onPageShow(): void {
    this.state = EntranceState.Appear
    this.renderNode?.dispatchEvent(PageOnAppear)
  }

  onPageHide(): void {
    this.state = EntranceState.Disappear
    this.renderNode?.dispatchEvent(PageOnDisappear)
  }

  onBackPress(): boolean {
    const res : HMAny = this.renderNode?.dispatchEvent(PageOnBack);
    if(isUndefined(res)){return false}
    return res ? true : false
  }

  aboutToDisappear(): void {
    this.state = EntranceState.Destroy
    this.renderNode?.dispatchEvent(PageOnDestroy)
    this._ctx.eventEmitter.emit(HMContextEventType.OnDestroy)

    HMContext.deleteRootView(this._ctx);
    HMEntranceController.unBindContext(this._ctx);
    HMEntranceBinder.unbind(this.controller);

    this.renderViewCleanupCallback?.();
    this.onErrorCleanupCallback?.();
    this.onExceptionCleanupCallback?.();
    if (this.closeCallback) {
      this.closeCallback(this.pageData?.result);
    }
  }

  build() {
    Column() {
      ForEach(this.children, (node: HMNode) => {
        componentFactoryBuilder({
          hmContext: this._ctx,
          tag: node.name,
          node: node,
          customComponentBuilder: this.customComponentBuilder
        });
      }, (node: HMNode) => node.id.toString())
    }
  }
}
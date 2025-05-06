interface HMEntrance_Params {
    /// 自定义组件构建器
    customComponentBuilder?: WrappedBuilder<[
        ctx: ComponentBuilderContext
    ]>;
    controller?: HMEntranceController;
    config?: HMContextConfig;
    pageData?: IPageData;
    contentProvider?: IContentProvider;
    children?: Node[];
    _ctx?: HMContext;
    closeCallback?: fn;
    rootNode?: RootNode;
    renderNode?: Node;
    renderViewCleanupCallback?: CleanupCallback;
    onErrorCleanupCallback?: CleanupCallback;
    onExceptionCleanupCallback?: CleanupCallback;
    _uiContext?: UIContext | undefined;
    state?;
}
import { getETSBuiltinComponentRegistry } from "@bundle:com.example.hummer/entry/src/main/Hummer/BuiltinComponentRegistry";
import { componentFactoryBuilder } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/ComponentBuilder";
import { EngineType, HMContext, HMContextEventType, setBuiltinComponentRegistryProvider } from "@bundle:com.example.hummer/entry/src/main/Hummer/Context/HMContext";
import type common from "@ohos:app.ability.common";
import type { HMContextConfig } from './Context/Config/Config';
import type { fn } from './Utils/Utils';
import { MutationType } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Node";
import type { Node } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Node";
import type { CleanupCallback } from './Context/EventEmitter';
import type { IContentProvider } from './ContentProvider';
import type { IPageData } from './Components/Module/Navigator';
import { RootNode } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/RootNode";
import { PageOnAppear, PageOnBack, PageOnCreate, PageOnDestroy, PageOnDisappear } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Event";
import { bindTs2EtsFunc } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Binder";
function defaultBuilder(ctx: ComponentBuilderContext, parent = null) {
    const __ctx__ = ctx;
}
// HMEntranceController -> HMEntrance
// HMContext -> HMEntranceController
// 解引用：HMEntrance 在 从组件树移除后，移除 HMEntranceController -> HMEntrance 、HMContext -> HMEntranceController 的引用
// 这个类 不要导出。绑定 HMEntranceController, HMEntrance， HMEntrance 在 从组件树移除后，移除 HMEntranceController -> HMEntrance 的引用
class HMEntranceBinder {
    static funcRegistry?: Map<string, fn> = new Map();
    public static __entranceWeakMap: WeakMap<HMEntranceController, HMEntrance> = new WeakMap();
    public static bind(controller: HMEntranceController, entrance: HMEntrance) {
        HMEntranceBinder.__entranceWeakMap.set(controller, entrance);
    }
    public static unbind(controller: HMEntranceController) {
        HMEntranceBinder.__entranceWeakMap.delete(controller);
    }
    public static getEntrance(controller: HMEntranceController): HMEntrance | undefined {
        return HMEntranceBinder.__entranceWeakMap.get(controller);
    }
}
// 可以调用 HMEntrance 方法，获取 HMEntrance 状态
export class HMEntranceController {
    private static _contextControllerMap: WeakMap<HMContext, HMEntranceController> = new WeakMap();
    // private _entrance
    onBackPress(): boolean | void {
        const entrance = HMEntranceBinder.getEntrance(this);
        if (entrance) {
            return entrance.onBackPress();
        }
        return false;
    }
    onPageShow(): void {
        const entrance = HMEntranceBinder.getEntrance(this);
        if (entrance) {
            return entrance.onPageShow();
        }
    }
    onPageHide(): void {
        const entrance = HMEntranceBinder.getEntrance(this);
        if (entrance) {
            return entrance.onPageHide();
        }
    }
    get uiContext(): UIContext | undefined {
        const entrance = HMEntranceBinder.getEntrance(this);
        return entrance?.fetchUIContext();
    }
    get pageData(): IPageData | undefined {
        const entrance = HMEntranceBinder.getEntrance(this);
        if (entrance) {
            return entrance.pageData;
        }
        return undefined;
    }
    public static bindContext(context: HMContext, controller: HMEntranceController) {
        HMEntranceController._contextControllerMap.set(context, controller);
    }
    public static unBindContext(context: HMContext) {
        HMEntranceController._contextControllerMap.delete(context);
    }
    public static getController(context: HMContext): HMEntranceController | undefined {
        return HMEntranceController._contextControllerMap.get(context);
    }
}
enum EntranceState {
    Create = 0,
    Appear = 1,
    Disappear = 2,
    Destroy = 3
}
export default class HMEntrance extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.customComponentBuilder = wrapBuilder(defaultBuilder);
        this.controller = undefined;
        this.config = undefined;
        this.pageData = {};
        this.contentProvider = undefined;
        this.__children = new ObservedPropertyObjectPU(new Array(), this, "children");
        this._ctx = undefined;
        this.closeCallback = undefined;
        this.rootNode = undefined;
        this.renderNode = undefined;
        this.renderViewCleanupCallback = undefined;
        this.onErrorCleanupCallback = undefined;
        this.onExceptionCleanupCallback = undefined;
        this._uiContext = undefined;
        this.state = EntranceState.Create;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMEntrance_Params) {
        if (params.customComponentBuilder !== undefined) {
            this.customComponentBuilder = params.customComponentBuilder;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.config !== undefined) {
            this.config = params.config;
        }
        if (params.pageData !== undefined) {
            this.pageData = params.pageData;
        }
        if (params.contentProvider !== undefined) {
            this.contentProvider = params.contentProvider;
        }
        if (params.children !== undefined) {
            this.children = params.children;
        }
        if (params._ctx !== undefined) {
            this._ctx = params._ctx;
        }
        if (params.closeCallback !== undefined) {
            this.closeCallback = params.closeCallback;
        }
        if (params.rootNode !== undefined) {
            this.rootNode = params.rootNode;
        }
        if (params.renderNode !== undefined) {
            this.renderNode = params.renderNode;
        }
        if (params.renderViewCleanupCallback !== undefined) {
            this.renderViewCleanupCallback = params.renderViewCleanupCallback;
        }
        if (params.onErrorCleanupCallback !== undefined) {
            this.onErrorCleanupCallback = params.onErrorCleanupCallback;
        }
        if (params.onExceptionCleanupCallback !== undefined) {
            this.onExceptionCleanupCallback = params.onExceptionCleanupCallback;
        }
        if (params._uiContext !== undefined) {
            this._uiContext = params._uiContext;
        }
        if (params.state !== undefined) {
            this.state = params.state;
        }
    }
    updateStateVars(params: HMEntrance_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__children.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__children.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /// 自定义组件构建器
    private customComponentBuilder: WrappedBuilder<[
        ctx: ComponentBuilderContext
    ]>;
    public controller: HMEntranceController;
    public config?: HMContextConfig;
    public pageData: IPageData;
    public contentProvider: IContentProvider;
    /// 包含 root 和 fixd 视图
    private __children?: ObservedPropertyObjectPU<Node[]>;
    get children() {
        return this.__children.get();
    }
    set children(newValue: Node[]) {
        this.__children.set(newValue);
    }
    private _ctx: HMContext;
    private closeCallback?: fn;
    private rootNode: RootNode;
    private renderNode?: Node;
    private renderViewCleanupCallback?: CleanupCallback;
    private onErrorCleanupCallback?: CleanupCallback;
    private onExceptionCleanupCallback?: CleanupCallback;
    private _uiContext: UIContext | undefined;
    private state;
    updateRoot(root: Node) {
        this.children = [root];
    }
    aboutToAppear() {
        bindTs2EtsFunc();
        setBuiltinComponentRegistryProvider(getETSBuiltinComponentRegistry);
        const abilityContext = getContext(this) as common.UIAbilityContext;
        this._ctx = new HMContext(abilityContext, EngineType.HarmonyRuntime);
        this._uiContext = this.getUIContext?.();
        this.rootNode = new RootNode(this._ctx);
        HMEntranceController.bindContext(this._ctx, this.controller);
        HMContext.setRootView(this._ctx, this.rootNode);
        HMEntranceBinder.bind(this.controller, this);
        this.closeCallback = this.pageData?.closeCallback;
        this.rootNode.registerUpdateFunc(MutationType.Children, (childNodes: Node[]) => {
            this.children = childNodes;
        });
        this.onErrorCleanupCallback = this._ctx.eventEmitter.on(HMContextEventType.OnReady, (e: string) => {
            this.contentProvider.render(this._ctx);
        });
        this.renderViewCleanupCallback = this._ctx.eventEmitter.on(HMContextEventType.RenderSuccess, (renderView: Node) => {
            this.renderNode = renderView;
            if (this.state == EntranceState.Destroy) {
                return;
            }
            this.renderNode?.dispatchEvent(PageOnCreate);
            this.rootNode.appendChild(renderView);
            this.renderNode?.dispatchEvent(PageOnAppear);
            if (this.state == EntranceState.Disappear) {
                this.renderNode?.dispatchEvent(PageOnDisappear);
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
    fetchUIContext(): UIContext | undefined {
        return this._uiContext;
    }
    onPageShow(): void {
        this.state = EntranceState.Appear;
        this.renderNode?.dispatchEvent(PageOnAppear);
    }
    onPageHide(): void {
        this.state = EntranceState.Disappear;
        this.renderNode?.dispatchEvent(PageOnDisappear);
    }
    onBackPress(): boolean | void {
        this.renderNode?.dispatchEvent(PageOnBack);
    }
    aboutToDisappear(): void {
        this.state = EntranceState.Destroy;
        this.renderNode?.dispatchEvent(PageOnDestroy);
        this._ctx.removeNotifyCenter(); // todo
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/Hummer/HMEntrance.ets(203:5)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const node = _item;
                componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["___ctx"] ? this["___ctx"] : this["_ctx"]), tag: () => node.name, node: () => node, customComponentBuilder: () => (this["__customComponentBuilder"] ? this["__customComponentBuilder"] : this["customComponentBuilder"]) }));
            };
            this.forEachUpdateFunction(elmtId, this.children, forEachItemGenFunction, (node: Node) => node.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

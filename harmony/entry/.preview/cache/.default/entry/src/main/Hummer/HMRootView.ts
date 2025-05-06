interface HMRootView_Params {
    ctx?: HMContext;
    customComponentBuilder?: WrappedBuilder<[
        ctx: ComponentBuilderContext
    ]>;
    children?: Node[];
    renderViewCleanupCallback?: CleanupCallback;
}
import { componentFactoryBuilder } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/ComponentBuilder";
import { HMCustomDialog } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/Dialog";
import type { Node } from './Components/Node';
import type { CleanupCallback } from './Context/EventEmitter';
import { HMContextEventType } from "@bundle:com.example.hummer/entry/src/main/Hummer/Context/HMContext";
import type { HMContext } from "@bundle:com.example.hummer/entry/src/main/Hummer/Context/HMContext";
export default class HMRootView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.ctx = undefined;
        this.customComponentBuilder = wrapBuilder(defaultBuilder);
        this.__children = new ObservedPropertyObjectPU(new Array(), this, "children");
        this.renderViewCleanupCallback = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMRootView_Params) {
        if (params.ctx !== undefined) {
            this.ctx = params.ctx;
        }
        if (params.customComponentBuilder !== undefined) {
            this.customComponentBuilder = params.customComponentBuilder;
        }
        if (params.children !== undefined) {
            this.children = params.children;
        }
        if (params.renderViewCleanupCallback !== undefined) {
            this.renderViewCleanupCallback = params.renderViewCleanupCallback;
        }
    }
    updateStateVars(params: HMRootView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__children.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__children.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private ctx: HMContext;
    private customComponentBuilder: WrappedBuilder<[
        ctx: ComponentBuilderContext
    ]>;
    /// 包含 root 和 fixd 视图
    private __children?: ObservedPropertyObjectPU<Node[]>;
    get children() {
        return this.__children.get();
    }
    set children(newValue: Node[]) {
        this.__children.set(newValue);
    }
    /// 自定义组件构建器
    private renderViewCleanupCallback?: CleanupCallback;
    aboutToAppear(): void {
        this.renderViewCleanupCallback = this.ctx.eventEmitter.on(HMContextEventType.RenderSuccess, (renderView: Node) => {
            this.updateRoot(renderView);
        });
    }
    updateRoot(root: Node) {
        this.children = [root];
    }
    aboutToDisappear(): void {
        //todo: call js lifeCycle
        this.renderViewCleanupCallback?.();
    }
    aboutToRecycle(): void {
        //todo: call js lifeCycle
    }
    createCustomDialog(node: Node): CustomDialogController {
        const dialogController: CustomDialogController = new CustomDialogController({
            builder: HMCustomDialog({ builderContext: {
                    hmContext: this.ctx,
                    tag: node.name,
                    node: node,
                    customComponentBuilder: this.customComponentBuilder
                } })
        }, this);
        return dialogController;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/Hummer/HMRootView.ets(51:5)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const node = _item;
                componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["__ctx"] ? this["__ctx"] : this["ctx"]), tag: () => node.name, node: () => node, customComponentBuilder: () => (this["__customComponentBuilder"] ? this["__customComponentBuilder"] : this["customComponentBuilder"]) }));
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

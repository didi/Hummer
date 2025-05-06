interface HMCustomDialog_Params {
    controller?: CustomDialogController;
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    dialog?: HMDialog;
    type?: HMDialogType;
}
import type { HMContext } from '../../Context/HMContext';
import { HMDialogType } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Dialog";
import type { HMDialog } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Module/Dialog";
import { componentFactoryBuilder } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/ComponentBuilder";
export function dialogBuilder(parent = null) {
    HMCustomDialog();
}
export class HMCustomDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.dialog = undefined;
        this.type = HMDialogType.Alert;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMCustomDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.builderContext !== undefined) {
            this.builderContext = params.builderContext;
        }
        if (params.hmContext !== undefined) {
            this.hmContext = params.hmContext;
        }
        if (params.dialog !== undefined) {
            this.dialog = params.dialog;
        }
        if (params.type !== undefined) {
            this.type = params.type;
        }
    }
    updateStateVars(params: HMCustomDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: CustomDialogController;
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private dialog: HMDialog;
    private type: HMDialogType;
    aboutToAppear(): void {
        this.type = this.dialog.type;
        this.hmContext = this.dialog.context;
    }
    customBuilder(parent = null) {
        componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => this.hmContext, tag: () => this.dialog.node!.name, node: () => this.dialog.node!, customComponentBuilder: () => this.builderContext.customComponentBuilder }));
    }
    alertBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(36:5)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.dialog.alertData!.msg);
            Text.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(37:7)");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.dialog.alertData!.btnText);
            Button.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(38:7)");
            Button.onClick(() => {
                this.dialog.alertData!.callback();
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    confirmBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(47:5)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.dialog.confirmData!.title);
            Text.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(48:7)");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.dialog.confirmData!.msg);
            Text.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(49:7)");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(50:7)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.dialog.confirmData!.okBtnText);
            Button.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(51:9)");
            Button.onClick(() => {
                this.dialog.confirmData!.okCallback();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.dialog.confirmData!.cancelBtnText);
            Button.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(55:9)");
            Button.onClick(() => {
                this.dialog.confirmData!.cancelCallback();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    loadingBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(65:7)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Progress.create({ value: 0, total: 100, type: ProgressType.ScaleRing });
            Progress.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(66:9)");
            Progress.color(Color.Grey);
            Progress.width(50);
            Progress.style({ strokeWidth: 10, scaleCount: 20, scaleWidth: 2 });
        }, Progress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('加载中...');
            Text.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(69:9)");
        }, Text);
        Text.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(74:5)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('过渡版组件，依赖鸿蒙能力，530更新');
            Text.debugLine("entry/src/main/Hummer/Components/ets/Dialog.ets(75:7)");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.type == HMDialogType.Alert) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.alertBuilder.bind(this)();
                });
            }
            else if (this.type == HMDialogType.Confirm) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.confirmBuilder.bind(this)();
                });
            }
            else if (this.type == HMDialogType.Loading) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.loadingBuilder.bind(this)();
                });
            }
            else if (this.type == HMDialogType.Custom) {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.customBuilder.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(4, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

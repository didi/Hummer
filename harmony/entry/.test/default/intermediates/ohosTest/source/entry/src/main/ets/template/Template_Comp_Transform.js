import { HMEntrance, HMEntranceController, HarmonyRuntimeContentProvider } from 'hummer';
import { renderFunc } from '../unit_test/Comp_Transform';
export class Template_Comp_Transform extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.pageData = undefined;
        this.entranceController = new HMEntranceController();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.pageData !== undefined) {
            this.pageData = params.pageData;
        }
        if (params.entranceController !== undefined) {
            this.entranceController = params.entranceController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    aboutToAppear() {
    }
    aboutToDisappear() {
    }
    onBackPress() {
        return this.entranceController.onBackPress();
    }
    onPageShow() {
        this.entranceController.onPageShow();
    }
    onPageHide() {
        this.entranceController.onPageHide();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.width('100%');
                    __Common__.height('100%');
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new HMEntrance(this, { controller: this.entranceController, pageData: this.pageData, contentProvider: new HarmonyRuntimeContentProvider(renderFunc) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/template/Template_Comp_Transform.ets", line: 29 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    controller: this.entranceController,
                                    pageData: this.pageData,
                                    contentProvider: new HarmonyRuntimeContentProvider(renderFunc)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMEntrance" });
                }
                __Common__.pop();
            });
            NavDestination.onBackPressed(() => {
                if (this.onBackPress()) {
                    return true;
                }
                return false;
            });
            NavDestination.onShown(() => {
                this.onPageShow();
            });
            NavDestination.onHidden(() => {
                this.onPageHide();
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName() {
        return "Template_Comp_Transform";
    }
}
registerNamedRoute(() => new Template_Comp_Transform(undefined, {}), "", { bundleName: "com.example.hummer", moduleName: "entry", pagePath: "template/Template_Comp_Transform" });
//# sourceMappingURL=Template_Comp_Transform.js.map
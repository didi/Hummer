import { HMEntrance, HMEntranceController, HarmonyRuntimeContentProvider } from 'hummer';
import { renderFunc } from './Tenon'; // cli 页面产物
export class Template extends ViewPU {
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
    onBackPress() {
        //同步生命周期
        return this.entranceController.onBackPress();
    }
    onPageShow() {
        //同步生命周期
        this.entranceController.onPageShow();
    }
    onPageHide() {
        //同步生命周期
        this.entranceController.onPageHide();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.backgroundColor(Color.Red);
                    __Common__.width('100%');
                    __Common__.height('100%');
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new HMEntrance(this, { controller: this.entranceController, pageData: this.pageData, contentProvider: new HarmonyRuntimeContentProvider(renderFunc) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Template.ets", line: 26 });
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
        return "Template";
    }
}
registerNamedRoute(() => new Template(undefined, {}), "", { bundleName: "com.example.hummer", moduleName: "entry", pagePath: "pages/Template" });
//# sourceMappingURL=Template.js.map
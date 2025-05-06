interface Template_Comp_List_Params {
    pageData?: IPageData;
    entranceController?: HMEntranceController;
}
import { HMEntrance, HMEntranceController, HarmonyRuntimeContentProvider } from "@bundle:com.example.hummer/entry@hummer/Index";
import type { IPageData } from "@bundle:com.example.hummer/entry@hummer/Index";
import { renderFunc } from "@bundle:com.example.hummer/entry/ets/unit_test/Comp_List";
export class Template_Comp_List extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.pageData = undefined;
        this.entranceController = new HMEntranceController();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Template_Comp_List_Params) {
        if (params.pageData !== undefined) {
            this.pageData = params.pageData;
        }
        if (params.entranceController !== undefined) {
            this.entranceController = params.entranceController;
        }
    }
    updateStateVars(params: Template_Comp_List_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    public pageData?: IPageData;
    private entranceController: HMEntranceController;
    aboutToAppear(): void {
    }
    aboutToDisappear(): void {
    }
    onBackPress(): boolean | void {
        return this.entranceController.onBackPress();
    }
    onPageShow(): void {
        this.entranceController.onPageShow();
    }
    onPageHide(): void {
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
                            let paramsLambda = () => {
                                return {
                                    controller: this.entranceController,
                                    pageData: this.pageData,
                                    contentProvider: new HarmonyRuntimeContentProvider(renderFunc)
                                };
                            };
                            ViewPU.create(new HMEntrance(this, { controller: this.entranceController, pageData: this.pageData, contentProvider: new HarmonyRuntimeContentProvider(renderFunc) }, undefined, elmtId, paramsLambda, { page: "entry/src/main/ets/template/Template_Comp_List.ets", line: 29 }));
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
            NavDestination.debugLine("entry/src/main/ets/template/Template_Comp_List.ets(28:5)");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Template_Comp_List";
    }
}
registerNamedRoute(() => new Template_Comp_List(undefined, {}), "", { bundleName: "com.example.hummer", moduleName: "entry", pagePath: "template/Template_Comp_List" });

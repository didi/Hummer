interface HummerPage_Params {
    pageData?: IPageData;
    contentProvider?;
    entranceController?: HMEntranceController;
}
import { HMEntrance, HMEntranceController } from "@bundle:com.example.hummer/entry@hummer/Index";
import type { IPageData } from "@bundle:com.example.hummer/entry@hummer/Index";
import { DynamicImportContentProvider } from "@bundle:com.example.hummer/entry/ets/pages/tenon/DynamicImportContentProvider";
export class HummerPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.pageData = {
            pageInfo: {
                id: './index.js',
                url: './index.js',
            }
        };
        this.contentProvider = new DynamicImportContentProvider();
        this.entranceController = new HMEntranceController();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HummerPage_Params) {
        if (params.pageData !== undefined) {
            this.pageData = params.pageData;
        }
        if (params.contentProvider !== undefined) {
            this.contentProvider = params.contentProvider;
        }
        if (params.entranceController !== undefined) {
            this.entranceController = params.entranceController;
        }
    }
    updateStateVars(params: HummerPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 可以在 navstack 的builder 构建内，构建 hummer 容器时。传递 加载链接，注意路径必须为 './xxxx.js'
    public pageData?: IPageData;
    public contentProvider;
    private entranceController: HMEntranceController;
    aboutToAppear(): void {
    }
    aboutToDisappear(): void {
    }
    onBackPress(): boolean | void {
        return this.entranceController.onBackPress();
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
                            let componentCall = new HMEntrance(this, {
                                controller: this.entranceController,
                                pageData: this.pageData,
                                contentProvider: this.contentProvider,
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 32 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    controller: this.entranceController,
                                    pageData: this.pageData,
                                    contentProvider: this.contentProvider
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
            NavDestination.debugLine("entry/src/main/ets/pages/Index.ets(31:5)");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HummerPage";
    }
}
registerNamedRoute(() => new HummerPage(undefined, {}), "", { bundleName: "com.example.hummer", moduleName: "entry", pagePath: "pages/Index" });

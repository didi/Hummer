interface Detail_Params {
    stackPath?: NavPathStack;
}
export class Detail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.stackPath = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Detail_Params) {
        if (params.stackPath !== undefined) {
            this.stackPath = params.stackPath;
        }
    }
    updateStateVars(params: Detail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    public stackPath: NavPathStack;
    aboutToAppear(): void {
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/Detail.ets(10:7)");
                    Row.height('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Detail.ets(11:9)");
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('replacePath');
                    Text.debugLine("entry/src/main/ets/pages/Detail.ets(12:11)");
                    Text.fontSize(50);
                    Text.fontColor(Color.Red);
                    Text.fontWeight(FontWeight.Bold);
                    Text.onClick(() => {
                        this.stackPath.replacePath({ name: 'Detail' });
                    });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('pop');
                    Text.debugLine("entry/src/main/ets/pages/Detail.ets(19:11)");
                    Text.fontSize(50);
                    Text.fontColor(Color.Red);
                    Text.fontWeight(FontWeight.Bold);
                    Text.onClick(() => {
                        this.stackPath.pop();
                    });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('push');
                    Text.debugLine("entry/src/main/ets/pages/Detail.ets(26:11)");
                    Text.fontSize(50);
                    Text.fontColor(Color.Red);
                    Text.fontWeight(FontWeight.Bold);
                    Text.onClick(() => {
                        this.stackPath.pushPath({ name: 'Detail' });
                    });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('get');
                    Text.debugLine("entry/src/main/ets/pages/Detail.ets(33:11)");
                    Text.fontSize(50);
                    Text.fontColor(Color.Red);
                    Text.fontWeight(FontWeight.Bold);
                    Text.onClick(() => {
                        const pages = this.stackPath.getAllPathName();
                        console.log(JSON.stringify(pages));
                    });
                }, Text);
                Text.pop();
                Column.pop();
                Row.pop();
            });
            NavDestination.debugLine("entry/src/main/ets/pages/Detail.ets(9:5)");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Detail";
    }
}
registerNamedRoute(() => new Detail(undefined, {}), "", { bundleName: "com.example.hummer", moduleName: "entry", pagePath: "pages/Detail" });

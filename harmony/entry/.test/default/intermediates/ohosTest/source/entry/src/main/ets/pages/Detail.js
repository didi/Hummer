export class Detail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.stackPath = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.stackPath !== undefined) {
            this.stackPath = params.stackPath;
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.height('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('replacePath');
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
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName() {
        return "Detail";
    }
}
registerNamedRoute(() => new Detail(undefined, {}), "", { bundleName: "com.example.hummer", moduleName: "entry", pagePath: "pages/Detail" });
//# sourceMappingURL=Detail.js.map
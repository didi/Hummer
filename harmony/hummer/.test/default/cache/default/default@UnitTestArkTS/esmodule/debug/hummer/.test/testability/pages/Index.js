import AbilityDelegatorRegistry from '@ohos:app.ability.abilityDelegatorRegistry';
import { Hypium } from '@package:pkg_modules/.ohpm/@ohos+hypium@1.0.13/pkg_modules/@ohos/hypium/index';
import testsuite from '@bundle:com.example.hummer/hummer/src/test/List.test';
class Index1 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__message = new ObservedPropertySimplePU('Hello World', this, "message");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__message.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    aboutToAppear() {
        console.info('[LOCAL_TEST] START');
        let abilityDelegator;
        abilityDelegator = AbilityDelegatorRegistry.getAbilityDelegator();
        let abilityDelegatorArguments;
        abilityDelegatorArguments = AbilityDelegatorRegistry.getArguments();
        abilityDelegatorArguments.bundleName = "com.example.hummer";
        abilityDelegatorArguments.parameters = {
            "-b": "com.example.hummer",
            "-m": "hummer",
            "-s class": "EventEmitterTest#testOnEmitOff",
            "-s timeout": "15000",
            "-s coverage": "false"
        };
        abilityDelegatorArguments.testCaseNames = "EventEmitterTest#testOnEmitOff";
        console.info("[LOCAL_TEST] " + abilityDelegatorArguments);
        Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite);
        console.info('[LOCAL_TEST] END');
    }
    get message() {
        return this.__message.get();
    }
    set message(newValue) {
        this.__message.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.message);
            Text.fontSize(50);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.type(ButtonType.Capsule);
            Button.margin({
                top: 20
            });
            Button.backgroundColor('#0D9FFB');
            Button.width('35%');
            Button.height('5%');
            Button.onClick(() => {
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('next page');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Button.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName() {
        return "Index1";
    }
}
registerNamedRoute(() => new Index1(undefined, {}), "", { bundleName: "com.example.hummer", moduleName: "hummer", pagePath: "../../../.test/testability/pages/Index" });
//# sourceMappingURL=Index.js.map
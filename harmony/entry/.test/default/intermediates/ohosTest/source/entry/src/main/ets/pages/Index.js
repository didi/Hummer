var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import animator from '@ohos.animator';
import { HMEntrance, HMEntranceController, HarmonyRuntimeContentProvider, EventEmitter } from 'hummer';
import matrix4 from "@ohos.matrix4";
import url from "@ohos.url";
import { renderFunc } from '../unit_test/Comp_Scroller';
import { Template_HelloWorld } from '../template/Template_HelloWorld';
import { Template_Comp_View } from '../template/Template_Comp_View';
import { Template_Comp_Text } from '../template/Template_Comp_Text';
import { Template_Comp_Button } from '../template/Template_Comp_Button';
import { Template_Comp_Image } from '../template/Template_Comp_Image';
import { Template_Comp_Input } from '../template/Template_Comp_Input';
import { Template_Comp_Dialog } from '../template/Template_Comp_Dialog';
import { Template_Comp_Toast } from '../template/Template_Comp_Toast';
import { Template_Comp_View_Layout } from '../template/Template_Comp_View_Layout';
import { Template_Comp_Scroller } from '../template/Template_Comp_Scroller';
import { Template_Comp_View_Child } from '../template/Template_Comp_View_Child';
import { Template_Comp_RichText } from '../template/Template_Comp_RichText';
import { Template_Comp_View_Deg } from '../template/Template_Comp_View_Deg';
import { Template_Comp_Navigator_Page1 } from '../template/Template_Comp_Navigator_Page1';
import { Template_Comp_Navigator_Page2 } from '../template/Template_Comp_Navigator_Page2';
import { Template_Comp_Navigator_Page3 } from '../template/Template_Comp_Navigator_Page3';
import { Template_Module_Lifecycle } from '../template/Template_Module_Lifecycle';
import { Template_Module_Memory } from '../template/Template_Module_Memory';
import { Template_Module_Storage } from '../template/Template_Module_Storage';
import { Template_Module_Request } from '../template/Template_Module_Request';
import { Template_Module_Timer } from '../template/Template_Module_Timer';
import { Template_Module_NotifyCenter } from '../template/Template_Module_NotifyCenter';
import { Template_Comp_Animation } from '../template/Template_Comp_Animation';
import { Template_Comp_Canvas } from '../template/Template_Comp_Canvas';
import { Template_Comp_HorizontalScroller } from '../template/Template_Comp_HorizontalScroller';
import { Template_Comp_Image_base64 } from '../template/Template_Comp_Image_base64';
import { Template_Comp_Input_Type } from '../template/Template_Comp_Input_Type';
import { Template_Comp_Layout } from '../template/Template_Comp_Layout';
import { Template_Comp_List } from '../template/Template_Comp_List';
import { Template_Comp_Transform } from '../template/Template_Comp_Transform';
import { Template_Comp_View_Touch } from '../template/Template_Comp_View_Touch';
import { Template_Module_WebSocket } from '../template/Template_Module_WebSocket';
import { Template_Test_Env } from '../template/Template_Test_Env';
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageInfos = new ObservedPropertyObjectPU(new NavPathStack(), this, "pageInfos");
        this.__title = new ObservedPropertySimplePU('test', this, "title");
        this.__color = new ObservedPropertySimplePU(Color.Red, this, "color");
        this.__trans = new ObservedPropertyObjectPU(matrix4.identity(), this, "trans");
        this.controller = new HMEntranceController();
        this.flag = false;
        this.flag2 = false;
        this.p = 'test2';
        this.test = ['测试测试', '测试测试', '测试测试', '测试测试', '测试测试'];
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.trans !== undefined) {
            this.trans = params.trans;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
        if (params.flag2 !== undefined) {
            this.flag2 = params.flag2;
        }
        if (params.p !== undefined) {
            this.p = params.p;
        }
        if (params.test !== undefined) {
            this.test = params.test;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageInfos.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__color.purgeDependencyOnElmtId(rmElmtId);
        this.__trans.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageInfos.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__color.aboutToBeDeleted();
        this.__trans.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get pageInfos() {
        return this.__pageInfos.get();
    }
    set pageInfos(newValue) {
        this.__pageInfos.set(newValue);
    }
    get title() {
        return this.__title.get();
    }
    set title(newValue) {
        this.__title.set(newValue);
    }
    get color() {
        return this.__color.get();
    }
    set color(newValue) {
        this.__color.set(newValue);
    }
    get trans() {
        return this.__trans.get();
    }
    set trans(newValue) {
        this.__trans.set(newValue);
    }
    // test:Array<string> = ['测试测试测试测试','测试测试测试测试','测试测试测试测试','测试测试测试测试','测试测试测试测试','测试测试测试测试','测试测试测试测试','测试测试测试测试','测试测试测试测试']
    aboutToAppear() {
        const res = new Array();
        const emitter = new EventEmitter();
        const callback = (num) => {
            res.push(num);
        };
        const fn = emitter.on('test', callback);
        emitter.emit('test', 1);
        let listeners = emitter._TestOnlyGetCallback('test');
        let equal = callback == listeners[0];
        console.log(listeners.toString());
        fn();
        listeners = emitter._TestOnlyGetCallback('test');
        console.log(listeners.toString());
        emitter.emit('test', 2);
        console.log(res.toString());
    }
    aboutToDisappear() {
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageInfos);
            Navigation.hideTitleBar(true);
            Navigation.title('NavIndex');
            Navigation.navDestination({ builder: this.PageMap.bind(this) });
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('100%');
            __Common__.height('100%');
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // Image($rawfile(this.p))
                    HMEntrance(this, {
                        controller: this.controller,
                        pageData: {
                            pageInfo: undefined,
                            navStack: this.pageInfos,
                        },
                        contentProvider: new HarmonyRuntimeContentProvider(renderFunc)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 85 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            controller: this.controller,
                            pageData: {
                                pageInfo: undefined,
                                navStack: this.pageInfos,
                            },
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
        Navigation.pop();
    }
    PageMap(name, param, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
            If.create();
            if ((_a = param.pageInfo) === null || _a === void 0 ? void 0 : _a.url.includes("HelloWorld.js")) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_HelloWorld(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 104 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_HelloWorld" });
                    }
                });
            }
            else if ((_b = param.pageInfo) === null || _b === void 0 ? void 0 : _b.url.includes("Comp_View.js")) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_View(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 106 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_View" });
                    }
                });
            }
            else if ((_c = param.pageInfo) === null || _c === void 0 ? void 0 : _c.url.includes("Comp_View_Layout.js")) {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_View_Layout(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 108 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_View_Layout" });
                    }
                });
            }
            else if ((_d = param.pageInfo) === null || _d === void 0 ? void 0 : _d.url.includes("Comp_View_Child.js")) {
                this.ifElseBranchUpdateFunction(3, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_View_Child(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 110 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_View_Child" });
                    }
                });
            }
            else if ((_e = param.pageInfo) === null || _e === void 0 ? void 0 : _e.url.includes("Comp_View_Deg.js")) {
                this.ifElseBranchUpdateFunction(4, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_View_Deg(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 112 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_View_Deg" });
                    }
                });
            }
            else if ((_f = param.pageInfo) === null || _f === void 0 ? void 0 : _f.url.includes("Comp_View_Touch.js")) {
                this.ifElseBranchUpdateFunction(5, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_View_Touch(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 114 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_View_Touch" });
                    }
                });
            }
            else if ((_g = param.pageInfo) === null || _g === void 0 ? void 0 : _g.url.includes("Comp_Text.js")) {
                this.ifElseBranchUpdateFunction(6, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Text(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 116 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Text" });
                    }
                });
            }
            else if ((_h = param.pageInfo) === null || _h === void 0 ? void 0 : _h.url.includes("Comp_RichText.js")) {
                this.ifElseBranchUpdateFunction(7, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_RichText(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 118 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_RichText" });
                    }
                });
            }
            else if ((_j = param.pageInfo) === null || _j === void 0 ? void 0 : _j.url.includes("Comp_Button.js")) {
                this.ifElseBranchUpdateFunction(8, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Button(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 120 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Button" });
                    }
                });
            }
            else if ((_k = param.pageInfo) === null || _k === void 0 ? void 0 : _k.url.includes("Comp_Image.js")) {
                this.ifElseBranchUpdateFunction(9, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Image(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 122 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Image" });
                    }
                });
            }
            else if ((_l = param.pageInfo) === null || _l === void 0 ? void 0 : _l.url.includes("Comp_Image_base64.js")) {
                this.ifElseBranchUpdateFunction(10, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Image_base64(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 124 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Image_base64" });
                    }
                });
            }
            else if ((_m = param.pageInfo) === null || _m === void 0 ? void 0 : _m.url.includes("Comp_Input.js")) {
                this.ifElseBranchUpdateFunction(11, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Input(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 126 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Input" });
                    }
                });
            }
            else if ((_o = param.pageInfo) === null || _o === void 0 ? void 0 : _o.url.includes("Comp_Input_Type.js")) {
                this.ifElseBranchUpdateFunction(12, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Input_Type(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 128 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Input_Type" });
                    }
                });
            }
            else if ((_p = param.pageInfo) === null || _p === void 0 ? void 0 : _p.url.includes("Comp_Scroller.js")) {
                this.ifElseBranchUpdateFunction(13, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Scroller(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 130 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Scroller" });
                    }
                });
            }
            else if ((_q = param.pageInfo) === null || _q === void 0 ? void 0 : _q.url.includes("Comp_HorizontalScroller.js")) {
                this.ifElseBranchUpdateFunction(14, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_HorizontalScroller(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 132 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_HorizontalScroller" });
                    }
                });
            }
            else if ((_r = param.pageInfo) === null || _r === void 0 ? void 0 : _r.url.includes("Comp_List.js")) {
                this.ifElseBranchUpdateFunction(15, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_List(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 134 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_List" });
                    }
                });
            }
            else if ((_s = param.pageInfo) === null || _s === void 0 ? void 0 : _s.url.includes("Comp_Layout.js")) {
                this.ifElseBranchUpdateFunction(16, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Layout(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 136 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Layout" });
                    }
                });
            }
            else if ((_t = param.pageInfo) === null || _t === void 0 ? void 0 : _t.url.includes("Comp_Dialog.js")) {
                this.ifElseBranchUpdateFunction(17, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Dialog(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 138 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Dialog" });
                    }
                });
            }
            else if ((_u = param.pageInfo) === null || _u === void 0 ? void 0 : _u.url.includes("Comp_Toast.js")) {
                this.ifElseBranchUpdateFunction(18, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Toast(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 140 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Toast" });
                    }
                });
            }
            else if ((_v = param.pageInfo) === null || _v === void 0 ? void 0 : _v.url.includes("Comp_Navigator_Page1.js")) {
                this.ifElseBranchUpdateFunction(19, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Navigator_Page1(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 142 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Navigator_Page1" });
                    }
                });
            }
            else if ((_w = param.pageInfo) === null || _w === void 0 ? void 0 : _w.url.includes("Comp_Navigator_Page2.js")) {
                this.ifElseBranchUpdateFunction(20, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Navigator_Page2(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 144 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Navigator_Page2" });
                    }
                });
            }
            else if ((_x = param.pageInfo) === null || _x === void 0 ? void 0 : _x.url.includes("Comp_Navigator_Page3.js")) {
                this.ifElseBranchUpdateFunction(21, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Navigator_Page3(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 146 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Navigator_Page3" });
                    }
                });
            }
            else if ((_y = param.pageInfo) === null || _y === void 0 ? void 0 : _y.url.includes("Comp_Animation.js")) {
                this.ifElseBranchUpdateFunction(22, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Animation(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 148 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Animation" });
                    }
                });
            }
            else if ((_z = param.pageInfo) === null || _z === void 0 ? void 0 : _z.url.includes("Comp_Transform.js")) {
                this.ifElseBranchUpdateFunction(23, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Transform(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 150 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Transform" });
                    }
                });
            }
            else if ((_0 = param.pageInfo) === null || _0 === void 0 ? void 0 : _0.url.includes("Comp_Canvas.js")) {
                this.ifElseBranchUpdateFunction(24, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Comp_Canvas(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 152 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Comp_Canvas" });
                    }
                });
            }
            else if ((_1 = param.pageInfo) === null || _1 === void 0 ? void 0 : _1.url.includes("Module_Lifecycle.js")) {
                this.ifElseBranchUpdateFunction(25, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Module_Lifecycle(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 154 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Module_Lifecycle" });
                    }
                });
            }
            else if ((_2 = param.pageInfo) === null || _2 === void 0 ? void 0 : _2.url.includes("Module_Memory.js")) {
                this.ifElseBranchUpdateFunction(26, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Module_Memory(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 156 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Module_Memory" });
                    }
                });
            }
            else if ((_3 = param.pageInfo) === null || _3 === void 0 ? void 0 : _3.url.includes("Module_Storage.js")) {
                this.ifElseBranchUpdateFunction(27, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Module_Storage(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 158 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Module_Storage" });
                    }
                });
            }
            else if ((_4 = param.pageInfo) === null || _4 === void 0 ? void 0 : _4.url.includes("Module_Request.js")) {
                this.ifElseBranchUpdateFunction(28, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Module_Request(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 160 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Module_Request" });
                    }
                });
            }
            else if ((_5 = param.pageInfo) === null || _5 === void 0 ? void 0 : _5.url.includes("Module_Timer.js")) {
                this.ifElseBranchUpdateFunction(29, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Module_Timer(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 162 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Module_Timer" });
                    }
                });
            }
            else if ((_6 = param.pageInfo) === null || _6 === void 0 ? void 0 : _6.url.includes("Module_NotifyCenter.js")) {
                this.ifElseBranchUpdateFunction(30, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Module_NotifyCenter(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 164 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Module_NotifyCenter" });
                    }
                });
            }
            else if ((_7 = param.pageInfo) === null || _7 === void 0 ? void 0 : _7.url.includes("Module_WebSocket.js")) {
                this.ifElseBranchUpdateFunction(31, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Module_WebSocket(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 166 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Module_WebSocket" });
                    }
                });
            }
            else if ((_8 = param.pageInfo) === null || _8 === void 0 ? void 0 : _8.url.includes("Test_Env.js")) {
                this.ifElseBranchUpdateFunction(32, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Template_Test_Env(this, { pageData: param }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 168 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        pageData: param
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "Template_Test_Env" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(33, () => {
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName() {
        return "Index";
    }
}
let Model = class Model {
    constructor(name) {
        this.name = name;
    }
};
Model = __decorate([
    Observed
], Model);
class MyDataSource {
    constructor() {
        this.listeners = [];
        this.datas = [];
        for (let index = 0; index < 100; index++) {
            let model = new Model('didi' + index);
            this.datas.push(model);
        }
    }
    totalCount() {
        return 2;
    }
    getData(index) {
        return this.datas[index];
    }
    registerDataChangeListener(listener) {
        if (this.listeners.indexOf(listener) < 0) {
            this.listeners.push(listener);
        }
    }
    unregisterDataChangeListener(listener) {
        const position = this.listeners.indexOf(listener);
        if (position >= 0) {
            this.listeners.splice(position, 1);
        }
    }
    notifyDataChange(index) {
        this.listeners.forEach((listener) => {
            listener.onDataChange(index);
        });
    }
    reload() {
        this.listeners.forEach((listener) => {
            listener.onDataReloaded();
        });
    }
}
function ListItemView(data, parent = null) {
    const __data__ = data;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, data = __data__) => {
        Column.create();
        Column.margin({ left: 10, right: 10 });
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, data = __data__) => {
        Text.create(data.name);
        Text.fontSize(50);
        Text.onAppear(() => {
            // console.info("appear:" + name.message)
        });
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, data = __data__) => {
        Image.create('https://pics5.baidu.com/feed/96dda144ad345982388c07eb677393a5caef84d1.jpeg?token=107954507c353194c02ec41b734b1762');
        Image.width(500);
        Image.height(200);
    }, Image);
    Column.pop();
}
class ListItemView2 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__data = new SynchedPropertyNesedObjectPU(params.data, this, "data");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        this.__data.set(params.data);
    }
    updateStateVars(params) {
        this.__data.set(params.data);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__data.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__data.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get data() {
        return this.__data.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ left: 10, right: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.data.name);
            Text.fontSize(50);
            Text.onAppear(() => {
                // console.info("appear:" + name.message)
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create('https://pics5.baidu.com/feed/96dda144ad345982388c07eb677393a5caef84d1.jpeg?token=107954507c353194c02ec41b734b1762');
            Image.width(500);
            Image.height(200);
        }, Image);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class LazyDemo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.data = new MyDataSource();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.data !== undefined) {
            this.data = params.data;
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('change item');
            Button.onClick(() => {
                let model = this.data.getData(1);
                model.name = model.name + '0';
                this.data.reload();
            });
            Button.width(100);
            Button.height(100);
        }, Button);
        Button.pop();
        {
            const __lazyForEachItemGenFunction = _item => {
                const item = _item;
                // ListItemView2({ data:item });
                ListItemView.bind(this)(item);
            };
            const __lazyForEachItemIdFunc = (item) => {
                return item.name;
            };
            LazyForEach.create("1", this, this.data, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class Demo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.view1Callback = undefined;
        this.view2Callback = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.view1Callback !== undefined) {
            this.view1Callback = params.view1Callback;
        }
        if (params.view2Callback !== undefined) {
            this.view2Callback = params.view2Callback;
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
        this.view1Callback = () => {
            console.log("view1 tap");
        };
        this.view2Callback = () => {
            console.log("view2 tap");
        };
    }
    initialRender() {
        // View({tapAction:this.view1Callback}){
        //   View({longPress:this.view2Callback});
        // }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class AnimatorTest extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.TAG = '[AnimatorTest]';
        this.backAnimator = undefined;
        this.flag = false;
        this.__wid = new ObservedPropertySimplePU(100, this, "wid");
        this.__hei = new ObservedPropertySimplePU(200, this, "hei");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.TAG !== undefined) {
            this.TAG = params.TAG;
        }
        if (params.backAnimator !== undefined) {
            this.backAnimator = params.backAnimator;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
        if (params.wid !== undefined) {
            this.wid = params.wid;
        }
        if (params.hei !== undefined) {
            this.hei = params.hei;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__wid.purgeDependencyOnElmtId(rmElmtId);
        this.__hei.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__wid.aboutToBeDeleted();
        this.__hei.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get wid() {
        return this.__wid.get();
    }
    set wid(newValue) {
        this.__wid.set(newValue);
    }
    get hei() {
        return this.__hei.get();
    }
    set hei(newValue) {
        this.__hei.set(newValue);
    }
    create() {
        let _this = this;
        this.backAnimator = animator.create({
            duration: 2000,
            easing: "ease",
            delay: 0,
            fill: "forwards",
            direction: "normal",
            iterations: 1,
            begin: 100,
            end: 200
        });
        this.backAnimator.onfinish = () => {
            _this.flag = true;
            console.info(_this.TAG, 'backAnimator onfinish');
        };
        this.backAnimator.onrepeat = () => {
            console.info(_this.TAG, 'backAnimator repeat');
        };
        this.backAnimator.oncancel = () => {
            console.info(_this.TAG, 'backAnimator cancel');
        };
        /// 需要动画的属性是动态的， 目前视图的样式通过 属性修改期设置。 .animator 在每一帧进行属性设置，会不会有性能问题
        this.backAnimator.onframe = (value) => {
            console.log('onframe', value);
            _this.wid = value;
            _this.hei = value;
        };
    }
    aboutToDisappear() {
        // 由于backAnimator在onframe中引用了this, this中保存了backAnimator，
        // 在自定义组件消失时应该将保存在组件中的backAnimator置空，避免内存泄漏
        this.backAnimator = undefined;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(300);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.wid);
            Column.height(this.hei);
            Column.backgroundColor(Color.Red);
        }, Column);
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('create');
            Button.fontSize(30);
            Button.fontColor(Color.Black);
            Button.onClick(() => {
                this.create();
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('play');
            Button.fontSize(30);
            Button.fontColor(Color.Black);
            Button.onClick(() => {
                this.flag = false;
                if (this.backAnimator) {
                    this.backAnimator.play();
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('pause');
            Button.fontSize(30);
            Button.fontColor(Color.Black);
            Button.onClick(() => {
                if (this.backAnimator) {
                    this.backAnimator.pause();
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('finish');
            Button.fontSize(30);
            Button.fontColor(Color.Black);
            Button.onClick(() => {
                this.flag = true;
                if (this.backAnimator) {
                    this.backAnimator.finish();
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('reverse');
            Button.fontSize(30);
            Button.fontColor(Color.Black);
            Button.onClick(() => {
                this.flag = false;
                if (this.backAnimator) {
                    this.backAnimator.reverse();
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('cancel');
            Button.fontSize(30);
            Button.fontColor(Color.Black);
            Button.onClick(() => {
                if (this.backAnimator) {
                    this.backAnimator.cancel();
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('reset');
            Button.fontSize(30);
            Button.fontColor(Color.Black);
            Button.onClick(() => {
                if (this.flag) {
                    this.flag = false;
                    if (this.backAnimator) {
                        this.backAnimator.reset({
                            duration: 3000,
                            easing: "ease-in",
                            delay: 0,
                            fill: "forwards",
                            direction: "alternate",
                            iterations: 3,
                            begin: 100,
                            end: 300
                        });
                    }
                }
                else {
                    console.info(this.TAG, 'Animation not ended');
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.hummer", moduleName: "entry", pagePath: "pages/Index" });
//# sourceMappingURL=Index.js.map
import { ComponentName } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ComponentName";
import type { Node } from '../Node';
import type { HMContext } from '../../Context/HMContext';
import HMImage from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/Image";
import HMScroller from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/Scroller";
import View from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/View";
import HMButton from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/Button";
import HMTextInput from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/TextInput";
import HMTextArea from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/TextArea";
import HMText from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/Text";
import HMList from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/List";
import HMSwiper from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/ets/Swiper";
export type ComponentWrappedBuilder = WrappedBuilder<[
    ctx: ComponentBuilderContext
]>;
export interface ComponentBuilderContext {
    hmContext: HMContext;
    tag: string;
    node: Node;
    customComponentBuilder: ComponentWrappedBuilder;
}
export function componentFactoryBuilder(ctx: ComponentBuilderContext, parent = null) {
    const __ctx__ = ctx;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
        If.create();
        if (ctx.tag === ComponentName.View) {
            (parent ? parent : this).ifElseBranchUpdateFunction(0, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new View(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 28 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "View" });
                }
            });
        }
        else if (ctx.tag === ComponentName.Image) {
            (parent ? parent : this).ifElseBranchUpdateFunction(1, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMImage(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 30 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMImage" });
                }
            });
        }
        else if (ctx.tag === ComponentName.Scroller) {
            (parent ? parent : this).ifElseBranchUpdateFunction(2, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMScroller(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 32 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMScroller" });
                }
            });
        }
        else if (ctx.tag === ComponentName.Button) {
            (parent ? parent : this).ifElseBranchUpdateFunction(3, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMButton(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 34 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMButton" });
                }
            });
        }
        else if (ctx.tag === ComponentName.Scroller) {
            (parent ? parent : this).ifElseBranchUpdateFunction(4, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx,
                                    scrollDirection: ScrollDirection.Vertical
                                };
                            };
                            ViewPU.create(new HMScroller(parent ? parent : this, { builderContext: ctx, scrollDirection: ScrollDirection.Vertical }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 36 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMScroller" });
                }
            });
        }
        else if (ctx.tag === ComponentName.HorizontalScroller) {
            (parent ? parent : this).ifElseBranchUpdateFunction(5, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx,
                                    scrollDirection: ScrollDirection.Horizontal
                                };
                            };
                            ViewPU.create(new HMScroller(parent ? parent : this, { builderContext: ctx, scrollDirection: ScrollDirection.Horizontal }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 38 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMScroller" });
                }
            });
        }
        else if (ctx.tag === ComponentName.TextInput) {
            (parent ? parent : this).ifElseBranchUpdateFunction(6, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMTextInput(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 40 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMTextInput" });
                }
            });
        }
        else if (ctx.tag === ComponentName.TextArea) {
            (parent ? parent : this).ifElseBranchUpdateFunction(7, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMTextArea(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 42 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMTextArea" });
                }
            });
        }
        else if (ctx.tag === ComponentName.Text) {
            (parent ? parent : this).ifElseBranchUpdateFunction(8, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMText(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 44 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMText" });
                }
            });
        }
        else if (ctx.tag === ComponentName.List) {
            (parent ? parent : this).ifElseBranchUpdateFunction(9, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMList(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 46 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMList" });
                }
            });
        }
        else if (ctx.tag === ComponentName.Swiper) {
            (parent ? parent : this).ifElseBranchUpdateFunction(10, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMSwiper(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/Components/ets/ComponentBuilder.ets", line: 48 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMSwiper" });
                }
            });
        }
        else if (ctx.tag !== '') {
            (parent ? parent : this).ifElseBranchUpdateFunction(11, () => {
                ctx.customComponentBuilder.builder.bind(this)(ctx);
            });
        }
        else {
            this.ifElseBranchUpdateFunction(12, () => {
            });
        }
    }, If);
    If.pop();
}

import { ImageTag, ViewTag } from "@bundle:com.example.hummer/entry/src/main/Hummer/components/ComponentName";
import type { Node } from '../components/Node';
import type { HMContext } from '../Context/HMContext';
import HMImage from "@bundle:com.example.hummer/entry/src/main/Hummer/ets-components/Image";
import View from "@bundle:com.example.hummer/entry/src/main/Hummer/ets-components/View";
export interface ComponentBuilderContext {
    hmContext: HMContext;
    tag: string;
    node: Node;
    customComponentBuilder: WrappedBuilder<[
        ctx: ComponentBuilderContext
    ]>;
}
export function componentFactoryBuilder(ctx: ComponentBuilderContext, parent = null) {
    const __ctx__ = ctx;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
        If.create();
        if (ctx.tag === ViewTag) {
            (parent ? parent : this).ifElseBranchUpdateFunction(0, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new View(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/ets-components/ComponentBuilder.ets", line: 18 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "View" });
                }
            });
        }
        else if (ctx.tag === ImageTag) {
            (parent ? parent : this).ifElseBranchUpdateFunction(1, () => {
                {
                    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, ctx = __ctx__) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {
                                    builderContext: ctx
                                };
                            };
                            ViewPU.create(new HMImage(parent ? parent : this, { builderContext: ctx }, undefined, elmtId, paramsLambda, { page: "entry/src/main/Hummer/ets-components/ComponentBuilder.ets", line: 20 }));
                        }
                        else {
                            (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HMImage" });
                }
            });
        }
        else if (ctx.tag !== '') {
            (parent ? parent : this).ifElseBranchUpdateFunction(2, () => {
                ctx.customComponentBuilder.builder.bind(this)(ctx);
            });
        }
        else {
            this.ifElseBranchUpdateFunction(3, () => {
            });
        }
    }, If);
    If.pop();
}

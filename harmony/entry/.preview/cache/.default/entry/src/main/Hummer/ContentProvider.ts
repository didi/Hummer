import type { HMContext } from './Context/HMContext';
import type { fn } from './Utils/Utils';
export interface IContentProvider {
    render(context: HMContext);
}
export class HarmonyRuntimeContentProvider implements IContentProvider {
    private renderFunc: fn;
    constructor(renderFunc: fn) {
        this.renderFunc = renderFunc;
    }
    render(context: HMContext) {
        this.renderFunc(context.harmonyRuntime.hummerObject, context.harmonyRuntime.globalObject);
    }
}
export class HummerCoreContentProvider implements IContentProvider {
    private renderFunc: fn;
    constructor(renderFunc: fn) {
        this.renderFunc = renderFunc;
    }
    render(context: HMContext) {
        this.renderFunc(context.harmonyRuntime.hummerObject, context.harmonyRuntime.globalObject);
    }
}

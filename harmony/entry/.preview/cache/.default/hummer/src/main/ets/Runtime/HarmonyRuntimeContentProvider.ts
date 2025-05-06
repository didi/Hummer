import type { HMContext } from '../Context/HMContext';
import type { IContentProvider } from '../Interface/IContentProvider';
import type { fn } from '../Utils/Utils';
export class HarmonyRuntimeContentProvider implements IContentProvider {
    private renderFunc: fn;
    constructor(renderFunc: fn) {
        this.renderFunc = renderFunc;
    }
    render(context: HMContext) {
        this.renderFunc(context.harmonyRuntime.hummerObject, context.harmonyRuntime.globalObject);
    }
}

export class HarmonyRuntimeContentProvider {
    constructor(renderFunc) {
        this.renderFunc = renderFunc;
    }
    render(context) {
        this.renderFunc(context.harmonyRuntime.hummerObject, context.harmonyRuntime.globalObject);
    }
}
//# sourceMappingURL=HarmonyRuntimeContentProvider.js.map
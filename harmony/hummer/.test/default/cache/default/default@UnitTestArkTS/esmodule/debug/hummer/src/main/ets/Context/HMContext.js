import { HarmonyRuntime } from '@bundle:com.example.hummer/hummer/ets/Runtime/HarmonyRuntime';
import { DefaultConfig } from '@bundle:com.example.hummer/hummer/ets/Context/Config/Config';
import { EventEmitter } from '@bundle:com.example.hummer/hummer/ets/Context/EventEmitter';
import { setUpEnv } from '@bundle:com.example.hummer/hummer/ets/Components/Module/Env';
// 为了实现所有组件可以在 ets /ts 内实现，因此把 内置组件表 定义在 ets 文件（因为 ets 可以 import ts，反之不行）
// 同时为了实现 HMContext 可以内部闭环内置组件初始化，因此需要把 ets 文件的组件表，设置给 ts 文件，以便以 HMContext.ts 可以访问。
let _provider = undefined;
export function setBuiltinComponentRegistryProvider(provider) {
    _provider = provider;
}
export function getBuiltinComponentRegistry() {
    return _provider();
}
export var HMContextEventType;
(function (HMContextEventType) {
    HMContextEventType["OnReady"] = "OnReady";
    HMContextEventType["RenderSuccess"] = "renderSuccess";
    HMContextEventType["OnError"] = "OnError";
    HMContextEventType["OnException"] = "OnException";
    HMContextEventType["OnDestroy"] = "OnDestroy";
})(HMContextEventType || (HMContextEventType = {}));
export var EngineType;
(function (EngineType) {
    EngineType[EngineType["HummerCore"] = 0] = "HummerCore";
    EngineType[EngineType["HarmonyRuntime"] = 1] = "HarmonyRuntime";
})(EngineType || (EngineType = {}));
export class HMContext {
    constructor(abilityContext, baseUrl = '', engineType, config) {
        this.config = DefaultConfig;
        this.engineType = EngineType.HummerCore;
        this.eventEmitter = new EventEmitter();
        this._baseUrl = '';
        this.id = ++HMContext.ctxId;
        this.abilityContext = abilityContext;
        this._baseUrl = baseUrl;
        if (config) {
            this.config = config;
        }
        this.engineType = engineType;
        if (engineType == EngineType.HummerCore) {
            this.createHummerCoreEngine();
        }
        else {
            this.createHarmonyRuntime();
        }
        setUpEnv(this, (e) => {
            this._env = e;
            this.eventEmitter.emit(HMContextEventType.OnReady);
        });
    }
    //todo: 后续可以抽象 HummerCore 和 HarmonyRuntime 共同接口
    createHarmonyRuntime() {
        this._harmonyRuntime = new HarmonyRuntime(this);
        this._harmonyRuntime.eventEmitter.on(HMContextEventType.RenderSuccess, (renderView) => {
            this.eventEmitter.emit(HMContextEventType.RenderSuccess, renderView);
        });
    }
    createHummerCoreEngine() {
    }
    // bridge 异常
    handleException(e) {
        var _a, _b;
        this.eventEmitter.emit(HMContextEventType.OnException, e);
        (_b = (_a = this.config).exceptionHandler) === null || _b === void 0 ? void 0 : _b.call(_a, this, e);
    }
    // 框架错误
    handleError(e) {
        var _a, _b;
        this.eventEmitter.emit(HMContextEventType.OnError, e);
        (_b = (_a = this.config).errorHandler) === null || _b === void 0 ? void 0 : _b.call(_a, this, e);
    }
    // console
    handleLog() {
    }
    static setRootView(ctx, root) {
        HMContext._rootNodeWeakRef.set(ctx, root);
    }
    static getRootView(ctx) {
        return HMContext._rootNodeWeakRef.get(ctx);
    }
    static deleteRootView(ctx) {
        HMContext._rootNodeWeakRef.delete(ctx);
    }
    get builtinComponentRegistry() {
        return getBuiltinComponentRegistry();
    }
    get rootNode() {
        return HMContext.getRootView(this);
    }
    get useYoga() {
        return false;
    }
    get flexOptimize() {
        return true;
    }
    get harmonyRuntime() {
        return this._harmonyRuntime;
    }
    get env() {
        return this._env;
    }
    get baseUrl() {
        return this._baseUrl;
    }
}
HMContext.ctxId = 0;
HMContext._rootNodeWeakRef = new WeakMap();
//# sourceMappingURL=HMContext.js.map
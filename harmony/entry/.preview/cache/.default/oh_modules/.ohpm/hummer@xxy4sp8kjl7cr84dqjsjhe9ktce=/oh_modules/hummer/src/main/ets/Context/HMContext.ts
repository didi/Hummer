import type { Node } from '../Components/Node';
import { HarmonyRuntime } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Runtime/HarmonyRuntime";
import { DefaultConfig } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Context/Config/Config";
import type { ComponentRegistry, HMContextConfig } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Context/Config/Config";
import { EventEmitter } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Context/EventEmitter";
import type common from "@ohos:app.ability.common";
import type { RootNode } from '../Components/RootNode';
import { setUpEnv } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Env";
import type { Env } from "@package:pkg_modules/.ohpm/hummer@xxy4sp8kjl7cr84dqjsjhe9ktce=/pkg_modules/hummer/src/main/ets/Components/Module/Env";
// 为了实现所有组件可以在 ets /ts 内实现，因此把 内置组件表 定义在 ets 文件（因为 ets 可以 import ts，反之不行）
// 同时为了实现 HMContext 可以内部闭环内置组件初始化，因此需要把 ets 文件的组件表，设置给 ts 文件，以便以 HMContext.ts 可以访问。
let _provider: () => ComponentRegistry = undefined;
export function setBuiltinComponentRegistryProvider(provider: () => ComponentRegistry) {
    _provider = provider;
}
export function getBuiltinComponentRegistry() {
    return _provider();
}
export enum HMContextEventType {
    OnReady = "OnReady",
    RenderSuccess = "renderSuccess",
    OnError = "OnError",
    OnException = "OnException"
}
export enum EngineType {
    HummerCore = 0,
    HarmonyRuntime = 1
}
export class HMContext {
    public eventEmitter: EventEmitter = new EventEmitter();
    public readonly config: HMContextConfig = DefaultConfig;
    public readonly abilityContext: common.UIAbilityContext;
    public readonly id: number;
    private _env: Env;
    private _harmonyRuntime: HarmonyRuntime;
    public readonly engineType: EngineType = EngineType.HummerCore;
    private static ctxId = 0;
    static _rootNodeWeakRef: WeakMap<HMContext, RootNode> = new WeakMap();
    addDestroyWork(work: () => void) {
        work();
    }
    constructor(abilityContext: common.UIAbilityContext, engineType?: EngineType, config?: HMContextConfig) {
        this.id = ++HMContext.ctxId;
        this.abilityContext = abilityContext;
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
    private createHarmonyRuntime() {
        this._harmonyRuntime = new HarmonyRuntime(this);
        this._harmonyRuntime.eventEmitter.on(HMContextEventType.RenderSuccess, (renderView: Node) => {
            this.eventEmitter.emit(HMContextEventType.RenderSuccess, renderView);
        });
    }
    private createHummerCoreEngine() {
    }
    // 释放NotifyCenter实例
    public removeNotifyCenter: Function = function () {
        console.log("-----组件销毁");
    };
    // bridge 异常
    public handleException(e: string) {
        this.eventEmitter.emit(HMContextEventType.OnException, e);
        this.config.exceptionHandler?.(this, e);
    }
    // 框架错误
    public handleError(e: string) {
        this.eventEmitter.emit(HMContextEventType.OnError, e);
        this.config.errorHandler?.(this, e);
    }
    // console
    public handleLog() {
    }
    public static setRootView(ctx: HMContext, root: RootNode) {
        HMContext._rootNodeWeakRef.set(ctx, root);
    }
    public static getRootView(ctx: HMContext): RootNode | undefined {
        return HMContext._rootNodeWeakRef.get(ctx);
    }
    public static deleteRootView(ctx: HMContext) {
        HMContext._rootNodeWeakRef.delete(ctx);
    }
    get builtinComponentRegistry(): ComponentRegistry {
        return getBuiltinComponentRegistry();
    }
    get rootNode(): RootNode | undefined {
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
    get env(): Env {
        return this._env;
    }
}

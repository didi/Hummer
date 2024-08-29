import { HMNode } from '../Components/Node';
import { HarmonyRuntime } from '../Runtime/HarmonyRuntime';
import { ComponentRegistry, DefaultConfig, HMContextConfig } from './Config/Config';
import { EventEmitter } from './EventEmitter';
import { common } from '@kit.AbilityKit';
import { RootNode } from '../Components/RootNode';
import { Env, setUpEnv } from '../Components/Module/Env';

// 为了实现所有组件可以在 ets /ts 内实现，因此把 内置组件表 定义在 ets 文件（因为 ets 可以 import ts，反之不行）
// 同时为了实现 HMContext 可以内部闭环内置组件初始化，因此需要把 ets 文件的组件表，设置给 ts 文件，以便以 HMContext.ts 可以访问。
let _provider :()=>ComponentRegistry = undefined;
export function setBuiltinComponentRegistryProvider(provider:()=>ComponentRegistry){
  _provider = provider
}

export function getBuiltinComponentRegistry(){
  return _provider();
}

export enum HMContextEventType {
  OnReady = "OnReady",
  RenderSuccess = "renderSuccess",
  OnError = "OnError",
  OnException = "OnException",
  OnDestroy = "OnDestroy"
}

export enum EngineType {
  HummerCore,
  HarmonyRuntime
}

export class HMContext {
  public readonly config:HMContextConfig = DefaultConfig
  public readonly abilityContext : common.UIAbilityContext
  public readonly id : number;
  public readonly engineType : EngineType = EngineType.HummerCore;
  public eventEmitter : EventEmitter = new EventEmitter();

  private _env : Env;
  private _harmonyRuntime:HarmonyRuntime;
  private _baseUrl:string = '';
  private static ctxId = 0;
  static _rootNodeWeakRef:WeakMap<HMContext, RootNode> = new WeakMap();
  constructor(abilityContext : common.UIAbilityContext, baseUrl:string = '', engineType?: EngineType, config?:HMContextConfig) {
    this.id = ++HMContext.ctxId;
    this.abilityContext = abilityContext;
    this._baseUrl = baseUrl;
    if(config){
      this.config = config
    }
    this.engineType = engineType;
    if(engineType == EngineType.HummerCore){

      this.createHummerCoreEngine();
    }else{
      this.createHarmonyRuntime();
    }
    setUpEnv(this,(e)=>{
      this._env = e;
      this.eventEmitter.emit(HMContextEventType.OnReady);
    })
  }


  //todo: 后续可以抽象 HummerCore 和 HarmonyRuntime 共同接口
  private createHarmonyRuntime(){
    this._harmonyRuntime = new HarmonyRuntime(this);
    this._harmonyRuntime.eventEmitter.on(HMContextEventType.RenderSuccess, (renderView:HMNode)=>{
      this.eventEmitter.emit(HMContextEventType.RenderSuccess, renderView);
    })
  }

  private createHummerCoreEngine(){

  }

  // bridge 异常
  public handleException(e:string){

    this.eventEmitter.emit(HMContextEventType.OnException, e);
    this.config.exceptionHandler?.(this,e);
  }

  // 框架错误
  public handleError(e:string){

    this.eventEmitter.emit(HMContextEventType.OnError, e);
    this.config.errorHandler?.(this,e);
  }

  // console
  public handleLog(){

  }

  public static setRootView(ctx:HMContext, root:RootNode) {
    HMContext._rootNodeWeakRef.set(ctx, root);
  }
  public static getRootView(ctx:HMContext) : RootNode | undefined {
    return HMContext._rootNodeWeakRef.get(ctx);
  }
  public static deleteRootView(ctx:HMContext)  {
    HMContext._rootNodeWeakRef.delete(ctx);
  }
  get builtinComponentRegistry() : ComponentRegistry{
    return getBuiltinComponentRegistry();
  }

  get rootNode(): RootNode | undefined {
    return HMContext.getRootView(this);
  }
  get useYoga(){
    return false;
  }
  get flexOptimize(){
    return true;
  }
  get harmonyRuntime(){
    return this._harmonyRuntime;
  }
  get env() : Env{
    return this._env
  }
  get baseUrl(){
    return this._baseUrl;
  }
}
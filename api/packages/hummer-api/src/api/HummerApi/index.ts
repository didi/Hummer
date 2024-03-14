
import { HummerComponent } from "../../HummerComponent"



export type Env = {
    platform: string,
    osVersion: string,
    appVersion: string,
    appName: string,
    statusBarHeight: number
    safeAreaBottom: number
    deviceWidth: number
    deviceHeight: number
    availableWidth: number
    availableHeight: number
    scale: number
}
  
export class HummerApi extends HummerComponent {

    private static instance: HummerApi;

    public constructor(props: any = {}) {
        super("Hummer", props);
    }

    protected static newInstance(): HummerApi {
        return new HummerApi();
    }

    protected static checkInstance() {
        if (!HummerApi.instance) {
            HummerApi.instance = HummerApi.newInstance();
        }
    }

    /**
     * 获取全局env
     *
     */
    static getEnv(): Env {
        HummerApi.checkInstance();
        return HummerApi.instance.getEnv();
    }

    protected getEnv(): Env {
       return this.call("getEnv");
    }

}
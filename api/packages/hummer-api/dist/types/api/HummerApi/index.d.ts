import { HummerComponent } from "../../HummerComponent";
export type Env = {
    platform: string;
    osVersion: string;
    appVersion: string;
    appName: string;
    statusBarHeight: number;
    safeAreaBottom: number;
    deviceWidth: number;
    deviceHeight: number;
    availableWidth: number;
    availableHeight: number;
    scale: number;
};
export declare class HummerApi extends HummerComponent {
    private static instance;
    constructor(props?: any);
    protected static newInstance(): HummerApi;
    protected static checkInstance(): void;
    static getEnv(): Env;
    protected getEnv(): Env;
}

import type { HMContext } from '../../Context/HMContext';
import display from "@ohos:display";
import window from "@ohos:window";
import bundleManager from "@ohos:bundle.bundleManager";
import deviceInfo from "@ohos:deviceInfo";
import type { BusinessError } from "@ohos:base";
import { CallEts } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/CallEts";
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
export function setUpEnv(context: HMContext, callback: (env: Env) => void) {
    // 获取屏幕信息
    let displayClass: display.Display = display.getDefaultDisplaySync();
    // app信息
    let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
    let bundleInfo = bundleManager.getBundleInfoForSelfSync(bundleFlags);
    // 获取规避区域
    let windowClass: window.Window | undefined = undefined;
    window.getLastWindow(context.abilityContext, (err: BusinessError, data) => {
        const errCode: number = err.code;
        if (errCode) {
            context.handleError('Failed to obtain the top window. Cause: ' + JSON.stringify(err));
            return;
        }
        windowClass = data;
        let type = window.AvoidAreaType.TYPE_SYSTEM;
        let avoidArea = windowClass.getWindowAvoidArea(type);
        const env = {
            platform: 'HarmonyOS',
            osVersion: deviceInfo?.osFullName,
            appVersion: bundleInfo?.versionName,
            appName: context.abilityContext.resourceManager.getStringSync(bundleInfo?.appInfo?.labelResource.id),
            statusBarHeight: CallEts.px2vp(avoidArea?.topRect?.height),
            safeAreaBottom: CallEts.px2vp(avoidArea?.bottomRect?.height),
            deviceWidth: CallEts.px2vp(displayClass?.width),
            deviceHeight: CallEts.px2vp(displayClass?.height),
            availableWidth: CallEts.px2vp((displayClass?.width - avoidArea?.leftRect?.width - avoidArea?.rightRect?.width)),
            availableHeight: CallEts.px2vp((displayClass?.height - avoidArea?.topRect?.height - avoidArea?.bottomRect?.height)),
            scale: displayClass?.scaledDensity
        };
        callback(env);
    });
}

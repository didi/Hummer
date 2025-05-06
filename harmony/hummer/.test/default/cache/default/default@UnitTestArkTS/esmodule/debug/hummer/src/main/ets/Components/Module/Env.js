import display from '@ohos:display';
import window from '@ohos:window';
import bundleManager from '@ohos:bundle.bundleManager';
import deviceInfo from '@ohos:deviceInfo';
import { CallEts } from '@bundle:com.example.hummer/hummer/ets/Utils/CallEts';
export function setUpEnv(context, callback) {
    // 获取屏幕信息
    let displayClass = display.getDefaultDisplaySync();
    // app信息
    let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
    let bundleInfo = bundleManager.getBundleInfoForSelfSync(bundleFlags);
    // 获取规避区域
    let windowClass = undefined;
    window.getLastWindow(context.abilityContext, (err, data) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const errCode = err.code;
        if (errCode) {
            context.handleError('Failed to obtain the top window. Cause: ' + JSON.stringify(err));
            return;
        }
        windowClass = data;
        let type = window.AvoidAreaType.TYPE_SYSTEM;
        let avoidArea = windowClass.getWindowAvoidArea(type);
        const env = {
            platform: 'HarmonyOS',
            osVersion: deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo.osFullName,
            appVersion: bundleInfo === null || bundleInfo === void 0 ? void 0 : bundleInfo.versionName,
            appName: context.abilityContext.resourceManager.getStringSync((_a = bundleInfo === null || bundleInfo === void 0 ? void 0 : bundleInfo.appInfo) === null || _a === void 0 ? void 0 : _a.labelResource.id),
            statusBarHeight: CallEts.px2vp((_b = avoidArea === null || avoidArea === void 0 ? void 0 : avoidArea.topRect) === null || _b === void 0 ? void 0 : _b.height),
            safeAreaBottom: CallEts.px2vp((_c = avoidArea === null || avoidArea === void 0 ? void 0 : avoidArea.bottomRect) === null || _c === void 0 ? void 0 : _c.height),
            deviceWidth: CallEts.px2vp(displayClass === null || displayClass === void 0 ? void 0 : displayClass.width),
            deviceHeight: CallEts.px2vp(displayClass === null || displayClass === void 0 ? void 0 : displayClass.height),
            availableWidth: CallEts.px2vp(((displayClass === null || displayClass === void 0 ? void 0 : displayClass.width) - ((_d = avoidArea === null || avoidArea === void 0 ? void 0 : avoidArea.leftRect) === null || _d === void 0 ? void 0 : _d.width) - ((_e = avoidArea === null || avoidArea === void 0 ? void 0 : avoidArea.rightRect) === null || _e === void 0 ? void 0 : _e.width))),
            availableHeight: CallEts.px2vp(((displayClass === null || displayClass === void 0 ? void 0 : displayClass.height) - ((_f = avoidArea === null || avoidArea === void 0 ? void 0 : avoidArea.topRect) === null || _f === void 0 ? void 0 : _f.height) - ((_g = avoidArea === null || avoidArea === void 0 ? void 0 : avoidArea.bottomRect) === null || _g === void 0 ? void 0 : _g.height))),
            scale: displayClass === null || displayClass === void 0 ? void 0 : displayClass.scaledDensity
        };
        callback(env);
    });
}
//# sourceMappingURL=Env.js.map
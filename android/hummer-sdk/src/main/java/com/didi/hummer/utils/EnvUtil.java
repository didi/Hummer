package com.didi.hummer.utils;

import android.content.Context;
import android.os.Build;
import android.text.TextUtils;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.render.utility.DPUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Hummer环境变量帮助类
 *
 * Created by XiaoFeng on 2022/7/12.
 */
public class EnvUtil {

   private static final String ENV_KEY_PLATFORM = "platform";
   private static final String ENV_KEY_OS_VERSION = "osVersion";
   private static final String ENV_KEY_APP_VERSION = "appVersion";
   private static final String ENV_KEY_APP_NAME = "appName";
   private static final String ENV_KEY_STATUS_BAR_HEIGHT = "statusBarHeight";
   private static final String ENV_KEY_SAFE_AREA_BOTTOM = "safeAreaBottom";
   private static final String ENV_KEY_DEVICE_WIDTH = "deviceWidth";
   private static final String ENV_KEY_DEVICE_HEIGHT = "deviceHeight";
   private static final String ENV_KEY_AVAILABLE_WIDTH = "availableWidth";
   private static final String ENV_KEY_AVAILABLE_HEIGHT = "availableHeight";
   private static final String ENV_KEY_SCALE = "scale";
   private static final String ENV_KEY_NAMESPACE = "namespace";

   private static Map<String, Object> gEnvs = new HashMap<>();

   public static void initHummerEnv(Context context) {
      int statusBarHeight = BarUtils.getStatusBarHeight(context);
      int deviceWidth = ScreenUtils.getAppScreenWidth(context);
      int deviceHeight = ScreenUtils.getAppScreenHeight(context);
      int availableWidth = deviceWidth;
      int availableHeight = deviceHeight - statusBarHeight;
      statusBarHeight = DPUtil.px2dp(context, statusBarHeight);
      deviceWidth = DPUtil.px2dp(context, deviceWidth);
      deviceHeight = DPUtil.px2dp(context, deviceHeight);
      availableWidth = DPUtil.px2dp(context, availableWidth);
      availableHeight = DPUtil.px2dp(context, availableHeight);

      gEnvs.clear();
      gEnvs.put(ENV_KEY_PLATFORM, "Android");
      gEnvs.put(ENV_KEY_OS_VERSION, Build.VERSION.RELEASE);
      gEnvs.put(ENV_KEY_APP_NAME, AppUtils.getAppName(context));
      gEnvs.put(ENV_KEY_APP_VERSION, AppUtils.getAppVersionName(context));
      gEnvs.put(ENV_KEY_STATUS_BAR_HEIGHT, statusBarHeight);
      gEnvs.put(ENV_KEY_SAFE_AREA_BOTTOM, 0);
      gEnvs.put(ENV_KEY_DEVICE_WIDTH, deviceWidth);
      gEnvs.put(ENV_KEY_DEVICE_HEIGHT, deviceHeight);
      gEnvs.put(ENV_KEY_AVAILABLE_WIDTH, availableWidth);
      gEnvs.put(ENV_KEY_AVAILABLE_HEIGHT, availableHeight);
      gEnvs.put(ENV_KEY_SCALE, ScreenUtils.getScreenDensity(context));
   }

   public static Map<String, Object> getHummerEnv(Context context, String namespace) {
      if (gEnvs == null || gEnvs.isEmpty()) {
         initHummerEnv(context.getApplicationContext());
      }

      Map<String, Object> envs = new HashMap<>(gEnvs);
      if (!TextUtils.isEmpty(namespace) && !namespace.equals(HummerSDK.NAMESPACE_DEFAULT)) {
         envs.put(ENV_KEY_NAMESPACE, namespace);
      }

      return envs;
   }
}

package com.didi.hummer.utils;

import android.content.Context;
import android.content.res.Resources;
import android.os.Build;
import android.view.ViewConfiguration;

import java.lang.reflect.Method;

/**
 * 底部虚拟导航栏相关帮助类
 *
 * Created by XiaoFeng on 2024/3/5.
 */
public class NavUtil {

   /**
    * 检查是否存在虚拟按键栏
    */
   private static boolean hasNavBar(Context context) {
      Resources res = context.getResources();
      int resourceId = res.getIdentifier("config_showNavigationBar", "bool", "android");
      if (resourceId != 0) {
         boolean hasNav = res.getBoolean(resourceId);
         String sNavBarOverride = getNavBarOverride();
         if ("1".equals(sNavBarOverride)) {
            hasNav = false;
         } else if ("0".equals(sNavBarOverride)) {
            hasNav = true;
         }
         return hasNav;
      } else {
         return !ViewConfiguration.get(context).hasPermanentMenuKey();
      }
   }

   /**
    * 判断虚拟按键栏是否重写
    */
   private static String getNavBarOverride() {
      String sNavBarOverride = null;
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
         try {
            Class c = Class.forName("android.os.SystemProperties");
            Method m = c.getDeclaredMethod("get", String.class);
            m.setAccessible(true);
            sNavBarOverride = (String) m.invoke(null, "qemu.hw.mainkeys");
         } catch (Exception e) {
            e.printStackTrace();
         }
      }
      return sNavBarOverride;
   }

   /**
    * 获取虚拟按键的高度
    */
   public static int getNavigationBarHeight(Context context) {
      int result = 0;
      if (hasNavBar(context)) {
         Resources res = context.getResources();
         int resourceId = res.getIdentifier("navigation_bar_height", "dimen", "android");
         if (resourceId > 0) {
            result = res.getDimensionPixelSize(resourceId);
         }
      }
      return result;
   }
}

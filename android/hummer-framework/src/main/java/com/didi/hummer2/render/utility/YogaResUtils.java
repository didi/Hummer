package com.didi.hummer2.render.utility;

import android.graphics.drawable.Drawable;

import com.didi.hummer2.core.HummerSDK;


public class YogaResUtils {

    /**
     * 通过包名、资源名、文件名 查找资源Id
     *
     * @param pVariableName 文件名
     * @param pResourceName 资源名 e.g. drawable
     * @param pPackageName  包名
     * @return
     * @throws RuntimeException
     */
    public static int getResourceId(String pVariableName, String pResourceName, String pPackageName) throws RuntimeException {
        try {
            if (pPackageName == null) {
                pPackageName = HummerSDK.appContext.getPackageName();
            }
            return HummerSDK.appContext.getResources().getIdentifier(pVariableName, pResourceName, pPackageName);
        } catch (Exception ex) {
            throw new RuntimeException("Error getResourceId by NJContextUtil.getContext()", ex);
        }
    }

    public static Drawable getResourcesDrawable(String pVariableName, String pResourceName, String pPackageName) {
        int imageId = getResourceId(pVariableName, pResourceName, pPackageName);
        if (imageId <= 0) {
            return null;
        }
        return HummerSDK.appContext.getResources().getDrawable(imageId);
    }
}

package com.didi.hummer.utils.blankj;

import android.content.Intent;
import android.content.pm.PackageManager;

import com.didi.hummer.HummerSDK;

/**
 * <pre>
 *     author: Blankj
 *     blog  : http://blankj.com
 *     time  : 2016/09/23
 *     desc  : utils about intent
 * </pre>
 */
public final class IntentUtils {

    private IntentUtils() {
        throw new UnsupportedOperationException("u can't instantiate me...");
    }

    /**
     * Return whether the intent is available.
     *
     * @param intent The intent.
     * @return {@code true}: yes<br>{@code false}: no
     */
    public static boolean isIntentAvailable(final Intent intent) {
        return HummerSDK.appContext
                .getPackageManager()
                .queryIntentActivities(intent, PackageManager.MATCH_DEFAULT_ONLY)
                .size() > 0;
    }
}
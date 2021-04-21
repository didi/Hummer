package com.didi.hummer.tools;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.core.util.HMLog;

/**
 * Created by XiaoFeng on 2019-11-05.
 */
public class JSLogger {

    private static final String TAG = "HummerJS";

    public interface Logger {

        int VERBOSE     = 1;
        int DEBUG       = 2;
        int INFO        = 3;
        int WARN        = 4;
        int ERROR       = 5;

        void log(int level, String msg);
    }

    public static void log(String namespace, String msg) {
        HMLog.v(TAG, msg);
        printLog(namespace, Logger.VERBOSE, msg);
    }

    public static void debug(String namespace, String msg) {
        HMLog.d(TAG, msg);
        printLog(namespace, Logger.DEBUG, msg);
    }

    public static void info(String namespace, String msg) {
        HMLog.i(TAG, msg);
        printLog(namespace, Logger.INFO, msg);
    }

    public static void warn(String namespace, String msg) {
        HMLog.w(TAG, msg);
        printLog(namespace, Logger.WARN, msg);
    }

    public static void error(String namespace, String msg) {
        HMLog.e(TAG, msg);
        printLog(namespace, Logger.ERROR, msg);
    }

    private static void printLog(String namespace, int level, String msg) {
        Logger logger = HummerSDK.getJSLogger(namespace);
        if (logger != null) {
            logger.log(level, msg);
        }
    }
}

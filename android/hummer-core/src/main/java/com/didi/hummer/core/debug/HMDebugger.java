package com.didi.hummer.core.debug;

import android.util.LongSparseArray;

import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.HMLog;

/**
 * 用于调试的单例工具类，管理各个页面的InvokerAnalyzer
 * <p>
 * Created by XiaoFeng on 2020/4/28.
 */
public class HMDebugger {

    private static volatile HMDebugger instance = null;

    private LongSparseArray<InvokerAnalyzer> analyzers = new LongSparseArray<>();

    private HMDebugger() {}

    public static HMDebugger getInstance() {
        if (instance == null) {
            synchronized (HMDebugger.class) {
                if (instance == null) {
                    instance = new HMDebugger();
                }
            }
        }

        return instance;
    }

    public void init(long jsContext) {
        if (!DebugUtil.isDebuggable()) {
            return;
        }

        InvokerAnalyzer analyzer = analyzers.get(jsContext);
        if (analyzer == null) {
            analyzer = new InvokerAnalyzer();
            analyzers.put(jsContext, analyzer);
        }
    }

    public void release(long jsContext) {
        if (!DebugUtil.isDebuggable()) {
            return;
        }
        analyzers.remove(jsContext);
    }

    public InvokeTracker startTrack(long jsContext) {
        if (!DebugUtil.isDebuggable()) {
            return null;
        }

        try {
            InvokerAnalyzer analyzer = analyzers.get(jsContext);
            if (analyzer != null) {
                return analyzer.startTrack();
            }
        } catch (Exception e) {
            HMLog.e("HummerDebug", "startTrack, e = ", e);
        }
        return null;
    }

    public void stopTrack(long jsContext, InvokeTracker tracker) {
        if (!DebugUtil.isDebuggable()) {
            return;
        }

        try {
            InvokerAnalyzer analyzer = analyzers.get(jsContext);
            if (analyzer != null) {
                analyzer.stopTrack(tracker);
            }
        } catch (Exception e) {
            HMLog.e("HummerDebug", "stopTrack, e = ", e);
        }
    }

    public String getComponentTreeFormat(long jsContext) {
        if (!DebugUtil.isDebuggable()) {
            return "";
        }

        try {
            InvokerAnalyzer analyzer = analyzers.get(jsContext);
            if (analyzer != null) {
                return analyzer.getComponentTreeFormat();
            }
        } catch (Exception e) {
            HMLog.e("HummerDebug", "getComponentTreeFormat, e = ", e);
        }
        return "";
    }

    public String getCallStackTreeFormat(long jsContext) {
        if (!DebugUtil.isDebuggable()) {
            return "";
        }

        try {
            InvokerAnalyzer analyzer = analyzers.get(jsContext);
            if (analyzer != null) {
                return analyzer.getCallStackTreeFormat();
            }
        } catch (Exception e) {
            HMLog.e("HummerDebug", "getCallStackTreeFormat, e = ", e);
        }
        return "";
    }

    public String getPerformanceFormat(long jsContext) {
        if (!DebugUtil.isDebuggable()) {
            return "";
        }

        try {
            InvokerAnalyzer analyzer = analyzers.get(jsContext);
            if (analyzer != null) {
                return analyzer.getPerformanceFormat();
            }
        } catch (Exception e) {
            HMLog.e("HummerDebug", "getPerformanceFormat, e = ", e);
        }
        return "";
    }
}

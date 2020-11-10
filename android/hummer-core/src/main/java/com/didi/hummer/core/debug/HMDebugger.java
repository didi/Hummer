package com.didi.hummer.core.debug;

import android.util.LongSparseArray;

import com.didi.hummer.core.util.DebugUtil;
import com.didi.hummer.core.util.HMLog;

/**
 * 用于调试的单例工具类
 * <p>
 * Created by XiaoFeng on 2020/4/28.
 */
public class HMDebugger {

    private static volatile HMDebugger instance = null;

    private LongSparseArray<PerformanceAnalyzer> performanceAnalyzerMap = new LongSparseArray<>();
    private LongSparseArray<TreeAnalyzer> treeAnalyzerMap = new LongSparseArray<>();

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
        if (DebugUtil.isDebuggable()) {
            PerformanceAnalyzer performanceAnalyzer = performanceAnalyzerMap.get(jsContext);
            if (performanceAnalyzer == null) {
                performanceAnalyzer = new PerformanceAnalyzer();
                performanceAnalyzerMap.put(jsContext, performanceAnalyzer);
            }
            TreeAnalyzer treeAnalyzer = treeAnalyzerMap.get(jsContext);
            if (treeAnalyzer == null) {
                treeAnalyzer = new TreeAnalyzer();
                treeAnalyzerMap.put(jsContext, treeAnalyzer);
            }
        }
    }

    public void release(long jsContext) {
        if (DebugUtil.isDebuggable()) {
            PerformanceAnalyzer performanceAnalyzer = performanceAnalyzerMap.get(jsContext);
            if (performanceAnalyzer != null) {
                performanceAnalyzer.release();
            }
            TreeAnalyzer treeAnalyzer = treeAnalyzerMap.get(jsContext);
            if (treeAnalyzer != null) {
                treeAnalyzer.release();
            }
        }
    }

    public void track(long jsContext, String className, long objectID, String methodName, Object[] parameters) {
        if (DebugUtil.isDebuggable()) {
            TreeAnalyzer analyzer = treeAnalyzerMap.get(jsContext);
            if (analyzer != null) {
                analyzer.track(className, objectID, methodName, parameters);
            }
        }
    }

    public void startRecordTime(long jsContext) {
        if (DebugUtil.isDebuggable()) {
            PerformanceAnalyzer analyzer = performanceAnalyzerMap.get(jsContext);
            if (analyzer != null) {
                analyzer.startRecordTime();
            }
        }
    }

    public void stopRecordTime(long jsContext, String className, String methodName) {
        if (DebugUtil.isDebuggable()) {
            // 这里统计性能统计数据会影响整体性能
            PerformanceAnalyzer analyzer = performanceAnalyzerMap.get(jsContext);
            if (analyzer != null) {
                analyzer.stopRecordTime(className, methodName);
            }
        }
    }

    public void printDebugInfo(long jsContext) {
        if (DebugUtil.isDebuggable()) {
            try {
                PerformanceAnalyzer performanceAnalyzer = performanceAnalyzerMap.get(jsContext);
                if (performanceAnalyzer != null) {
                    performanceAnalyzer.printPerformance();
                }
                TreeAnalyzer treeAnalyzer = treeAnalyzerMap.get(jsContext);
                if (treeAnalyzer != null) {
                    treeAnalyzer.printTrees();
                }
            } catch (Exception e) {
                HMLog.e("HummerDebug", "printDebugInfo Exception", e);
            }
        }
    }

    /**
     * 获取视图树的格式化字符串
     */
    public String getComponentTreeFormat(long jsContext) {
        if (DebugUtil.isDebuggable()) {
            try {
                TreeAnalyzer analyzer = treeAnalyzerMap.get(jsContext);
                if (analyzer != null) {
                    return analyzer.getComponentTreeFormat();
                }
            } catch (Exception e) {
                HMLog.e("HummerDebug", "getComponentTreeFormat Exception", e);
            }
        }
        return "";
    }

    /**
     * 获取函数调用树的格式化字符串
     */
    public String getCallStackTreeFormat(long jsContext) {
        if (DebugUtil.isDebuggable()) {
            try {
                TreeAnalyzer analyzer = treeAnalyzerMap.get(jsContext);
                if (analyzer != null) {
                    return analyzer.getCallStackTreeFormat();
                }
            } catch (Exception e) {
                HMLog.e("HummerDebug", "getCallStackTreeFormat Exception", e);
            }
        }
        return "";
    }

    /**
     * 获取性能相关的格式化字符串
     */
    public String getPerformanceFormat(long jsContext) {
        if (DebugUtil.isDebuggable()) {
            try {
                PerformanceAnalyzer analyzer = performanceAnalyzerMap.get(jsContext);
                if (analyzer != null) {
                    return analyzer.getPerformanceFormat();
                }
            } catch (Exception e) {
                HMLog.e("HummerDebug", "getPerformanceFormat Exception", e);
            }
        }
        return "";
    }
}

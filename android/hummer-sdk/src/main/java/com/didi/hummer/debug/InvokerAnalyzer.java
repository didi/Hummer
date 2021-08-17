package com.didi.hummer.debug;

import android.os.Handler;

import com.didi.hummer.core.util.DebugUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Invoke方法分析器
 *
 * Created by XiaoFeng on 2020/11/6.
 */
public class InvokerAnalyzer {

    private final Handler analyzeHandler;
    private final List<InvokeTracker> invokeTrackerList;
    private final List<PerformanceTracker> perfTrackerList;
    private InvokeTracker curTracker;
    private PerformanceTracker curPerfTracker;
    private boolean isPerformanceTracking;

    public static InvokerAnalyzer init() {
        if (!DebugUtil.isDebuggable()) {
            return null;
        }
        return new InvokerAnalyzer();
    }

    public static void release(InvokerAnalyzer analyzer) {
        if (!DebugUtil.isDebuggable() || analyzer == null) {
            return;
        }
        analyzer.release();
    }

    public static void startTrack(InvokerAnalyzer analyzer, String className, long objectID, String methodName, Object[] params) {
        if (!DebugUtil.isDebuggable() || analyzer == null) {
            return;
        }
        analyzer.startTrack(className, objectID, methodName, params);
    }

    public static void stopTrack(InvokerAnalyzer analyzer) {
        if (!DebugUtil.isDebuggable() || analyzer == null) {
            return;
        }
        analyzer.stopTrack();
    }

    private InvokerAnalyzer() {
        analyzeHandler = new Handler();
        invokeTrackerList = new ArrayList<>();
        perfTrackerList = new ArrayList<>();
    }

    private void release() {
        analyzeHandler.removeCallbacksAndMessages(null);
    }

    private void startTrack(String className, long objectID, String methodName, Object[] params) {
        postAnalyzePerformance();
        curTracker = new InvokeTracker().start(className, objectID, methodName, params);
        invokeTrackerList.add(curTracker);
    }

    private void stopTrack() {
        if (curTracker != null) {
            curTracker.stop();
            if (curPerfTracker != null) {
                curPerfTracker.track(curTracker);
            }
            curTracker = null;
        }
    }

    private void postAnalyzePerformance() {
        if (isPerformanceTracking) {
            return;
        }
        isPerformanceTracking = true;
        curPerfTracker = new PerformanceTracker().start();
        analyzeHandler.post(() -> {
            perfTrackerList.add(curPerfTracker.stop());
            isPerformanceTracking = false;
        });
    }

    public List<InvokeTracker> getInvokeTrackerList() {
        return invokeTrackerList;
    }

    public List<PerformanceTracker> getPerfTrackerList() {
        return perfTrackerList;
    }
}

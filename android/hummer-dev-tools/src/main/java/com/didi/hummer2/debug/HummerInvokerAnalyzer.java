package com.didi.hummer2.debug;

import android.os.Handler;

import java.util.ArrayList;
import java.util.List;

/**
 * Invoke方法分析器
 * <p>
 * Created by XiaoFeng on 2020/11/6.
 */
public class HummerInvokerAnalyzer implements InvokerAnalyzer {

    private final Handler analyzeHandler;
    private final List<InvokeTracker> invokeTrackerList;
    private final List<PerformanceTracker> perfTrackerList;
    private InvokeTracker curTracker;
    private PerformanceTracker curPerfTracker;
    private boolean isPerformanceTracking;

    public HummerInvokerAnalyzer() {
        analyzeHandler = new Handler();
        invokeTrackerList = new ArrayList<>();
        perfTrackerList = new ArrayList<>();
    }

    @Override
    public void release() {
        analyzeHandler.removeCallbacksAndMessages(null);
    }

    @Override
    public void startTrack(String className, long objectID, String methodName, Object[] params) {
        postAnalyzePerformance();
        curTracker = new InvokeTracker().start(className, objectID, methodName, params);
        invokeTrackerList.add(curTracker);
    }

    @Override
    public void stopTrack() {
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

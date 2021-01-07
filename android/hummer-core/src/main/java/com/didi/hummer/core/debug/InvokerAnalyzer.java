package com.didi.hummer.core.debug;

import android.os.Handler;

import com.didi.hummer.core.util.HMLog;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Invoke方法分析器
 *
 * Created by XiaoFeng on 2020/11/6.
 */
public class InvokerAnalyzer {

    private final Handler analyzeHandler;
    private final ExecutorService executor;
    private final List<InvokeTracker> treeTrackerList;
    private final List<InvokeTracker> compTrackerList;
    private final ComponentTreeAnalyzer componentTreeAnalyzer;
    private final CallStackTreeAnalyzer callStackTreeAnalyzer;
    private final PerformanceAnalyzer performanceAnalyzer;

    private boolean isAnalyzePrepared;

    private final static int TREE_ANALYZE_THRESHOLD = 1000;
    private final static int PERFORMANCE_ANALYZE_THRESHOLD = 60;
    private long lastTreeAnalyzeTime = 0;
    private long lastPerformanceAnalyzeTime = 0;

    public InvokerAnalyzer() {
        analyzeHandler = new Handler();
        treeTrackerList = new ArrayList<>();
        compTrackerList = new ArrayList<>();
        executor = Executors.newSingleThreadExecutor();
        componentTreeAnalyzer = new ComponentTreeAnalyzer();
        callStackTreeAnalyzer = new CallStackTreeAnalyzer();
        performanceAnalyzer = new PerformanceAnalyzer();
    }

    public void release() {
        analyzeHandler.removeCallbacksAndMessages(null);
    }

    public InvokeTracker startTrack() {
        prepareAnalyzeIfNeed();
        return new InvokeTracker().begin();
    }

    public void stopTrack(InvokeTracker tracker) {
        track(tracker.end());
    }

    private void prepareAnalyzeIfNeed() {
        if (isAnalyzePrepared) {
            return;
        }
        isAnalyzePrepared = true;

        long startTime = System.nanoTime();
        StackTraceElement[] curStackTrace = Thread.currentThread().getStackTrace();
        compTrackerList.clear();

        analyzeHandler.post(() -> {
            long totalCost = System.nanoTime() - startTime;
            long curTime = System.currentTimeMillis();

            // 限流
            if (curTime - lastTreeAnalyzeTime > TREE_ANALYZE_THRESHOLD) {
                lastTreeAnalyzeTime = curTime;
                analyzeTree();
            }
            if (curTime - lastPerformanceAnalyzeTime > PERFORMANCE_ANALYZE_THRESHOLD) {
                lastPerformanceAnalyzeTime = curTime;
                analyzePerformance(totalCost, getCallFrom(curStackTrace));
            }

            isAnalyzePrepared = false;
        });
    }

    private void track(InvokeTracker tracker) {
        executor.submit(() -> {
            try {
                treeTrackerList.add(tracker);
                compTrackerList.add(tracker);
            } catch (Exception e) {
                HMLog.e("InvokerAnalyzer", "track, e = ", e);
            }
        });
    }

    private void analyzeTree() {
        executor.submit(() -> {
            try {
                componentTreeAnalyzer.analyze(treeTrackerList);
                callStackTreeAnalyzer.analyze(treeTrackerList);
            } catch (Exception e) {
                HMLog.e("InvokerAnalyzer", "analyzeTree, e = ", e);
            }
        });
    }

    private void analyzePerformance(long totalCost, String callFrom) {
        // 这里拷贝一次，是为了下面子线程访问
        List<InvokeTracker> trackerList = new ArrayList<>(compTrackerList);
        executor.submit(() -> {
            try {
                performanceAnalyzer.analyze(trackerList, totalCost, callFrom);
            } catch (Exception e) {
                HMLog.e("InvokerAnalyzer", "analyzePerformance, e = ", e);
            }
        });
    }

    private String getCallFrom(StackTraceElement[] curStackTrace) {
        String callFrom = "";
        int index = 0;
        for (StackTraceElement stackTraceElement : curStackTrace) {
            if (stackTraceElement.toString().contains("JavaScriptRuntime.evaluateJavaScript")) {
                callFrom = "evaluateJavaScript";
            } else if (stackTraceElement.toString().contains("CallbackImpl.call")) {
                if (index + 2 < curStackTrace.length) {
                    callFrom = curStackTrace[index + 2].toString();
                }
            }
            index++;
        }
        return callFrom;
    }

    /**
     * 获取视图树的格式化字符串
     */
    public String getComponentTreeFormat() {
        return componentTreeAnalyzer.getComponentTreeFormat();
    }

    /**
     * 获取函数调用树的格式化字符串
     */
    public String getCallStackTreeFormat() {
        return callStackTreeAnalyzer.getCallStackTreeFormat();
    }

    /**
     * 获取性能相关的格式化字符串
     */
    public String getPerformanceFormat() {
        return performanceAnalyzer.getPerformanceFormat();
    }
}

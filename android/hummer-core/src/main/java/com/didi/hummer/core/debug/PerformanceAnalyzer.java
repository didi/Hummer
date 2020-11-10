package com.didi.hummer.core.debug;

import android.text.TextUtils;

import com.didi.hummer.core.util.HMLog;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 分析并打印影响数据
 *
 * Created by XiaoFeng on 2020/3/13.
 */
public class PerformanceAnalyzer {

    private static final String TAG = "HummerDebug";

    private long startTime;
    private Map<String, TimeCost> firstRenderTimeCostMap = new HashMap<>();
    private Map<String, TimeCost> totalTimeCostMap = new HashMap<>();
    private boolean hasRendered;

    private class TimeCost {
        // 函数调用次数
        int count;
        // 所有函数累计耗时
        long cost;

        public void increase(long timeCost) {
            count++;
            cost += timeCost;
        }
    }

    public void startRecordTime() {
        startTime = System.nanoTime();
    }

    public void stopRecordTime(String className, String methodName) {
        String key = className + "." + methodName;
        TimeCost timeCost = totalTimeCostMap.get(key);
        if (timeCost == null) {
            timeCost = new TimeCost();
            totalTimeCostMap.put(key, timeCost);
        }
        timeCost.increase(System.nanoTime() - startTime);

        if (hasRendered && firstRenderTimeCostMap.isEmpty()) {
            firstRenderTimeCostMap.putAll(totalTimeCostMap);
            hasRendered = false;
        }

        if (key.equals("Hummer.render")) {
            hasRendered = true;
        }
    }

    public void printPerformance() {
        HMLog.d(TAG, " \n" + getPerformanceFormat());
    }

    public String getPerformanceFormat() {
        String totalPerformance = generatePerformance(totalTimeCostMap);
        if (TextUtils.isEmpty(totalPerformance)) {
            return "";
        }

        String firstRenderPerformance = generatePerformance(firstRenderTimeCostMap);
        if (TextUtils.isEmpty(firstRenderPerformance)) {
            return
                "┌─────────────────────────\n" +
                "│\t耗时统计\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                        totalPerformance +
                "└─────────────────────────\n";
        } else {
            return
                "┌─────────────────────────\n" +
                "│\t耗时统计（首次加载）\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                        firstRenderPerformance +
                "└─────────────────────────\n\n" +
                "┌─────────────────────────\n" +
                "│\t耗时统计（总耗时，包括网络刷新等）\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                        totalPerformance +
                "└─────────────────────────\n\n";
        }
    }

    private String generatePerformance(Map<String, TimeCost> timeCostMap) {
        if (timeCostMap == null || timeCostMap.isEmpty()) {
            return null;
        }

        long totalCost = 0;

        // 排序（倒序）
        List<Map.Entry<String, TimeCost>> entryList = new ArrayList<>(timeCostMap.entrySet());
        Collections.sort(entryList, (e1, e2) -> -Long.compare(e1.getValue().cost, e2.getValue().cost));

        // 打印
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, TimeCost> entry : entryList) {
            String funcName = entry.getKey();
            TimeCost costTime = entry.getValue();
            sb.append("│\t").append(String.format("[%d ms] %s (%d)\n", costTime.cost / 1000000, funcName, costTime.count));
            totalCost += costTime.cost;
        }
        sb.append("│\t").append(String.format("===> total time cost: %d ms\n", totalCost / 1000000));

        return sb.toString();
    }

    /**
     * 释放
     */
    public void release() {
        if (firstRenderTimeCostMap != null) {
            firstRenderTimeCostMap.clear();
        }
        if (totalTimeCostMap != null) {
            totalTimeCostMap.clear();
        }
    }
}

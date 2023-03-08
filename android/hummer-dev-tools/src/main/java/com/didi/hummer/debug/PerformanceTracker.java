package com.didi.hummer.debug;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 一组invoke方法产生的性能分析信息
 *
 * Created by XiaoFeng on 2020/11/4.
 */
public class PerformanceTracker {

    public long beginTime;
    public long endTime;
    public long totalCost;
    public long invokeCost;
    public long otherCost;
    public long timestamp;
    public String timeFormat;
    public List<String> sourceCallStack;
    public List<InvokeTracker> trackerList = new ArrayList<>();
    public Map<String, TimeCost> timeCostMap = new HashMap<>();
    public List<Map.Entry<String, TimeCost>> sortTimeCostList;

    public static class TimeCost {
        // 函数调用次数
        public int count;
        // 所有函数累计耗时
        public long cost;

        public void increase(long timeCost) {
            count++;
            cost += timeCost;
        }
    }

    public PerformanceTracker start() {
        this.beginTime = System.nanoTime();
        this.timestamp = System.currentTimeMillis();
        this.timeFormat = new SimpleDateFormat("HH:mm:ss.SSS").format(timestamp);
        this.sourceCallStack = getSourceCallStack(Thread.currentThread().getStackTrace());
        return this;
    }

    public PerformanceTracker track(InvokeTracker tracker) {
        trackerList.add(tracker);
        invokeCost += tracker.timeCost;

        String key = tracker.className + "." + tracker.methodName;
        TimeCost timeCost = timeCostMap.get(key);
        if (timeCost == null) {
            timeCost = new TimeCost();
            timeCostMap.put(key, timeCost);
        }
        long cost = tracker.timeCost;
        timeCost.increase(cost);

        return this;
    }

    public PerformanceTracker stop() {
        endTime = System.nanoTime();
        totalCost = endTime - beginTime;
        otherCost = totalCost - invokeCost;

        // 方法耗时排序（倒序）
        sortTimeCostList = new ArrayList<>(timeCostMap.entrySet());
        Collections.sort(sortTimeCostList, (e1, e2) -> -Long.compare(e1.getValue().cost, e2.getValue().cost));

        return this;
    }

    private List<String> getSourceCallStack(StackTraceElement[] curStackTrace) {
        List<String> stack = new ArrayList<>();
        int index = 0;
        for (StackTraceElement stackTraceElement : curStackTrace) {
            String strStack = stackTraceElement.toString();
            if (strStack.contains("evaluateJavaScript(Native Method)")
                    || strStack.contains("evaluateBytecode(Native Method)")
                    || strStack.contains("callFunction(Native Method)")) {
                if (index + 4 < curStackTrace.length) {
                    for (int i = 0; i <= 4; i++) {
                        stack.add(curStackTrace[index + i].toString());
                    }
                }
            }
            index++;
        }
        return stack;
    }
}

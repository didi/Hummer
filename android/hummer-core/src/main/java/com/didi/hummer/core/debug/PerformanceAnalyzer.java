package com.didi.hummer.core.debug;

import com.didi.hummer.core.util.HMLog;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 分析并打印性能数据
 *
 * Created by XiaoFeng on 2020/3/13.
 */
public class PerformanceAnalyzer {

    private static final String TAG = "HummerDebug";

    private String strPerformanceFormat = "";

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

    public void analyze(List<InvokeTracker> trackerList, long totalCost, String callFrom) {
        String prefFormat = generatePerformanceFormat(trackerList, totalCost, callFrom);
        HMLog.i(TAG, " \n" + prefFormat);
        strPerformanceFormat += prefFormat;
    }

    public String getPerformanceFormat() {
        return strPerformanceFormat;
    }

    private String generatePerformanceFormat(List<InvokeTracker> trackerList, long totalCost, String callFrom) {
        // 生成方法耗时Map
        long invokeCost = 0;
        Map<String, TimeCost> timeCostMap = new HashMap<>();
        for (InvokeTracker tracker : trackerList) {
            String key = tracker.className + "." + tracker.methodName;
            TimeCost timeCost = timeCostMap.get(key);
            if (timeCost == null) {
                timeCost = new TimeCost();
                timeCostMap.put(key, timeCost);
            }
            long cost = tracker.timeCost();
            timeCost.increase(cost);
            invokeCost += cost;
        }

        // 方法耗时排序（倒序）
        List<Map.Entry<String, TimeCost>> entryList = new ArrayList<>(timeCostMap.entrySet());
        Collections.sort(entryList, (e1, e2) -> -Long.compare(e1.getValue().cost, e2.getValue().cost));

        // 排序部分的格式化输出
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, TimeCost> entry : entryList) {
            String funcName = entry.getKey();
            TimeCost costTime = entry.getValue();
            if (!funcName.contains("constructor_end")) {
                sb.append("│\t").append(String.format("[%d ms] %s <%d>\n", costTime.cost / 1000000, funcName, costTime.count));
            }
        }

        // 整体格式化输出
        return "┌─────────────────────────\n" +
                "│\t耗时统计\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                "│\tcallFrom: " + callFrom + "\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateSummaryPerformanceInfo(totalCost, invokeCost) +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                sb +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateInvokeCallInfo(trackerList) +
                "└─────────────────────────\n\n";
    }

    /**
     * 耗时统计摘要信息
     *
     * @return
     */
    private String generateSummaryPerformanceInfo(long totalCost, long invokeCost) {
        return "│\t" + String.format("totalCost: %d ms\n", totalCost / 1000000) +
                "│\t" + String.format("invokeCost: %d ms\n", invokeCost / 1000000) +
                "│\t" + String.format("otherCost: %d ms\n", (totalCost - invokeCost) / 1000000);
    }

    /**
     * invoke方法调用信息
     *
     * 如：(39) Text.setStyle([{"fontSize":20}])
     *
     * @return
     */
    private String generateInvokeCallInfo(List<InvokeTracker> trackerList) {
        StringBuilder sb = new StringBuilder();
        for (InvokeTracker tracker : trackerList) {
            if (!tracker.methodName.equals("constructor_end")) {
                sb.append("│\t").append(String.format("[%s] (%d) %s.%s(%s)\n", tracker.timeFormat, tracker.objectID, tracker.className, tracker.methodName, tracker.params.length > 0 ? Arrays.toString(tracker.params) : ""));
            }
        }
        return sb.toString();
    }
}

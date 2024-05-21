package com.didi.hummer2.devtools.utils;

import com.didi.hummer2.debug.InvokeTracker;
import com.didi.hummer2.debug.PerformanceTracker;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * 性能分析列表字符串格式化帮助类
 *
 * Created by XiaoFeng on 2021/8/15.
 */
public class PerformanceListFormat {

    public static String format(List<PerformanceTracker> perfTrackerList) {
        if (perfTrackerList == null || perfTrackerList.isEmpty()) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        for (PerformanceTracker tracker : perfTrackerList) {
            sb.append(generatePerformanceFormat(tracker));
        }
        return sb.toString();
    }

    private static String generatePerformanceFormat(PerformanceTracker tracker) {
        return "┌─────────────────────────\n" +
                "│\t耗时统计\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateSourceCallStackInfo(tracker) +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateSummaryPerformanceInfo(tracker) +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateInvokeTimeCostSortInfo(tracker) +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateInvokeCallStackInfo(tracker) +
                "└─────────────────────────\n\n";
    }

    /**
     * 耗时统计摘要信息
     */
    private static String generateSourceCallStackInfo(PerformanceTracker tracker) {
        if (tracker == null) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("│\t<Source Call Stack>\n");
        for (String stack : tracker.sourceCallStack) {
            sb.append("│\t" + stack + "\n");
        }
        return sb.toString();
    }

    /**
     * 耗时统计摘要信息
     */
    private static String generateSummaryPerformanceInfo(PerformanceTracker tracker) {
        if (tracker == null) {
            return "";
        }
        return "│\t" + String.format("totalCost: %d ms\n", tracker.totalCost / 1000000) +
                "│\t" + String.format("invokeCost: %d ms\n", tracker.invokeCost / 1000000) +
                "│\t" + String.format("otherCost: %d ms\n", tracker.otherCost / 1000000);
    }

    /**
     * 方法合并耗时排序
     */
    private static String generateInvokeTimeCostSortInfo(PerformanceTracker tracker) {
        if (tracker == null) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, PerformanceTracker.TimeCost> entry : tracker.sortTimeCostList) {
            String funcName = entry.getKey();
            PerformanceTracker.TimeCost costTime = entry.getValue();
            if (!funcName.contains("constructor_end")) {
                sb.append("│\t").append(String.format("[%.1f ms] %s - {%d}\n", costTime.cost / 1000000f, funcName, costTime.count));
            }
        }
        return sb.toString();
    }

    /**
     * invoke方法调用信息
     *
     * 如：[20:30:22.121] (39) Text.setStyle([{"fontSize":20}])
     */
    private static String generateInvokeCallStackInfo(PerformanceTracker tracker) {
        if (tracker == null) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        for (InvokeTracker t : tracker.trackerList) {
            if (!t.methodName.equals("constructor_end")) {
                sb.append("│\t").append(String.format("[%s] (%d) %s.%s(%s)\n", t.timeFormat, t.objectID, t.className, t.methodName, t.params.length > 0 ? Arrays.toString(t.params) : ""));
            }
        }
        return sb.toString();
    }
}

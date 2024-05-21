package com.didi.hummer2.devtools.utils;

import com.didi.hummer2.debug.InvokeTracker;

import java.util.Arrays;
import java.util.List;

/**
 * 调用栈字符串格式化帮助类
 *
 * Created by XiaoFeng on 2021/8/15.
 */
public class CallStackFormat {

    /**
     * 获取组件树字符串
     */
    public static String format(List<InvokeTracker> trackerList) {
        if (trackerList == null || trackerList.isEmpty()) {
            return "";
        }

        return
                "┌─────────────────────────\n" +
                "│\t函数调用栈\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateCallStackInfo(trackerList) +
                "└─────────────────────────\n";
    }

    private static String generateCallStackInfo(List<InvokeTracker> trackerList) {
        if (trackerList == null || trackerList.isEmpty()) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        for (InvokeTracker t : trackerList) {
            if (!t.methodName.equals("constructor_end")) {
                sb.append("│\t").append(String.format("[%s] (%d) %s.%s(%s)\n", t.timeFormat, t.objectID, t.className, t.methodName, t.params.length > 0 ? Arrays.toString(t.params) : ""));
            }
        }
        return sb.toString();
    }
}

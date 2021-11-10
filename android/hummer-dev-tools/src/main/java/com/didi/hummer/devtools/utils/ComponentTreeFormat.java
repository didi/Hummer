package com.didi.hummer.devtools.utils;

import android.text.TextUtils;

import com.didi.hummer.render.style.HummerNode;

import java.util.Iterator;

/**
 * 视图树字符串格式化帮助类
 *
 * Created by XiaoFeng on 2021/8/15.
 */
public class ComponentTreeFormat {

    /**
     * ┌─────────────
     * │ 参考这个示例
     * ├┄┄┄┄┄┄┄┄┄┄┄┄┄
     * │ 参考这个示例
     * └─────────────
     */
    private static final String FORMAT_STRING_LEFT_TOP = "┌─";
    private static final String FORMAT_STRING_LEFT_CENTER = "├─";
    private static final String FORMAT_STRING_LEFT_BOTTOM = "└─";
    private static final String FORMAT_STRING_NORMAL_H = "─";
    private static final String FORMAT_STRING_NORMAL_V = "│";

    /**
     * 获取组件树字符串
     */
    public static String format(HummerNode node) {
        if (node == null) {
            return "";
        }

        return
                "┌─────────────────────────\n" +
                "│\t视图树\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateNodeTreeInfo(node, 0, 0) +
                "└─────────────────────────\n";
    }

    private static String generateNodeTreeInfo(HummerNode node, int level, int lastNodeFlag) {
        if (node == null) {
            return "";
        }

        // 拼接输出日志
        StringBuilder strLog = new StringBuilder();
        strLog.append("│\t").append(generateTabFormatString(level, lastNodeFlag));
        if (node.getObjId() >= 0) {
            strLog.append(node.getObjId()).append(".");
        }
        strLog.append(node.getName());
        if (!TextUtils.isEmpty(node.getContent())) {
            strLog.append(" (").append(node.getContent()).append(")");
        }
        strLog.append('\n');

        // 处理子节点
        if (node.getChildren() != null && !node.getChildren().isEmpty()) {
            int newLevel = level + 1;
            Iterator<HummerNode> it = node.getChildren().iterator();
            while (it.hasNext()) {
                HummerNode n = it.next();
                boolean isLastNode = !it.hasNext();
                if (isLastNode) {
                    lastNodeFlag |= (1 << level);
                }
                strLog.append(generateNodeTreeInfo(n, newLevel, lastNodeFlag));
            }
        }

        return strLog.toString();
    }

    private static String generateTabFormatString(int count, int lastNodeFlag) {
        StringBuilder tabStr = new StringBuilder();
        for (int i = 0; i < count; i++) {
            if ((lastNodeFlag & (1 << i)) == 0) {
                // is not last node
                if (i < count - 1) {
                    tabStr.append(FORMAT_STRING_NORMAL_V + "\t");
                } else {
                    tabStr.append(FORMAT_STRING_LEFT_CENTER);
                }
            } else {
                // is last node
                if (i < count - 1) {
                    tabStr.append("\t");
                } else {
                    tabStr.append(FORMAT_STRING_LEFT_BOTTOM);
                }
            }
        }
        if (tabStr.length() > 0) {
            tabStr.append(" ");
        }
        return tabStr.toString();
    }
}

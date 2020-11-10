package com.didi.hummer.core.debug;

import android.text.TextUtils;

import com.didi.hummer.core.util.HMLog;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

/**
 * 分析并打印函数调用树
 *
 * Created by XiaoFeng on 2020/3/15.
 */
public class CallStackTreeAnalyzer {

    private static final String TAG = "HummerDebug";

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
    private static final String FORMAT_STRING_LEFT_TOP_VIRTUAL = "┌x";
    private static final String FORMAT_STRING_LEFT_CENTER_VIRTUAL = "├x";
    private static final String FORMAT_STRING_LEFT_BOTTOM_VIRTUAL = "└x";
    private static final String FORMAT_STRING_NORMAL_H = "─";
    private static final String FORMAT_STRING_NORMAL_V = "│";

    /**
     * 根据记录的trace点，分析得出函数调用树
     */
    private TreeNode analyzeTree(List<TraceInfo> traceList) {
        if (traceList == null || traceList.isEmpty()) {
            return null;
        }

        Stack<TreeNode> stack = new Stack<>();
        List<TreeNode> cacheNodeList = new ArrayList<>();

        for (TraceInfo info : traceList) {
            TreeNode node = new TreeNode(info.objectID, info.className + "." + info.methodName);
            node.timestamp = info.timestamp;

            if ("constructor_end".equals(info.methodName)) {
                TreeNode topNode = stack.pop();
                topNode.isClosed = true;
            } else {
                cacheNodeList.add(node);

                if (!stack.isEmpty()) {
                    TreeNode parentNode = stack.peek();
                    if (!parentNode.isClosed) {
                        parentNode.add(node);
                        node.parent = parentNode;
                    }
                }

                if ("constructor".equals(info.methodName)) {
                    stack.push(node);
                } else if ("setStyle".equals(info.methodName)
                        || "setText".equals(info.methodName)
                        || "setSrc".equals(info.methodName)) {
                    if (info.params.length > 0) {
                        node.tag = String.valueOf(info.params[0]);
                    }
                } else if ("appendChild".equals(info.methodName)
                        || "removeChild".equals(info.methodName)) {
                    long childId = ((Number) info.params[0]).longValue();
                    node.tag = String.valueOf(childId);
                } else if ("insertBefore".equals(info.methodName)
                        || "replaceChild".equals(info.methodName)) {
                    long childId1 = ((Number) info.params[0]).longValue();
                    long childId2 = ((Number) info.params[0]).longValue();
                    node.tag = String.format("%d, %d", childId1, childId2);
                } else if ("Hummer".equals(info.className) && "render".equals(info.methodName)) {
                    long childId = ((Number) info.params[0]).longValue();
                    node.tag = String.valueOf(childId);
                } else if ("Hummer".equals(info.className) && "console.log".equals(info.methodName)) {
                    node.name = "console.log";
                    if (info.params.length > 0) {
                        node.tag = String.valueOf(info.params[0]);
                    }
                }
            }
        }

        // 把全局JSContext作为RootNode
        TreeNode rootNode = new TreeNode(-1, "<< JSContext >>");
        for (TreeNode node : cacheNodeList) {
            if (node != null && node.parent == null) {
                rootNode.add(node);
                node.parent = rootNode;
            }
        }

        return rootNode;
    }

    /**
     * 打印函数调用树
     */
    public void printTree(List<TraceInfo> traceList) {
        HMLog.d(TAG, " \n" + generateNodeTree(traceList));
    }

    /**
     * 生成函数调用树字符串
     */
    public String generateNodeTree(List<TraceInfo> traceList) {
        return
                "┌─────────────────────────\n" +
                "│\t函数调用树\n" +
                "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n" +
                generateNodeTree(analyzeTree(traceList), 0, 0) +
                "└─────────────────────────\n";
    }

    private String generateNodeTree(TreeNode node, int level, int lastNodeFlag) {
        if (node == null) {
            return "";
        }

        // 拼接输出日志
        StringBuilder strLog = new StringBuilder();
        strLog.append("│\t").append(generateTabFormatString(node, level, lastNodeFlag));
        if (node.timestamp > 0) {
//            String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(node.timestamp) + "." + (node.timestamp % 1000);
            String time = new SimpleDateFormat("HH:mm:ss").format(node.timestamp) + "." + (node.timestamp % 1000);
            strLog.append("[").append(time).append("] ");
        }
        if (node.id >= 0) {
            strLog.append(node.id).append(".");
        }
        strLog.append(node.name);
        if (!TextUtils.isEmpty(node.tag)) {
            strLog.append(" (").append(node.tag).append(")");
        }
        strLog.append('\n');

        // 处理子节点
        if (node.children != null && !node.children.isEmpty()) {
            int newLevel = level + 1;
            Iterator<TreeNode> it = node.children.iterator();
            while (it.hasNext()) {
                TreeNode n = it.next();
                boolean isLastNode = !it.hasNext();
                if (isLastNode) {
                    lastNodeFlag |= (1 << level);
                }
                strLog.append(generateNodeTree(n, newLevel, lastNodeFlag));
            }
        }

        return strLog.toString();
    }

    private String generateTabFormatString(TreeNode node, int count, int lastNodeFlag) {
        if (node == null) {
            return "";
        }

        StringBuilder tabStr = new StringBuilder();
        for (int i = 0; i < count; i++) {
            if ((lastNodeFlag & (1 << i)) == 0) {
                // is not last node
                if (i < count - 1) {
                    tabStr.append(FORMAT_STRING_NORMAL_V + "\t");
                } else {
                    tabStr.append(node.parent != null ? FORMAT_STRING_LEFT_CENTER : FORMAT_STRING_LEFT_CENTER_VIRTUAL);
                }
            } else {
                // is last node
                if (i < count - 1) {
                    tabStr.append("\t");
                } else {
                    tabStr.append(node.parent != null ? FORMAT_STRING_LEFT_BOTTOM : FORMAT_STRING_LEFT_BOTTOM_VIRTUAL);
                }
            }
        }
        if (tabStr.length() > 0) {
            tabStr.append(" ");
        }
        return tabStr.toString();
    }
}

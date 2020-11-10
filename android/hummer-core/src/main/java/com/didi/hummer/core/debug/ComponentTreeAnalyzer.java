package com.didi.hummer.core.debug;

import android.text.TextUtils;

import com.didi.hummer.core.util.HMLog;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

/**
 * 分析并打印组件树
 *
 * Created by XiaoFeng on 2020/3/15.
 */
public class ComponentTreeAnalyzer {

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
     * 根据记录的trace点，分析得出组件树
     */
    private TreeNode analyzeTree(List<TraceInfo> traceList) {
        if (traceList == null || traceList.isEmpty()) {
            return null;
        }

        TreeNode rootNode = null;
        Stack<TreeNode> stack = new Stack<>();
        Map<Long, TreeNode> cacheNodeMap = new LinkedHashMap<>();

        for (TraceInfo info : traceList) {
            if ("constructor".equals(info.methodName)) {
                TreeNode node = new TreeNode(info.objectID, info.className);
                node.timestamp = info.timestamp;
                cacheNodeMap.put(node.id, node);

                if (!stack.isEmpty()) {
                    TreeNode parentNode = stack.peek();
                    if (!parentNode.isClosed) {
                        // 如果父节点只begin没有end，说明是虚拟父亲
                        parentNode.add(node);
                        node.virtualParent = parentNode;
                    }
                }
                stack.push(node);
            } else if ("constructor_end".equals(info.methodName)) {
                TreeNode topNode = stack.pop();
                topNode.isClosed = true;
            } else {
                if ("setText".equals(info.methodName) || "setSrc".equals(info.methodName)) {
                    TreeNode node = cacheNodeMap.get(info.objectID);
                    if (node != null && info.params.length > 0) {
                        node.tag = String.valueOf(info.params[0]);
                    }
                } else if ("appendChild".equals(info.methodName)) {
                    TreeNode node = cacheNodeMap.get(info.objectID);
                    if (node != null) {
                        long childId = ((Number) info.params[0]).longValue();
                        TreeNode childNode = cacheNodeMap.get(childId);
                        if (childNode != null) {
                            // 移除虚拟父亲
                            if (childNode.virtualParent != null) {
                                childNode.virtualParent.remove(childNode);
                                childNode.virtualParent = null;
                            }
                            // 添加真实父亲
                            if (!node.contains(childNode)) {
                                node.add(childNode);
                            }
                            childNode.parent = node;
                        }
                    }
                } else if ("removeChild".equals(info.methodName)) {
                    TreeNode node = cacheNodeMap.get(info.objectID);
                    if (node != null) {
                        long childId = ((Number) info.params[0]).longValue();
                        TreeNode childNode = cacheNodeMap.get(childId);
                        if (childNode != null) {
                            // 移除虚拟父亲
                            if (childNode.virtualParent != null) {
                                childNode.virtualParent.remove(childNode);
                                childNode.virtualParent = null;
                            }
                            // 移除真实父亲
                            if (childNode.parent != null) {
                                childNode.parent.remove(childNode);
                                childNode.parent = null;
                            }
                            // 移除子节点
                            node.remove(childNode);
                        }
                    }
                } else if ("Hummer".equals(info.className) && "render".equals(info.methodName)) {
                    long childId = ((Number) info.params[0]).longValue();
                    TreeNode childNode = cacheNodeMap.get(childId);
                    if (childNode != null) {
                        rootNode = childNode;
                        rootNode.tag = "RootView";
                    }
                }
            }
        }

        // 若没有rootNode，即没有走到Hummer.render就crash了
        if (rootNode == null) {
            rootNode = new TreeNode(-1, "<< Root With Crash >>");
            for (long id : cacheNodeMap.keySet()) {
                TreeNode node = cacheNodeMap.get(id);
                // 即没有parent也没有virtualParent算作rootNode
                if (node != null && node.parent == null && node.virtualParent == null) {
                    rootNode.add(node);
                    node.parent = rootNode;
                }
            }
        }

        return rootNode;
    }

    /**
     * 打印组件树
     */
    public void printTree(List<TraceInfo> traceList) {
        HMLog.d(TAG, " \n" + generateNodeTree(traceList));
    }

    /**
     * 生成组件树字符串
     */
    public String generateNodeTree(List<TraceInfo> traceList) {
        return
                "┌─────────────────────────\n" +
                "│\t视图树\n" +
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

package com.didi.hummer.core.debug;

import java.util.ArrayList;
import java.util.List;

/**
 * 分析并打印组件树和函数调用树
 *
 * Created by XiaoFeng on 2020/3/15.
 */
public class TreeAnalyzer {

    private List<TraceInfo> traceList = new ArrayList<>();
    private ComponentTreeAnalyzer componentTreeAnalyzer;
    private CallStackTreeAnalyzer callStackTreeAnalyzer;

    public TreeAnalyzer() {
        componentTreeAnalyzer = new ComponentTreeAnalyzer();
        callStackTreeAnalyzer = new CallStackTreeAnalyzer();
    }

    /**
     * 记录invoke调用的点
     */
    public void track(String className, long objectID, String methodName, Object[] parameters) {
        traceList.add(new TraceInfo(className, objectID, methodName, parameters));
    }

    /**
     * 打印组件树和函数调用树
     */
    public void printTrees() {
        componentTreeAnalyzer.printTree(traceList);
        callStackTreeAnalyzer.printTree(traceList);
    }

    /**
     * 获取视图树的格式化字符串
     */
    public String getComponentTreeFormat() {
        return componentTreeAnalyzer.generateNodeTree(traceList);
    }

    /**
     * 获取函数调用树的格式化字符串
     */
    public String getCallStackTreeFormat() {
        return callStackTreeAnalyzer.generateNodeTree(traceList);
    }

    /**
     * 释放
     */
    public void release() {
        if (traceList != null) {
            traceList.clear();
        }
    }
}

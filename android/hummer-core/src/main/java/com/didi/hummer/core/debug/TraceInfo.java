package com.didi.hummer.core.debug;

/**
 * invoke调用记录点信息
 *
 * Created by XiaoFeng on 2020/3/15.
 */
public class TraceInfo {

    public String className;
    public long objectID;
    public String methodName;
    public Object[] params;
    public long timestamp;

    public TraceInfo(String className, long objectID, String methodName, Object[] params) {
        this.className = className;
        this.objectID = objectID;
        this.methodName = methodName;
        this.params = params;
        timestamp = System.currentTimeMillis();
    }
}

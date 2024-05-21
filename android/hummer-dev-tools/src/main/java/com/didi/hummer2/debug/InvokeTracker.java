package com.didi.hummer2.debug;

import java.text.SimpleDateFormat;
import java.util.Arrays;

/**
 * 一次invoke方法调用的信息
 *
 * Created by XiaoFeng on 2020/11/4.
 */
public class InvokeTracker {

    public String className;
    public long objectID;
    public String methodName;
    public Object[] params;
    public String desc;
    public long beginTime;
    public long endTime;
    public long timeCost;
    public long timestamp;
    public String timeFormat;

    public InvokeTracker start(String className, long objectID, String methodName, Object[] params) {
        this.beginTime = System.nanoTime();
        this.timestamp = System.currentTimeMillis();
        this.timeFormat = new SimpleDateFormat("HH:mm:ss.SSS").format(timestamp);
        this.className = className;
        this.objectID = objectID;
        this.methodName = methodName;
        this.params = params;

        // 构造函数去除第一个this参数
        if (methodName.startsWith("constructor")) {
            if (params.length > 0) {
                this.params = Arrays.copyOfRange(params, 1, params.length);
            }
        }
        return this;
    }

    public InvokeTracker stop() {
        endTime = System.nanoTime();
        timeCost = endTime - beginTime;
        return this;
    }
}

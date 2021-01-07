package com.didi.hummer.core.debug;

import java.text.SimpleDateFormat;
import java.util.Arrays;

/**
 * 一个Invoke方法调用的信息采集
 *
 * Created by XiaoFeng on 2020/11/4.
 */
public class InvokeTracker {

    public String className;
    public long objectID;
    public String methodName;
    public Object[] params;
    public long beginTime;
    public long endTime;
    public long timestamp;
    public String timeFormat;

    public InvokeTracker begin() {
        beginTime = System.nanoTime();
        timestamp = System.currentTimeMillis();
        timeFormat = new SimpleDateFormat("HH:mm:ss.SSS").format(timestamp);
        return this;
    }

    public InvokeTracker track(String className, long objectID, String methodName, Object[] params) {
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

    public InvokeTracker end() {
        endTime = System.nanoTime();
        return this;
    }

    public long timeCost() {
        return endTime - beginTime;
    }
}

package com.didi.hummer.core.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by XiaoFeng on 2020/9/24.
 */
public class ExceptionUtil {

    public static void addStackTrace(Exception e, StackTraceElement element) {
        addStackTrace(0, e, element);
    }

    public static void addStackTrace(int index, Exception e, StackTraceElement element) {
        StackTraceElement[] arr = e.getStackTrace();
        List<StackTraceElement> list = new ArrayList<>(Arrays.asList(arr));
        list.add(index, element);
        e.setStackTrace(list.toArray(new StackTraceElement[0]));
    }
}

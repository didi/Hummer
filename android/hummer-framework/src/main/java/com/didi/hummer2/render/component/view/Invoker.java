package com.didi.hummer2.render.component.view;


import com.didi.hummer2.HummerContext;

public interface Invoker {

    String getName();

    Object onInvoke(HummerContext hummerContext, long objectID, String methodName, Object... params);
}

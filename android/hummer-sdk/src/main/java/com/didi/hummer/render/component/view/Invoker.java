package com.didi.hummer.render.component.view;

import com.didi.hummer.context.HummerContext;

public interface Invoker {

    String getName();

    Object onInvoke(HummerContext hummerContext, long objectID, String methodName, Object... params);
}

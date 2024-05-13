package com.didi.hummer2.render.event;

import com.didi.hummer2.render.event.base.Event;

/**
 * didi Create on 2024/4/28 .
 * <p>
 * Copyright (c) 2024/4/28 by didiglobal.com.
 *
 * @author <a href="realonlyone@126.com">zhangjun</a>
 * @version 1.0
 * @Date 2024/4/28 10:36 AM
 * @Description 页面状态事件
 */

public class PageStateEvent extends Event {

    public static final String PAGE_ON_CREATE = "__onCreate__";
    public static final String PAGE_ON_APPEAR = "__onAppear__";
    public static final String PAGE_ON_DISAPPEAR = "__onDisappear__";
    public static final String PAGE_ON_DESTROY = "__onDestroy__";
    public static final String PAGE_ON_BACK = "__onBack__";


    public PageStateEvent(String type) {
        setType(type);
        setState(0);
        setTimestamp(System.currentTimeMillis());
    }


    public static PageStateEvent __onCreate__() {
        return new PageStateEvent(PAGE_ON_CREATE);
    }

    public static PageStateEvent __onAppear__() {
        return new PageStateEvent(PAGE_ON_APPEAR);
    }

    public static PageStateEvent __onDisappear__() {
        return new PageStateEvent(PAGE_ON_DISAPPEAR);
    }

    public static PageStateEvent __onDestroy__() {
        return new PageStateEvent(PAGE_ON_DESTROY);
    }

    public static PageStateEvent __onBack__() {
        return new PageStateEvent(PAGE_ON_BACK);
    }
}

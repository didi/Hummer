package com.didi.hummer2.render.event.base;

import android.view.View;
import android.widget.TextView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by XiaoFeng on 2020/8/13.
 */
public class TraceEvent {

    public static final String EVENT_NAME = "event_name";
    public static final String VIEW_NAME = "view_name";
    public static final String VIEW_ID = "view_id";
    public static final String VIEW_CONTENT = "view_content";
    public static final String TIMESTAMP = "timestamp";

    public static Map<String, Object> makeTraceGestureEvent(String eventType, View view, String viewId) {
        if (view == null) {
            return null;
        }
        Map<String, Object> event = new HashMap<>();
        event.put(EVENT_NAME, eventType);
        event.put(VIEW_NAME, view.getClass().getSimpleName());
        event.put(VIEW_ID, viewId);
        String viewContent = null;
        if (view instanceof TextView) {
            viewContent = ((TextView) view).getText().toString();
        }
        event.put(VIEW_CONTENT, viewContent);
        event.put(TIMESTAMP, System.currentTimeMillis());
        return event;
    }
}

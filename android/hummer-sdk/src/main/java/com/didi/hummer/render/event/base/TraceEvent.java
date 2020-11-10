package com.didi.hummer.render.event.base;

import android.widget.Button;
import android.widget.TextView;

import com.didi.hummer.render.component.view.HMBase;

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

    public static Map<String, Object> makeTraceGestureEvent(String eventType, HMBase base) {
        Map<String, Object> event = new HashMap<>();
        event.put(EVENT_NAME, eventType);
        event.put(VIEW_NAME, base.getView().getClass().getSimpleName());
        event.put(VIEW_ID, base.getViewID());
        String viewContent = null;
        if (base.getView() instanceof TextView) {
            viewContent = ((TextView) base.getView()).getText().toString();
        } else if (base.getView() instanceof Button) {
            viewContent = ((Button) base.getView()).getText().toString();
        }
        event.put(VIEW_CONTENT, viewContent);
        event.put(TIMESTAMP, System.currentTimeMillis());
        return event;
    }
}

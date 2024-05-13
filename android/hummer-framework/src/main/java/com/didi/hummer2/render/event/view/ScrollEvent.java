package com.didi.hummer2.render.event.view;

//import com.didi.hummer.render.event.base.Event;

import com.didi.hummer2.bridge.JsiNumber;
import com.didi.hummer2.bridge.JsiObject;
import com.didi.hummer2.render.event.base.Event;

public class ScrollEvent extends Event {

    public static final String HM_EVENT_TYPE_SCROLL = "scroll";

    public static final int HM_SCROLL_STATE_NORMAL = 0; // 初始禁止状态
    public static final int HM_SCROLL_STATE_BEGAN = 1; // 开始滚动
    public static final int HM_SCROLL_STATE_SCROLL = 2; // 滚动中
    public static final int HM_SCROLL_STATE_ENDED = 3; // 停止滚动
    public static final int HM_SCROLL_STATE_SCROLL_UP = 4; //滚动过程中，手指抬起

    private float dx;
    private float dy;
    private float offsetX;
    private float offsetY;

    public void setDx(float dx) {
        this.dx = dx;
    }

    public void setDy(float dy) {
        this.dy = dy;
    }

    public void setOffsetX(float offsetX) {
        this.offsetX = offsetX;
    }

    public void setOffsetY(float offsetY) {
        this.offsetY = offsetY;
    }


    @Override
    public JsiObject toJsiValue() {
        JsiObject object = super.toJsiValue();
        object.put("dx", new JsiNumber(dx));
        object.put("dy", new JsiNumber(dy));
        object.put("offsetX", new JsiNumber(offsetX));
        object.put("offsetY", new JsiNumber(offsetY));
        return object;
    }
}

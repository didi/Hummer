package com.didi.hummer.render.event.view;

import com.didi.hummer.render.event.base.Event;

public class ScrollEvent extends Event {

    public static final String HM_EVENT_TYPE_SCROLL = "scroll";

    public static final int HM_SCROLL_STATE_BEGAN = 1;
    public static final int HM_SCROLL_STATE_SCROLL = 2;
    public static final int HM_SCROLL_STATE_ENDED = 3;
    public static final int HM_SCROLL_STATE_SCROLL_UP = 4; //滚动过程中，手指抬起

    private int dx;
    private int dy;
    private int offsetX;
    private int offsetY;

    public void setDx(int dx) {
        this.dx = dx;
    }

    public void setDy(int dy) {
        this.dy = dy;
    }

    public void setOffsetX(int offsetX) {
        this.offsetX = offsetX;
    }

    public void setOffsetY(int offsetY) {
        this.offsetY = offsetY;
    }
}

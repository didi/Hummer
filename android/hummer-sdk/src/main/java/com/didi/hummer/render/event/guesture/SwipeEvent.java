package com.didi.hummer.render.event.guesture;

import com.didi.hummer.render.event.base.Event;

/**
 * 轻扫手势事件
 */
public class SwipeEvent extends Event {

    public static final int DIRECTION_RIGHT     = 1;
    public static final int DIRECTION_LEFT      = 1 << 1;
    public static final int DIRECTION_UP        = 1 << 2;
    public static final int DIRECTION_DOWN      = 1 << 3;

    private int direction;

    public void setDirection(int direction) {
        this.direction = direction;
    }
}

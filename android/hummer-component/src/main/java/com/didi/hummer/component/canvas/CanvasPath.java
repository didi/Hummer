package com.didi.hummer.component.canvas;

import android.graphics.Path;

import com.didi.hummer.annotation.Component;
import com.didi.hummer.annotation.JsMethod;

@Component("CanvasPath")
public class CanvasPath {

    private Path path = new Path();

    public Path getPath() {
        return path;
    }

    @JsMethod("moveTo")
    public void moveTo(float x, float y) {
        path.moveTo(x, y);
    }

    @JsMethod("lineTo")
    public void lineTo(float x, float y) {
        path.lineTo(x, y);
    }

    @JsMethod("close")
    public void close() {
        path.close();
    }

}

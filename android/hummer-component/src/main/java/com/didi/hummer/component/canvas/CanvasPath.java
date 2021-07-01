package com.didi.hummer.component.canvas;

import android.graphics.Path;

import com.didi.hummer.annotation.Component;

@Component("CanvasPath")
public class CanvasPath {

    private Path path = new Path();

    public Path getPath() {
        return path;
    }

    public void moveTo(float x, float y) {
        path.moveTo(x, y);
    }

    public void lineTo(float x, float y) {
        path.lineTo(x, y);
    }




}

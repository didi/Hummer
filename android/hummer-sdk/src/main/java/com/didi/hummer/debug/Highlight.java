package com.didi.hummer.debug;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;

/**
 * 视图高亮（视图周围画框）
 *
 * Created by XiaoFeng on 2021/7/20.
 */
public class Highlight {

    private static HighlightLayer layer;

    public static void show(@NonNull View view) {
        if (layer == null) {
            layer = new HighlightLayer(view.getContext());

            ViewGroup decorView = (ViewGroup) ((Activity) view.getContext()).getWindow().getDecorView();
            decorView.addView(layer);
        }

        layer.hide();
        layer.post(() -> layer.show(view));
    }

    public static void clear() {
        if (layer != null) {
            layer.hide();
            ViewGroup decorView = (ViewGroup) ((Activity) layer.getContext()).getWindow().getDecorView();
            decorView.removeView(layer);
            layer = null;
        }
    }

    private static class HighlightLayer extends View {
        private Paint mPaint;
        private Rect mRect = new Rect();

        public HighlightLayer(@NonNull Context context) {
            super(context, null);
            init();
        }

        @Override
        protected void onDetachedFromWindow() {
            super.onDetachedFromWindow();
            layer = null;
        }

        private void init() {
            mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
            mPaint.setStyle(Paint.Style.STROKE);
            mPaint.setStrokeWidth(8);
            mPaint.setColor(0xA0FF0000);
        }

        public void show(View view) {
            int[] viewLocation = new int[2];
            view.getDrawingRect(mRect);
            view.getLocationOnScreen(viewLocation);
            mRect.left = viewLocation[0];
            mRect.top = viewLocation[1];
            mRect.right += mRect.left;
            mRect.bottom += mRect.top;
            postInvalidate();
        }

        public void hide() {

        }

        @Override
        protected void onDraw(Canvas canvas) {
            super.onDraw(canvas);
            canvas.drawRect(mRect, mPaint);
        }
    }
}

package com.didi.hummer.component.text;

import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.text.style.ImageSpan;

import java.lang.ref.WeakReference;

/**
 * 扩展的ImageSpan，支持四种对齐方式：baseline、top、center、bottom，默认为baseline
 *
 * Created by XiaoFeng on 2020-02-11.
 */
public class ImageSpanEx extends ImageSpan {

    public static final int ALIGN_TOP = 2;
    public static final int ALIGN_CENTER = 3;

    public ImageSpanEx(@NonNull Drawable d) {
        super(d, ALIGN_BASELINE);
    }

    public ImageSpanEx(@NonNull Drawable d, int verticalAlignment) {
        super(d, verticalAlignment);
    }

    @Override
    public int getSize(Paint paint, CharSequence text, int start, int end, Paint.FontMetricsInt fm) {
        if (mVerticalAlignment == ALIGN_BASELINE || mVerticalAlignment == ALIGN_BOTTOM) {
            return super.getSize(paint, text, start, end, fm);
        }

        Drawable d = getCachedDrawable();
        Rect rect = d.getBounds();

        if (fm != null) {
            Paint.FontMetricsInt fmPaint = paint.getFontMetricsInt();
            int fontHeight = fmPaint.bottom - fmPaint.top;
            int drHeight = rect.height();

            if (mVerticalAlignment == ALIGN_TOP) {
                fm.top = -drHeight;
                fm.ascent = fm.top;
                fm.descent = fontHeight - drHeight;
                fm.bottom = fm.descent;
            } else {
                int top = drHeight / 2 - fontHeight / 2;
                int bottom = drHeight / 2 + fontHeight / 2;
                fm.top = -bottom;
                fm.ascent = -bottom;
                fm.descent = top;
                fm.bottom = top;
            }
        }

        return rect.right;
    }

    @Override
    public void draw(Canvas canvas, CharSequence text, int start, int end, float x, int top, int y, int bottom, Paint paint) {
        if (mVerticalAlignment == ALIGN_BASELINE || mVerticalAlignment == ALIGN_BOTTOM) {
            super.draw(canvas, text, start, end, x, top, y, bottom, paint);
            return;
        }

        Drawable b = getCachedDrawable();
        canvas.save();

        int transY = 0;
        if (mVerticalAlignment == ALIGN_TOP) {
            transY = top;
        } else if (mVerticalAlignment == ALIGN_CENTER) {
            transY = ((bottom - top) - b.getBounds().height()) / 2 + top;
        }

        canvas.translate(x, transY);
        b.draw(canvas);
        canvas.restore();
    }

    private Drawable getCachedDrawable() {
        WeakReference<Drawable> wr = mDrawableRef;
        Drawable d = null;

        if (wr != null) {
            d = wr.get();
        }

        if (d == null) {
            d = getDrawable();
            mDrawableRef = new WeakReference<>(d);
        }

        return d;
    }

    private WeakReference<Drawable> mDrawableRef;
}

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

    // 基于文字内容顶部的对齐，是自定义对齐方式。
    public static final int ALIGN_TEXT_TOP = 3;

    // 基于文字内容居中对齐，是自定义对齐方式。
    // DynamicDrawableSpan中的ALIGN_CENTER是基于文本控件整行高度的居中对齐，并不是基于文字内容本身的居中对齐。且它是API 29之后才加入的，API 29之前的系统并不支持。
    public static final int ALIGN_TEXT_CENTER = 4;

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
            int drHeight = rect.height();

            if (mVerticalAlignment == ALIGN_TEXT_TOP) {
                float textCenter = (float) (fmPaint.descent + fmPaint.ascent) / 2;
                fm.ascent = fm.top = rect.top;
                fm.descent = fm.bottom = (int) (drHeight / 2 - textCenter);
            } else {
                float textCenter = (float) (fmPaint.descent + fmPaint.ascent) / 2;
                fm.ascent = fm.top = (int) (textCenter - drHeight / 2);
                fm.descent = fm.bottom = (int) (drHeight + fm.ascent);
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

        int transY;
        Paint.FontMetricsInt fm = paint.getFontMetricsInt();
        if (mVerticalAlignment == ALIGN_TEXT_TOP) {
            transY = y + fm.descent + fm.ascent;
        } else {
            transY = y + (fm.descent + fm.ascent) / 2 - b.getBounds().height() / 2;
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

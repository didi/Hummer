package com.didi.hummer.adapter.imageloader.impl;

import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.load.resource.gif.GifDrawable;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.CustomTarget;
import com.bumptech.glide.request.target.Target;
import com.bumptech.glide.request.transition.Transition;
import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.imageloader.DrawableCallback;
import com.didi.hummer.adapter.imageloader.IImageLoaderAdapter;

/**
 * 默认图片加载适配器
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public class DefaultImageLoaderAdapter implements IImageLoaderAdapter {

    @Override
    public void setImage(String url, ImageView view) {
        try {
            Glide.with(view.getContext()).load(url).into(view);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setGif(String url, int repeatCount, ImageView view) {
        // 设置为无限循环
        final int fRepeatCount = repeatCount == 0 ? GifDrawable.LOOP_FOREVER : repeatCount;
        try {
            Glide.with(view.getContext()).asGif().load(url).listener(new RequestListener<GifDrawable>() {
                @Override
                public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<GifDrawable> target, boolean isFirstResource) {
                    return false;
                }

                @Override
                public boolean onResourceReady(GifDrawable resource, Object model, Target<GifDrawable> target, DataSource dataSource, boolean isFirstResource) {
                    resource.setLoopCount(fRepeatCount);
                    return false;
                }
            }).into(view);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setImage(int resId, ImageView view) {
        try {
            Glide.with(view.getContext()).load(resId).into(view);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setGif(int resId, int repeatCount, ImageView view) {
        // 设置为无限循环
        final int fRepeatCount = repeatCount == 0 ? GifDrawable.LOOP_FOREVER : repeatCount;
        try {
            Glide.with(view.getContext()).asGif().load(resId).listener(new RequestListener<GifDrawable>() {
                @Override
                public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<GifDrawable> target, boolean isFirstResource) {
                    return false;
                }

                @Override
                public boolean onResourceReady(GifDrawable resource, Object model, Target<GifDrawable> target, DataSource dataSource, boolean isFirstResource) {
                    resource.setLoopCount(fRepeatCount);
                    return false;
                }
            }).into(view);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void loadDrawable(String url, DrawableCallback callback) {
        try {
            Glide.with(HummerSDK.appContext).load(url).into(new CustomTarget<Drawable>() {
                @Override
                public void onLoadCleared(@Nullable Drawable placeholder) {

                }

                @Override
                public void onResourceReady(@NonNull Drawable resource, @Nullable Transition<? super Drawable> transition) {
                    if (callback != null) {
                        callback.onDrawableLoaded(resource);
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void loadDrawable(int resId, DrawableCallback callback) {
        try {
            Glide.with(HummerSDK.appContext).load(resId).into(new CustomTarget<Drawable>() {
                @Override
                public void onLoadCleared(@Nullable Drawable placeholder) {

                }

                @Override
                public void onResourceReady(@NonNull Drawable resource, @Nullable Transition<? super Drawable> transition) {
                    if (callback != null) {
                        callback.onDrawableLoaded(resource);
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

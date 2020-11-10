package com.didi.hummer.adapter.imageloader.impl;

import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.resource.drawable.GlideDrawable;
import com.bumptech.glide.request.animation.GlideAnimation;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;
import com.bumptech.glide.request.target.SimpleTarget;
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
        if (repeatCount == 0) {
            repeatCount = -1;
        }
        try {
            Glide.with(view.getContext()).load(url).diskCacheStrategy(DiskCacheStrategy.SOURCE).into(new GlideDrawableImageViewTarget(view, repeatCount));
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
        if (repeatCount == 0) {
            repeatCount = -1;
        }
        try {
            Glide.with(view.getContext()).load(resId).diskCacheStrategy(DiskCacheStrategy.SOURCE).into(new GlideDrawableImageViewTarget(view, repeatCount));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void loadDrawable(String url, DrawableCallback callback) {
        try {
            Glide.with(HummerSDK.appContext).load(url).into(new SimpleTarget<GlideDrawable>() {
                @Override
                public void onResourceReady(GlideDrawable resource, GlideAnimation<? super GlideDrawable> glideAnimation) {
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
            Glide.with(HummerSDK.appContext).load(resId).into(new SimpleTarget<GlideDrawable>() {
                @Override
                public void onResourceReady(GlideDrawable resource, GlideAnimation<? super GlideDrawable> glideAnimation) {
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

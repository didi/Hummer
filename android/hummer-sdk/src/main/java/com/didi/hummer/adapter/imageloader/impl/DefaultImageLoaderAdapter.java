package com.didi.hummer.adapter.imageloader.impl;

import android.annotation.SuppressLint;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.load.resource.gif.GifDrawable;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.CustomTarget;
import com.bumptech.glide.request.target.Target;
import com.bumptech.glide.request.transition.Transition;
import com.didi.hummer.HummerSDK;
import com.didi.hummer.adapter.imageloader.DrawableCallback;
import com.didi.hummer.adapter.imageloader.IImageLoaderAdapter;
import com.didi.hummer.adapter.imageloader.ImageSizeCallback;

/**
 * 默认图片加载适配器
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public class DefaultImageLoaderAdapter implements IImageLoaderAdapter {

    @Override
    public void setImage(String url, ImageView view) {
        setImage(url, null, null, view);
    }

    @SuppressLint("CheckResult")
    @Override
    public void setImage(String url, Drawable placeholder, Drawable failedImage, ImageView view) {
        try {
            RequestOptions requestOptions = new RequestOptions();
            if (view.getScaleType() == ImageView.ScaleType.CENTER) {
                requestOptions.override(Target.SIZE_ORIGINAL, Target.SIZE_ORIGINAL);
                if (placeholder != null) {
                    requestOptions.placeholder(placeholder);
                }
                if (failedImage != null) {
                    requestOptions.error(failedImage);
                }
            }
            Glide.with(view.getContext()).load(url).apply(requestOptions).into(view);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setGif(String url, int repeatCount, ImageView view) {
        setGif(url, null, null, repeatCount, view);
    }

    @SuppressLint("CheckResult")
    @Override
    public void setGif(String url, Drawable placeholder, Drawable failedImage, int repeatCount, ImageView view) {
        // 设置为无限循环
        final int fRepeatCount = repeatCount == 0 ? GifDrawable.LOOP_FOREVER : repeatCount;
        try {
            RequestOptions requestOptions = new RequestOptions();
            if (view.getScaleType() == ImageView.ScaleType.CENTER) {
                requestOptions.override(Target.SIZE_ORIGINAL, Target.SIZE_ORIGINAL);
                if (placeholder != null) {
                    requestOptions.placeholder(placeholder);
                }
                if (failedImage != null) {
                    requestOptions.error(failedImage);
                }
            }
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
        // 使用Glide加载resId图片时，.9图自动拉伸功能会失效，所以这里直接用原生加载方式
        if (view != null) {
            view.setImageResource(resId);
        }
    }

    @SuppressLint("CheckResult")
    @Override
    public void setGif(int resId, int repeatCount, ImageView view) {
        // 设置为无限循环
        final int fRepeatCount = repeatCount == 0 ? GifDrawable.LOOP_FOREVER : repeatCount;
        try {
            RequestOptions requestOptions = new RequestOptions();
            if (view.getScaleType() == ImageView.ScaleType.CENTER) {
                requestOptions.override(Target.SIZE_ORIGINAL, Target.SIZE_ORIGINAL);
            }
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
            if (callback != null) {
                callback.onDrawableLoaded(null);
            }
        }
    }

    @Override
    public void loadDrawable(int resId, DrawableCallback callback) {
        // 使用Glide加载resId图片时，.9图自动拉伸功能会失效，所以这里直接用原生加载方式
        Drawable drawable = HummerSDK.appContext.getResources().getDrawable(resId);
        if (callback != null) {
            callback.onDrawableLoaded(drawable);
        }
    }

    @Override
    public void getImageSize(String url, ImageSizeCallback callback) {
        try {
            Glide.with(HummerSDK.appContext).load(url).into(new CustomTarget<Drawable>() {
                @Override
                public void onLoadCleared(@Nullable Drawable placeholder) {

                }

                @Override
                public void onResourceReady(@NonNull Drawable resource, @Nullable Transition<? super Drawable> transition) {
                    if (callback != null) {
                        callback.onSizeReady(resource.getIntrinsicWidth(), resource.getIntrinsicHeight());
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
            if (callback != null) {
                callback.onSizeReady(0, 0);
            }
        }
    }

    @Override
    public void getImageSize(int resId, ImageSizeCallback callback) {
        try {
            Glide.with(HummerSDK.appContext).load(resId).into(new CustomTarget<Drawable>() {
                @Override
                public void onLoadCleared(@Nullable Drawable placeholder) {

                }

                @Override
                public void onResourceReady(@NonNull Drawable resource, @Nullable Transition<? super Drawable> transition) {
                    if (callback != null) {
                        callback.onSizeReady(resource.getIntrinsicWidth(), resource.getIntrinsicHeight());
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
            if (callback != null) {
                callback.onSizeReady(0, 0);
            }
        }
    }
}

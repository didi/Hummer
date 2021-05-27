package com.didi.hummer.adapter.imageloader;

import android.graphics.drawable.Drawable;
import android.widget.ImageView;

/**
 * 图片加载适配器接口
 *
 * Created by XiaoFeng on 2019-12-24.
 */
public interface IImageLoaderAdapter {

    /**
     * 设置普通图片
     *
     * @param url 图片路径（包括远程图片路径和本地图片路径）
     * @param view
     */
    void setImage(String url, ImageView view);

    /**
     * 设置普通图片
     *
     * @param url 图片路径（包括远程图片路径和本地图片路径）
     * @param placeholder 占位图
     * @param failedImage 失败图
     * @param view
     */
    void setImage(String url, Drawable placeholder, Drawable failedImage, ImageView view);

    /**
     * 设置普通图片
     *
     * @param resId 本地资源图片id
     * @param view
     */
    void setImage(int resId, ImageView view);
    
    /**
     * 设置Gif图片
     *
     * @param url 图片路径（包括远程图片路径和本地图片路径）
     * @param repeatCount 循环次数（用于Gif动画）
     * @param view
     */
    void setGif(String url, int repeatCount, ImageView view);

    /**
     * 设置Gif图片
     *
     * @param url 图片路径（包括远程图片路径和本地图片路径）
     * @param placeholder 占位图
     * @param failedImage 失败图
     * @param repeatCount 循环次数（用于Gif动画）
     * @param view
     */
    void setGif(String url, Drawable placeholder, Drawable failedImage, int repeatCount, ImageView view);

    /**
     * 设置Gif图片
     *
     * @param resId 本地资源图片id
     * @param repeatCount 循环次数（用于Gif动画）
     * @param view
     */
    void setGif(int resId, int repeatCount, ImageView view);

    /**
     * 加载图片对应的drawable
     *
     * @param url 图片路径（包括远程图片路径和本地图片路径）
     * @param callback
     */
    void loadDrawable(String url, DrawableCallback callback);

    /**
     * 加载图片对应的drawable
     *
     * @param resId 本地资源图片id
     * @param callback
     */
    void loadDrawable(int resId, DrawableCallback callback);

    /**
     * 获取图片宽高
     *
     * @param url
     * @param callback
     */
    void getImageSize(String url, ImageSizeCallback callback);

    /**
     * 获取图片宽高
     *
     * @param resId
     * @param callback
     */
    void getImageSize(int resId, ImageSizeCallback callback);
}

package com.didi.hummer.render.utility;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.text.TextUtils;
import android.util.Base64;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.imageloader.DrawableCallback;
import com.didi.hummer.adapter.imageloader.IImageLoaderAdapter;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.render.component.view.BackgroundDrawable;
import com.didi.hummer.utils.JsSourceUtil;

/**
 * Drawable帮助类
 *
 * Created by XiaoFeng on 2020-01-27.
 */
public class YogaDrawableUtil {

    public static void renderDrawable(HummerContext context, BackgroundDrawable backgroundDrawable, String imageSrc) {
        if (backgroundDrawable != null) {
            loadDrawable(context, imageSrc, backgroundDrawable::setDrawable);
        }
    }

    public static void loadDrawable(HummerContext context, String imageSrc, DrawableCallback callback) {
        if (TextUtils.isEmpty(imageSrc)) {
            if (callback != null) {
                callback.onDrawableLoaded(null);
            }
            return;
        }

        if (isRemoteImage(imageSrc)) {
            // 远程图片
            loadRemoteDrawable(context, imageSrc, callback);
        } else if (isLocalAbsoluteImage(imageSrc)) {
            // 本地缓存图片（绝对路径）
            loadLocalDrawable(context, imageSrc, callback);
        } else if (isLocalRelativeImage(imageSrc)) {
            // 相对路径图片
            int jsSourceType = JsSourceUtil.getJsSourceType(context.getJsSourcePath());
            imageSrc = JsSourceUtil.getRealResourcePath(imageSrc, context.getJsSourcePath());
            switch (jsSourceType) {
                case JsSourceUtil.JS_SOURCE_TYPE_ASSETS:
                    loadAssetsDrawable(context, imageSrc, callback);
                    break;
                case JsSourceUtil.JS_SOURCE_TYPE_FILE:
                    loadLocalDrawable(context, imageSrc, callback);
                    break;
                case JsSourceUtil.JS_SOURCE_TYPE_HTTP:
                    loadRemoteDrawable(context, imageSrc, callback);
                    break;
                default:
                    break;
            }
        } else if (isBase64Image(imageSrc)) {
            // base64格式的图片
            loadBase64Drawable(imageSrc, callback);
        } else {
            // Native环境下的资源图片（drawable目录下）
            loadResourceDrawable(context, imageSrc, callback);
        }
    }

    private static boolean isRemoteImage(String imageSrc) {
        return imageSrc != null && (imageSrc.startsWith("//") || imageSrc.toLowerCase().startsWith("http"));
    }

    private static boolean isLocalAbsoluteImage(String imageSrc) {
        return imageSrc != null && imageSrc.startsWith("/");
    }

    private static boolean isLocalRelativeImage(String imageSrc) {
        return imageSrc != null && imageSrc.startsWith("./");
    }

    private static boolean isBase64Image(String imageSrc) {
        return imageSrc != null && (imageSrc.contains("base64") || imageSrc.contains("BASE64"));
    }

    /**
     * 适配有些远程图片省略https:的情况
     */
    private static String fitRemoteUrl(String url) {
        if (!TextUtils.isEmpty(url) && url.startsWith("//")) {
            url = "https:" + url;
        }
        return url;
    }

    private static void loadRemoteDrawable(HummerContext context, String imageSrc, DrawableCallback callback) {
        if (TextUtils.isEmpty(imageSrc)) {
            return;
        }
        getImageLoader(context).loadDrawable(fitRemoteUrl(imageSrc), callback);
    }

    private static void loadLocalDrawable(HummerContext context, String imageSrc, DrawableCallback callback) {
        getImageLoader(context).loadDrawable(imageSrc, callback);
    }

    private static void loadAssetsDrawable(HummerContext context, String imageSrc, DrawableCallback callback) {
        imageSrc = "file:///android_asset/" + imageSrc;
        getImageLoader(context).loadDrawable(imageSrc, callback);
    }

    private static void loadBase64Drawable(String imageSrc, DrawableCallback callback) {
        Drawable drawable = null;
        try {
            byte[] bitmapArray = Base64.decode(imageSrc.split(",")[1], Base64.DEFAULT);
            Bitmap bitmap = BitmapFactory.decodeByteArray(bitmapArray, 0, bitmapArray.length);
            drawable = new BitmapDrawable(bitmap);
        } catch (Exception e) {}

        if (callback != null) {
            callback.onDrawableLoaded(drawable);
        }
    }

    private static void loadResourceDrawable(HummerContext context, String imageSrc, DrawableCallback callback) {
        int imageId = YogaResUtils.getResourceId(imageSrc, "drawable", null);
        getImageLoader(context).loadDrawable(imageId, callback);
    }

    private static IImageLoaderAdapter getImageLoader(HummerContext context) {
        return HummerAdapter.getImageLoaderAdapter(context.getNamespace());
    }
}

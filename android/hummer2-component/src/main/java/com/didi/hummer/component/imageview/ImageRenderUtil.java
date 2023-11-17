package com.didi.hummer.component.imageview;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.text.TextUtils;
import android.util.Base64;
import android.widget.ImageView;

import com.didi.hummer.adapter.HummerAdapter;
import com.didi.hummer.adapter.imageloader.IImageLoaderAdapter;
import com.didi.hummer.adapter.imageloader.ImageSizeCallback;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.render.utility.YogaDrawableUtil;
import com.didi.hummer.render.utility.YogaResUtils;
import com.didi.hummer.utils.JsSourceUtil;

/**
 * Created by XiaoFeng on 2020/3/20.
 */
public class ImageRenderUtil {

    public static void renderImage(HummerContext context, ImageView imageView, String imageSrc, String placeholder, String failedImage) {
        renderImage(context, imageView, imageSrc, placeholder, failedImage, false, 0, null);
    }

    public static void renderImage(HummerContext context, ImageView imageView, String imageSrc, String placeholder, String failedImage, ImageSizeCallback callback, JSCallback completeCallback) {
        renderImage(context, imageView, imageSrc, placeholder, failedImage, false, 0, completeCallback);

        if (callback != null) {
            getImageLoader(context).getImageSize(imageSrc, callback);
        }
    }

    public static void renderGif(HummerContext context, ImageView imageView, String imageSrc, String placeholder, String failedImage, int repeatCount) {
        renderImage(context, imageView, imageSrc, placeholder, failedImage, true, repeatCount, null);
    }

    public static void renderGif(HummerContext context, ImageView imageView, String imageSrc, String placeholder, String failedImage, int repeatCount, ImageSizeCallback callback, JSCallback completeCallback) {
        renderImage(context, imageView, imageSrc, placeholder, failedImage, true, repeatCount, completeCallback);

        if (callback != null) {
            getImageLoader(context).getImageSize(imageSrc, callback);
        }
    }

    private static void renderImage(HummerContext context, ImageView imageView, String imageSrc, String placeholder, String failedImage, boolean isGif, int repeatCount, JSCallback completeCallback) {
        if (imageView == null || TextUtils.isEmpty(imageSrc)) {
            return;
        }

        if (isRemoteImage(imageSrc)) {
            // 远程图片
            if (isGif) {
                renderRemoteGif(context, imageView, imageSrc, placeholder, failedImage, repeatCount, completeCallback);
            } else {
                renderRemoteImage(context, imageView, imageSrc, placeholder, failedImage, completeCallback);
            }
        } else if (isLocalAbsoluteImage(imageSrc)) {
            // 本地缓存图片（绝对路径）
            if (isGif) {
                renderLocalGif(context, imageView, imageSrc, repeatCount, completeCallback);
            } else {
                renderLocalImage(context, imageView, imageSrc, completeCallback);
            }
        } else if (isLocalRelativeImage(imageSrc)) {
            // 相对路径图片
            int jsSourceType = JsSourceUtil.getJsSourceType(context.getJsSourcePath());
            imageSrc = JsSourceUtil.getRealResourcePath(imageSrc, context.getJsSourcePath());
            switch (jsSourceType) {
                case JsSourceUtil.JS_SOURCE_TYPE_ASSETS:
                    if (isGif) {
                        renderAssetsGif(context, imageView, imageSrc, repeatCount, completeCallback);
                    } else {
                        renderAssetsImage(context, imageView, imageSrc, completeCallback);
                    }
                    break;
                case JsSourceUtil.JS_SOURCE_TYPE_FILE:
                    if (isGif) {
                        renderLocalGif(context, imageView, imageSrc, repeatCount, completeCallback);
                    } else {
                        renderLocalImage(context, imageView, imageSrc, completeCallback);
                    }
                    break;
                case JsSourceUtil.JS_SOURCE_TYPE_HTTP:
                    if (isGif) {
                        renderRemoteGif(context, imageView, imageSrc, placeholder, failedImage, repeatCount, completeCallback);
                    } else {
                        renderRemoteImage(context, imageView, imageSrc, placeholder, failedImage, completeCallback);
                    }
                    break;
                default:
                    break;
            }
        } else if (isBase64Image(imageSrc)) {
            // base64格式的图片
            renderBase64Image(imageView, imageSrc, completeCallback);
        } else {
            // Native环境下的资源图片（drawable目录下）
            if (isGif) {
                renderResourceGif(context, imageView, imageSrc, repeatCount, completeCallback);
            } else {
                renderResourceImage(context, imageView, imageSrc, completeCallback);
            }
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

    private static void renderRemoteImage(HummerContext context, ImageView imageView, String imageSrc, String placeholder, String failedImage, JSCallback callback) {
        if (TextUtils.isEmpty(imageSrc)) {
            return;
        }
        YogaDrawableUtil.loadDrawable(context, placeholder, drawable1 -> {
            YogaDrawableUtil.loadDrawable(context, failedImage, drawable2 -> {
                getImageLoader(context).setImage(fitRemoteUrl(imageSrc), drawable1, drawable2, imageView, callback);
            });
        });
    }

    private static void renderLocalImage(HummerContext context, ImageView imageView, String imageSrc, JSCallback completeCallback) {
        getImageLoader(context).setImage(imageSrc, imageView, completeCallback);
    }

    private static void renderAssetsImage(HummerContext context, ImageView imageView, String imageSrc, JSCallback completeCallback) {
        imageSrc = "file:///android_asset/" + imageSrc;
        getImageLoader(context).setImage(imageSrc, imageView, completeCallback);
    }

    private static void renderBase64Image(ImageView imageView, String imageSrc, JSCallback completeCallback) {
        try {
            byte[] bitmapArray = Base64.decode(imageSrc.split(",")[1], Base64.DEFAULT);
            Bitmap bitmap = BitmapFactory.decodeByteArray(bitmapArray, 0, bitmapArray.length);
            imageView.setImageBitmap(bitmap);
            if (completeCallback != null) {
                completeCallback.call(2, true);
            }
        } catch (Exception e) {
            if (completeCallback != null) {
                completeCallback.call(0, false);
            }
        }
    }

    private static void renderResourceImage(HummerContext context, ImageView imageView, String imageSrc, JSCallback completeCallback) {
        int imageId = YogaResUtils.getResourceId(imageSrc, "drawable", null);
        getImageLoader(context).setImage(imageId, imageView, completeCallback);
    }

    private static void renderRemoteGif(HummerContext context, ImageView imageView, String imageSrc, String placeholder, String failedImage, int repeatCount, JSCallback completeCallback) {
        if (TextUtils.isEmpty(imageSrc)) {
            return;
        }
        getImageLoader(context).setGif(fitRemoteUrl(imageSrc), repeatCount, imageView, completeCallback);
    }

    private static void renderLocalGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount, JSCallback completeCallback) {
        getImageLoader(context).setGif(imageSrc, repeatCount, imageView, completeCallback);
    }

    private static void renderAssetsGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount, JSCallback completeCallback) {
        imageSrc = "file:///android_asset/" + imageSrc;
        getImageLoader(context).setGif(imageSrc, repeatCount, imageView, completeCallback);
    }

    private static void renderResourceGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount, JSCallback completeCallback) {
        int imageId = YogaResUtils.getResourceId(imageSrc, "drawable", null);
        getImageLoader(context).setGif(imageId, repeatCount, imageView, completeCallback);
    }

    private static IImageLoaderAdapter getImageLoader(HummerContext context) {
        return HummerAdapter.getImageLoaderAdapter(context.getNamespace());
    }
}

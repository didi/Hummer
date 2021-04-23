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
import com.didi.hummer.render.utility.YogaResUtils;
import com.didi.hummer.utils.JsSourceUtil;

/**
 * Created by XiaoFeng on 2020/3/20.
 */
public class ImageRenderUtil {

    public static void renderImage(HummerContext context, ImageView imageView, String imageSrc) {
        renderImage(context, imageView, imageSrc, false, 0);
    }

    public static void renderImage(HummerContext context, ImageView imageView, String imageSrc, ImageSizeCallback callback) {
        renderImage(context, imageView, imageSrc, false, 0);

        if (callback != null) {
            getImageLoader(context).getImageSize(imageSrc, callback);
        }
    }

    public static void renderGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount) {
        renderImage(context, imageView, imageSrc, true, repeatCount);
    }

    public static void renderGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount, ImageSizeCallback callback) {
        renderImage(context, imageView, imageSrc, true, repeatCount);

        if (callback != null) {
            getImageLoader(context).getImageSize(imageSrc, callback);
        }
    }

    private static void renderImage(HummerContext context, ImageView imageView, String imageSrc, boolean isGif, int repeatCount) {
        if (imageView == null || TextUtils.isEmpty(imageSrc)) {
            return;
        }

        if (isRemoteImage(imageSrc)) {
            // 远程图片
            if (isGif) {
                renderRemoteGif(context, imageView, imageSrc, repeatCount);
            } else {
                renderRemoteImage(context, imageView, imageSrc);
            }
        } else if (isLocalAbsoluteImage(imageSrc)) {
            // 本地缓存图片（绝对路径）
            if (isGif) {
                renderLocalGif(context, imageView, imageSrc, repeatCount);
            } else {
                renderLocalImage(context, imageView, imageSrc);
            }
        } else if (isLocalRelativeImage(imageSrc)) {
            // 相对路径图片
            int jsSourceType = JsSourceUtil.getJsSourceType(context.getJsSourcePath());
            imageSrc = JsSourceUtil.getRealResourcePath(imageSrc, context.getJsSourcePath());
            switch (jsSourceType) {
                case JsSourceUtil.JS_SOURCE_TYPE_ASSETS:
                    if (isGif) {
                        renderAssetsGif(context, imageView, imageSrc, repeatCount);
                    } else {
                        renderAssetsImage(context, imageView, imageSrc);
                    }
                    break;
                case JsSourceUtil.JS_SOURCE_TYPE_FILE:
                    if (isGif) {
                        renderLocalGif(context, imageView, imageSrc, repeatCount);
                    } else {
                        renderLocalImage(context, imageView, imageSrc);
                    }
                    break;
                case JsSourceUtil.JS_SOURCE_TYPE_HTTP:
                    if (isGif) {
                        renderRemoteGif(context, imageView, imageSrc, repeatCount);
                    } else {
                        renderRemoteImage(context, imageView, imageSrc);
                    }
                    break;
                default:
                    break;
            }
        } else if (isBase64Image(imageSrc)) {
            // base64格式的图片
            renderBase64Image(imageView, imageSrc);
        } else {
            // Native环境下的资源图片（drawable目录下）
            if (isGif) {
                renderResourceGif(context, imageView, imageSrc, repeatCount);
            } else {
                renderResourceImage(context, imageView, imageSrc);
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

    private static void renderRemoteImage(HummerContext context, ImageView imageView, String imageSrc) {
        if (TextUtils.isEmpty(imageSrc)) {
            return;
        }

        // 适配有些远程图片省略https:的情况
        if (imageSrc.startsWith("//")) {
            imageSrc = "https:" + imageSrc;
        }

        getImageLoader(context).setImage(imageSrc, imageView);
    }

    private static void renderLocalImage(HummerContext context, ImageView imageView, String imageSrc) {
        getImageLoader(context).setImage(imageSrc, imageView);
    }

    private static void renderAssetsImage(HummerContext context, ImageView imageView, String imageSrc) {
        imageSrc = "file:///android_asset/" + imageSrc;
        getImageLoader(context).setImage(imageSrc, imageView);
    }

    private static void renderBase64Image(ImageView imageView, String imageSrc) {
        try {
            byte[] bitmapArray = Base64.decode(imageSrc.split(",")[1], Base64.DEFAULT);
            Bitmap bitmap = BitmapFactory.decodeByteArray(bitmapArray, 0, bitmapArray.length);
            imageView.setImageBitmap(bitmap);
        } catch (Exception e) {}
    }

    private static void renderResourceImage(HummerContext context, ImageView imageView, String imageSrc) {
        int imageId = YogaResUtils.getResourceId(imageSrc, "drawable", null);
        getImageLoader(context).setImage(imageId, imageView);
    }

    private static void renderRemoteGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount) {
        if (TextUtils.isEmpty(imageSrc)) {
            return;
        }

        // 适配有些远程图片省略https:的情况
        if (imageSrc.startsWith("//")) {
            imageSrc = "https:" + imageSrc;
        }

        getImageLoader(context).setGif(imageSrc, repeatCount, imageView);
    }

    private static void renderLocalGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount) {
        getImageLoader(context).setGif(imageSrc, repeatCount, imageView);
    }

    private static void renderAssetsGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount) {
        imageSrc = "file:///android_asset/" + imageSrc;
        getImageLoader(context).setGif(imageSrc, repeatCount, imageView);
    }

    private static void renderResourceGif(HummerContext context, ImageView imageView, String imageSrc, int repeatCount) {
        int imageId = YogaResUtils.getResourceId(imageSrc, "drawable", null);
        getImageLoader(context).setGif(imageId, repeatCount, imageView);
    }

    private static IImageLoaderAdapter getImageLoader(HummerContext context) {
        return HummerAdapter.getImageLoaderAdapter(context.getNamespace());
    }
}

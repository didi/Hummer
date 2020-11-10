package com.didi.hummer.utils;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.blankj.utilcode.util.ResourceUtils;
import com.didi.hummer.HummerSDK;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by XiaoFeng on 2020/3/20.
 */
public class AssetsUtil {

    public static String readFile(String path) {
        return ResourceUtils.readAssets2String(path);
    }

    public static Bitmap loadBitmap(String path) {
        Bitmap image = null;
        AssetManager am = HummerSDK.appContext.getResources().getAssets();
        try {
            InputStream stream = am.open(path);
            image = BitmapFactory.decodeStream(stream);
            stream.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return image;
    }
}

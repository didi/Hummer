package com.didi.hummer.utils;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.didi.hummer.HummerSDK;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

/**
 * Created by XiaoFeng on 2020/3/20.
 */
public class AssetsUtil {

    public static String readFile(String path) {
        return readFile(HummerSDK.appContext, path);
    }

    public static String readFile(Context context, String path) {
        try {
            InputStream inputStream = context.getAssets().open(path);
            InputStreamReader inputStreamReader = null;
            try {
                inputStreamReader = new InputStreamReader(inputStream, "UTF-8");
            } catch (UnsupportedEncodingException e1) {
                e1.printStackTrace();
            }
            BufferedReader reader = new BufferedReader(inputStreamReader);
            StringBuffer sb = new StringBuffer();
            String line;
            try {
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                    sb.append("\n");
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            return sb.toString();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        return null;
    }

    public static Bitmap loadBitmap(String path) {
        Bitmap image = null;
        AssetManager am = HummerSDK.appContext.getAssets();
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

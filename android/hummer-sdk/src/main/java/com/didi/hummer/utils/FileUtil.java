package com.didi.hummer.utils;

import android.content.Context;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;

import com.didi.hummer.HummerSDK;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by XiaoFeng on 2020/3/20.
 */
public class FileUtil {
    private static final String TAG = FileUtil.class.getSimpleName();
    
    public static final String NO_FILE_NAME_PREFIX = ".out";

    public static String readFile(String filePath) {
        StringBuilder sb = new StringBuilder();
        InputStreamReader inputStreamReader = null;
        try {
            inputStreamReader = new InputStreamReader(new FileInputStream(filePath), "utf-8");
            BufferedReader reader = new BufferedReader(inputStreamReader);
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
                sb.append("\n");
            }
        } catch (Exception e1) {
            e1.printStackTrace();
        } finally {
            try {
                if (inputStreamReader != null) {
                    inputStreamReader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return sb.toString();
    }

    public static String readFile(File file) {
        return readFile(file.getAbsolutePath());
    }

    /**
     * 防止文件重名处理
     *
     * @param filePath 相对目录/文件名
     * @param key      关键字,例如url,用来生成md5,防止文件重名
     * @return 拼接了md5的相对目录名
     */
    public static String processFilePathName(String filePath, String key) {
        String filePathName = "";
        if (TextUtils.isEmpty(filePath) && TextUtils.isEmpty(key)) {
            return filePathName;
        }

        try {
            String fmd5 = MD5Utils.md5(key.getBytes(MD5Utils.PROTOCOL_CHARSET));
            String[] pathSplits = filePath.split(File.separator);
            String fileName = pathSplits[pathSplits.length - 1];
            if (!fileName.startsWith(".") && fileName.contains(".")) { // 有文件名
                String fileNameWithoutSuffix = fileName.substring(0, fileName.indexOf("."));
                filePathName = filePath.replace(fileNameWithoutSuffix, fileNameWithoutSuffix + "_" + fmd5);
            } else { // 仅有相对目录
                if (filePath.endsWith(File.separator)) {
                    filePathName = filePath + fmd5 + NO_FILE_NAME_PREFIX;
                } else {
                    filePathName = filePath + File.separator + fmd5 + NO_FILE_NAME_PREFIX;
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "processFilePathName md5 error " + e.getMessage());
        }
        Log.d(TAG, "processFilePathName filePathName = " + filePathName);
        return filePathName;
    }

    /**
     * 获取内部缓存目录
     *
     * @param context 上下文
     * @param type    内部缓存目录下一级目标目录名
     * @return 内部缓存目录
     */
    public static File getInternalCacheDirectory(Context context, String type) {
        File appCacheDir = null;
        if (TextUtils.isEmpty(type)) {
            appCacheDir = context.getCacheDir();
        } else {
            appCacheDir = new File(context.getCacheDir(), type);
        }

        if (!appCacheDir.exists() && !appCacheDir.mkdirs()) {
            Log.e(TAG, "getInternalCacheDirectory file system maybe has exception");
        }

        return appCacheDir;
    }

    /**
     * 获取文件绝对路径
     *
     * @param sdCardDir 根目录
     * @param filePath  文件相对路径
     * @return 文件绝对路径完整名.
     */
    public static String getFullAbsoluteFileName(String sdCardDir, @NonNull String filePath) {
        Log.d(TAG, "getFullAbsoluteFileName sdCardDir = " + sdCardDir + " filePath " + filePath);
        if (TextUtils.isEmpty(sdCardDir)) {
            sdCardDir = getInternalCacheDirectory(HummerSDK.appContext, "Downloads").getAbsolutePath();
        }

        if (!sdCardDir.endsWith(File.separator)) {
            sdCardDir = sdCardDir + File.separator;
        }

        String fullFilePath = sdCardDir;
        if (filePath.startsWith(File.separator)) {
            filePath = filePath.substring(1);
        }
        fullFilePath = fullFilePath + filePath;

        return fullFilePath;
    }
}

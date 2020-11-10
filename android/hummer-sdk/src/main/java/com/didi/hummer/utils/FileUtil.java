package com.didi.hummer.utils;

import com.blankj.utilcode.util.FileIOUtils;

import java.io.File;

/**
 * Created by XiaoFeng on 2020/3/20.
 */
public class FileUtil {

    public static String readFile(String filePath) {
        return FileIOUtils.readFile2String(filePath);
    }

    public static String readFile(File file) {
        return FileIOUtils.readFile2String(file);
    }
}

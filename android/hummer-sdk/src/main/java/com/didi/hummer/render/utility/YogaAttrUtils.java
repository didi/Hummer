package com.didi.hummer.render.utility;

import android.graphics.Color;

/**
 * Created by XiaoFeng on 2019-10-20.
 */
public class YogaAttrUtils {

    /**
     * 判断string是否含有数字
     *
     * @param value 字符串
     * @return bool
     */
    public static boolean isNumeric(String value) {
        return value.matches("^-?\\d+(\\.\\d+)?$"); // 耗性能 1ms
    }

    /**
     * 判断string是否带px单位的数字
     *
     * @param value 字符串
     * @return bool
     */
    public static boolean isPxNumeric(String value) {
        return value.matches("^-?\\d+(\\.\\d+)?(px|PX)$"); // 耗性能 1ms
    }

    /**
     * 判断string是否带hm单位的数字
     *
     * @param value 字符串
     * @return bool
     */
    public static boolean isHmNumeric(String value) {
        return value.matches("^-?\\d+(\\.\\d+)?(hm|HM)$"); // 耗性能 1ms
    }

    /**
     * 判断string是否是颜色
     *
     * @param color 颜色值
     * @return bool
     */
    public static boolean isColor(String color) {
//        return color.matches("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$"); // 耗性能 1ms
        return color.charAt(0) == '#' && (color.length() == 7 || color.length() == 9);
    }

    /**
     * 判断string是否是24位颜色（rgb: #FFFFFF）
     *
     * @param color 颜色值
     * @return bool
     */
    public static boolean isColor24(String color) {
//        return color.matches("^#([0-9a-fA-F]{6})$"); // 耗性能 1ms
        return color.charAt(0) == '#' && color.length() == 7;
    }

    /**
     * 判断string是否是32位颜色（argb #FFFFFFFF）【耗性能 1ms】
     *
     * @param value 颜色值
     * @return bool
     */
    public static boolean isColor32(String value) {
//        return value.matches("^#([0-9a-fA-F]{8})$"); // 耗性能 1ms
        return value.charAt(0) == '#' && value.length() == 9;
    }

    /**
     * 判断string是否是渐变颜色【耗性能 1ms】
     *
     * @param color 颜色值
     * @return bool
     */
    public static boolean isLinearGradientColor(String color) {
//        return color.matches("^linear-gradient\\(\\d+deg(\\s+#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})){2}\\)$");
        return color.startsWith("linear-gradient");
    }

    /**
     * 解析颜色值（会自动转换24位或者32位的颜色值，32位颜色值最终转成RGBA）
     *
     * @param strColor
     * @return
     */
    public static int parseColor(String strColor) {
        int color = Color.TRANSPARENT;
        try {
            color = Color.parseColor(strColor);
        } catch (Exception e) {}
        if (strColor.length() == 9) {
            color = YogaColorUtils.rgba2argb(color);
        }
        return color;
    }

    /**
     * 解析渐变颜色值
     *
     * @param strColor
     * @return
     */
    public static int[] parseLinearGradientColor(String strColor) {
        strColor = strColor.replace("linear-gradient(", "");
        strColor = strColor.replace("deg", "");
        strColor = strColor.replace(")", "").trim();
        String[] array = strColor.split("\\s+");
        int[] colors = new int[array.length];
        colors[0] = Integer.parseInt(array[0]) % 360;
        for (int i = 1; i < colors.length; i++) {
            colors[i] = parseColor(array[i]);
        }
        return colors;
    }
}

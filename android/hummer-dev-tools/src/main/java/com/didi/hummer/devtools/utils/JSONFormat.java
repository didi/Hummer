package com.didi.hummer.devtools.utils;

/**
 * JSON字符串格式化工具类
 *
 * Created by XiaoFeng on 2020/5/1.
 */
public class JSONFormat {

    public static String format(String json) {
        StringBuilder source = new StringBuilder(json);
        if (json == null || json.isEmpty()) {
            return null;
        }
        // 目标字符串插入空格偏移量
        int offset = 0;
        // 空格偏移量
        int bOffset = 0;
        for (int i = 0; i < json.length(); i++) {
            char charAt = json.charAt(i);
            if (charAt == '{' || charAt == '[') {
                bOffset += 4;
                source.insert(i + offset + 1, "\n" + generateBlank(bOffset));
                offset += (bOffset + 1);
            } else if (charAt == ',') {
                source.insert(i + offset + 1, "\n" + generateBlank(bOffset));
                offset += (bOffset + 1);
            } else if (charAt == '}' || charAt == ']') {
                bOffset -= 4;
                source.insert(i + offset, "\n" + generateBlank(bOffset));
                offset += (bOffset + 1);
            }
        }
        return source.toString();
    }

    private static String generateBlank(int num) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < num; i++) {
            sb.append(" ");
        }
        return sb.toString();
    }
}

package com.didi.hummer.utils;

import android.text.TextUtils;
import android.util.Log;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Utils {
    private static final String TAG = "MD5Utils";
    public static final String PROTOCOL_CHARSET = "UTF-8";

    public MD5Utils() {
    }

    public static String md5(String content, String charset) throws UnsupportedEncodingException {
        return md5(content.getBytes(charset));
    }

    public static String md5(String content) {
        return TextUtils.isEmpty(content) ? null : md5(content.getBytes(Charset.forName("utf-8")));
    }

    public static String md5(byte[] bytes) {
        StringBuilder sb = new StringBuilder();

        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(bytes);
            byte[] m = md5.digest();
            byte[] var4 = m;
            int var5 = m.length;

            for(int var6 = 0; var6 < var5; ++var6) {
                byte b = var4[var6];
                sb.append(Character.forDigit((b & 240) >> 4, 16));
                sb.append(Character.forDigit(b & 15, 16));
            }
        } catch (NoSuchAlgorithmException var8) {
            Log.e("MD5Utils", "no md5 algorithm", var8);
        } catch (Exception var9) {
            Log.e("MD5Utils", "fail to encrypt content with md5 algorithm", var9);
        }

        return sb.toString();
    }

    private static byte[] hexToBytes(String hex) {
        if (TextUtils.isEmpty(hex)) {
            return null;
        } else {
            int len = hex.length();
            byte[] data = new byte[len / 2];

            for(int i = 0; i < len; i += 2) {
                data[i / 2] = (byte)((Character.digit(hex.charAt(i), 16) << 4) + Character.digit(hex.charAt(i + 1), 16));
            }

            return data;
        }
    }

}

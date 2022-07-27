package com.didi.hummer.core.util;

import android.text.TextUtils;
import android.util.LruCache;

/**
 * 用于缓存字节码的LRU缓存
 *
 * Created by XiaoFeng on 2022/7/13.
 */
public class BytecodeCacheUtil {

   // 获取系统分配给每个应用程序的最大内存，单位为 byte
   private static final int maxMemory = (int) (Runtime.getRuntime().maxMemory());
   // 取最大内存的 1/8 作为缓存容量
   private static final int cacheSize = maxMemory / 8;

   private static LruCache<String, byte[]> bytecodeCache = new LruCache<String, byte[]>(cacheSize) {
      // 重写 sizeOf 方法，来测量每个 bytecode 的大小
      @Override
      protected int sizeOf(String key, byte[] bytecode) {
         return bytecode.length;
      }
   };

   public static void putBytecode(String key, byte[] bytecode) {
      if (TextUtils.isEmpty(key)) {
         return;
      }
      if (bytecode != null && bytecode.length > 0) {
         bytecodeCache.put(key, bytecode);
      }
   }

   public static byte[] getBytecode(String key) {
      if (TextUtils.isEmpty(key)) {
         return null;
      }
      return bytecodeCache.get(key);
   }

   public static void removeBytecode(String key) {
      if (TextUtils.isEmpty(key)) {
         return;
      }
      bytecodeCache.remove(key);
   }

   public static boolean contains(String key) {
      if (TextUtils.isEmpty(key)) {
         return false;
      }
      return bytecodeCache.snapshot().containsKey(key);
   }
}

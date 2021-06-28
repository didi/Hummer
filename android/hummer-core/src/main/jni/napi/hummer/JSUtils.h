//
// Created by XiaoFeng on 2021/6/24.
//

#ifndef ANDROID_JSUTILS_H
#define ANDROID_JSUTILS_H

#include <jni.h>
#include <js_native_api.h>
#include <map>

class JSUtils {

public:
    static NAPIEnv toJsContext(long envPtr);
    static long toJsContextPtr(NAPIEnv env);
    static void removeJSContext(long envPtr);
    static NAPIRef toJsValueRef(long valuePtr);
    static long toJsValuePtr(NAPIRef valueRef);
    static long toJsValuePtr(NAPIEnv env, NAPIValue value);
    static NAPIValue toJsValue(NAPIEnv env, long valuePtr);
    static NAPIValue getJsValueFromRef(NAPIEnv env, NAPIRef valueRef);
    static NAPIRef createJsValueRef(NAPIEnv env, NAPIValue value);
    static NAPIRef createJsValueRef(NAPIEnv env, NAPIValue value, long count);

    static const char *toCString(NAPIEnv env, NAPIValue value);
    static jstring toJavaString(NAPIEnv env, NAPIValue value);

    static NAPIValue createJsGlobal(NAPIEnv env);
    static NAPIValue createJsNull(NAPIEnv env);
    static NAPIValue createJsUndefined(NAPIEnv env);

private:
    static long idCachedContext;
    static std::map<long, NAPIEnv> cachedJSContext;
};


#endif //ANDROID_JSUTILS_H

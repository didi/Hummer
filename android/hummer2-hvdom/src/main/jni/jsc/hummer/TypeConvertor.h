//
// Created by maxiee on 2019-08-05.
//

#ifndef NATIVE_JS_ANDROID_TYPECONVERTOR_H
#define NATIVE_JS_ANDROID_TYPECONVERTOR_H


#include <jni.h>
#include "../JavaScriptCore/include/JavaScript.h"
#include "HummerJNI.h"
#include <string>
#include "JSException.h"
#include "JSCCache.h"


class TypeConvertor {
public:
    static jstring JSString2JavaString(JSContextRef ctx, JSStringRef value);

    static char* JSString2CharArray(JSContextRef ctx, JSStringRef value);
};


#endif //NATIVE_JS_ANDROID_TYPECONVERTOR_H

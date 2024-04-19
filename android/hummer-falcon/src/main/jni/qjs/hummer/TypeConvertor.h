//
// Created by maxiee on 2019-08-05.
//

#ifndef NATIVE_JS_ANDROID_TYPECONVERTOR_H
#define NATIVE_JS_ANDROID_TYPECONVERTOR_H


#include <jni.h>
#include <string>
#include <quickjs.h>


class TypeConvertor {
public:
    static jstring JSString2JavaString(JSContext* ctx, JSValue value);
};


#endif //NATIVE_JS_ANDROID_TYPECONVERTOR_H

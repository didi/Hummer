//
// Created by XiaoFeng on 2019-09-26.
//

#ifndef NATIVE_JS_ANDROID_JSEXCEPTION_H
#define NATIVE_JS_ANDROID_JSEXCEPTION_H

#include <jni.h>
#include <quickjs.h>
#include <HummerJNI.h>
#include <TypeConvertor.h>

extern "C"
void reportExceptionIfNeed(JSContext *context);

#endif //NATIVE_JS_ANDROID_JSEXCEPTION_H
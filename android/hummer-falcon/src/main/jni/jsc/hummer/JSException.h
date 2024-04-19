//
// Created by XiaoFeng on 2019-09-26.
//

#ifndef NATIVE_JS_ANDROID_JSEXCEPTION_H
#define NATIVE_JS_ANDROID_JSEXCEPTION_H

#include <jni.h>
#include "../JavaScriptCore/include/JavaScript.h"
#include "HummerJNI.h"

extern "C"
void reportException(JSContextRef jsContext, JSValueRef exception);

#endif //NATIVE_JS_ANDROID_JSEXCEPTION_H
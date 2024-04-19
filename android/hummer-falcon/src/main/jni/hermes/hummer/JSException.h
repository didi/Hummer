//
// Created by XiaoFeng on 2020-08-21.
//

#ifndef NATIVE_JS_ANDROID_JSEXCEPTION_H
#define NATIVE_JS_ANDROID_JSEXCEPTION_H

#include <jni.h>
#include <hermes.h>
#include <jsi.h>
#include "HummerJNI.h"
#include "TypeConvertor.h"

using namespace facebook::hermes;
using namespace facebook::jsi;

extern "C"
void reportException(std::shared_ptr<HermesRuntime> runtime, const char* exception);

#endif //NATIVE_JS_ANDROID_JSEXCEPTION_H
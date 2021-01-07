//
// Created by XiaoFeng on 2020/8/28.
//

#ifndef NATIVE_JS_ANDROID_INSPECTORCONNECTION_H
#define NATIVE_JS_ANDROID_INSPECTORCONNECTION_H

#include <jni.h>

#include <hermes/hermes.h>

using namespace facebook::hermes;

class InspectorConnection {
public:
    static void enableDebugging(std::shared_ptr<HermesRuntime> runtime, std::string pageTitle);
    static void disableDebugging(HermesRuntime& runtime);
};

#endif //NATIVE_JS_ANDROID_INSPECTORCONNECTION_H

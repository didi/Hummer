//
// Created by didi on 2024/3/28.
//

#include <jni.h>
#include "HMConsoleHandler.h"
#include "FalconContext.h"

HMConsoleHandler::HMConsoleHandler(F4NContext *f4NContext) {
    f4NContext_ = f4NContext;
}


void HMConsoleHandler::log(int level, string value) {
    FalconContext::printJsLog((jobject) f4NContext_->nativeContext, level, value);

//    FalconContext::onCatchJsException((jobject) f4NContext_->nativeContext, value);
//    FalconContext::printNativeLog((jobject) f4NContext_->nativeContext, level, value);
//    JsiObject *object = new JsiObject();
//    object->setValue("name", new JsiString("zhangjun2"));
//    object->setValue("code", new JsiNumber(100));
//    FalconContext::onTraceEvent((jobject) f4NContext_->nativeContext, "", object);
}


HMConsoleHandler::~HMConsoleHandler() {
    f4NContext_ = nullptr;
}

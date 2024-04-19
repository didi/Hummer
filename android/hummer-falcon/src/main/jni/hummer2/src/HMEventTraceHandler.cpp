//
// Created by didi on 2024/3/28.
//
#include <jni.h>
#include "HMEventTraceHandler.h"
#include "FalconContext.h"

HMEventTraceHandler::HMEventTraceHandler(F4NContext *f4NContext) {
    f4NContext_ = f4NContext;
}

void HMEventTraceHandler::onTraceEvent(string event, JsiValue *value) {
    FalconContext::onTraceEvent((jobject) f4NContext_->nativeContext, event, value);
}

HMEventTraceHandler::~HMEventTraceHandler() {
    f4NContext_ = nullptr;
}

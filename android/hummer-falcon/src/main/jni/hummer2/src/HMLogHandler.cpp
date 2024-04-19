//
// Created by didi on 2024/3/28.
//

#include <jni.h>
#include "HMLogHandler.h"
#include "FalconContext.h"

HMLogHandler::HMLogHandler(F4NContext *f4NContext) {
    f4NContext_ = f4NContext;
}

void HMLogHandler::log(int level, string value) {
    FalconContext::printNativeLog((jobject) f4NContext_->nativeContext, level, value);
}

HMLogHandler::~HMLogHandler() {
    f4NContext_ = nullptr;
}

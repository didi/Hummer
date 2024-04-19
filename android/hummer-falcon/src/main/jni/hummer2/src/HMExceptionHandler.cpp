//
// Created by didi on 2024/3/28.
//

#include <jni.h>
#include "HMExceptionHandler.h"
#include "FalconContext.h"

HMExceptionHandler::HMExceptionHandler(F4NContext *f4NContext) {
    f4NContext_ = f4NContext;
}

void HMExceptionHandler::onThrowException(string value) {
    FalconContext::onCatchJsException((jobject) f4NContext_->nativeContext, value);
}

HMExceptionHandler::~HMExceptionHandler() {
    f4NContext_ = nullptr;
}

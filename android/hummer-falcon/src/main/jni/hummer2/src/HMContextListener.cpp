//
// Created by didi on 2024/5/9.
//

#include <jni.h>
#include "FalconContext.h"
#include "HMContextListener.h"

HMContextListener::HMContextListener(F4NContext *f4NContext) {
    this->f4NContext = f4NContext;
}

void HMContextListener::onContextCreate() {
    FalconContext::onContextStateChanged((jobject) f4NContext->nativeContext, STATE_ON_CONTEXT_CREATE);
}

void HMContextListener::onContextStart() {
    FalconContext::onContextStateChanged((jobject) f4NContext->nativeContext, STATE_ON_CONTEXT_START);
}

void HMContextListener::onContextStop() {
    FalconContext::onContextStateChanged((jobject) f4NContext->nativeContext, STATE_ON_CONTEXT_STOP);
}

void HMContextListener::onContextDestroy() {
    FalconContext::onContextStateChanged((jobject) f4NContext->nativeContext, STATE_ON_CONTEXT_DESTROY);
}

HMContextListener::~HMContextListener() {
    f4NContext = nullptr;
}

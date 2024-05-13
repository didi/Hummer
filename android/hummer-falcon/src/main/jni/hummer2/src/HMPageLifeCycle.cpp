//
// Created by didi on 2024/5/9.
//

#include <jni.h>
#include "FalconContext.h"
#include "HMPageLifeCycle.h"

HMPageLifeCycle::HMPageLifeCycle(F4NContext *f4NContext) {
    this->f4NContext = f4NContext;
}

void HMPageLifeCycle::onCreate() {
    FalconContext::onReceivePageLifeCycle((jobject) f4NContext->nativeContext, PAGE_EVENT_ON_CREATE);
}

void HMPageLifeCycle::onAppear() {
    FalconContext::onReceivePageLifeCycle((jobject) f4NContext->nativeContext, PAGE_EVENT_ON_APPEAR);
}

void HMPageLifeCycle::onDisappear() {
    FalconContext::onReceivePageLifeCycle((jobject) f4NContext->nativeContext, PAGE_EVENT_ON_DISAPPEAR);
}

void HMPageLifeCycle::onDestroy() {
    FalconContext::onReceivePageLifeCycle((jobject) f4NContext->nativeContext, PAGE_EVENT_ON_DESTROY);
}

void HMPageLifeCycle::onBack() {
    FalconContext::onReceivePageLifeCycle((jobject) f4NContext->nativeContext, PAGE_EVENT_ON_BACK);
}

HMPageLifeCycle::~HMPageLifeCycle() {
    this->f4NContext = nullptr;
}

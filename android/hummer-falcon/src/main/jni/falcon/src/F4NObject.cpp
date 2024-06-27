//
// Created by didi on 2023/12/3.
//

#include "falcon/F4NObject.h"
#include "falcon/F4NComponent.h"


F4NObject::F4NObject(JsiContext *context) {
    jsiContext = context;
    object = context->createObject("Object");
}


void F4NObject::onCreate(string tag, JsiValue *props) {
    this->tag = tag;
    this->props = props;
    props->protect();

    if (FALCON_LOG_ENABLE) {
        info("F4NObject::onCreate tag=%s,props=%s,count=%d", tag.c_str(), props->toString().c_str(), refCount);
    }

    finalize = jsiContext->createExternal(this, finalizeWrapper, getFinalizeHint());
    object->setProperty("__finalize__", finalize);
    jsBinding = true;
    //需要主动释放引用，释放引用才能触发回收资源
    finalize->release();
}

void *F4NObject::getFinalizeHint() {
    return object;
}

JsiObjectRef *F4NObject::getJsObject() {
    return object;
}

void F4NObject::onJsiFinalize(void *finalizeData, void *finalizeHint) {
    if (JSI_DEBUG_MEMORY) {
        info("F4NObject::onJsiFinalize tag=%s,props=%s", tag.c_str(), props->toString().c_str());
    }
    jsBinding = false;
    if (refCount <= 0) {
        delete this;
    }
}

void F4NObject::protect() {
    if (FALCON_LOG_ENABLE) {
        info("F4NObject::protect tag=%s,props=%s,count=%d", tag.c_str(), props->toString().c_str(), refCount);
    }
    refCount++;
}

void F4NObject::unprotect() {
    if (FALCON_LOG_ENABLE) {
        info("F4NObject::unprotect tag=%s,props=%s,count=%d", tag.c_str(), props->toString().c_str(), refCount);
    }
    refCount--;
    if (refCount <= 0 && !jsBinding) {
        if (!destroyed) {
            onDestroy();
        }
        delete this;
    }
}


void F4NObject::onDestroy() {
    destroyed = true;
    object->release();
}

/**
 * 释放JS资源,先调用onDestroy(),然后release(),然后释放内存
 */
void F4NObject::release() {
    if (FALCON_LOG_ENABLE) {
        info("F4NObject::release() tag=%s,props=%s,count=%d", tag.c_str(), props->toString().c_str(), refCount);
    }
    if (!destroyed) {
        onDestroy();
    }
}


F4NObject::~F4NObject() {
    if (FALCON_LOG_ENABLE) {
        info("F4NObject::~F4NObject tag=%s,props=%s,count=%d", tag.c_str(), props->toString().c_str(), refCount);
    }
    delete object;
    delete finalize;
    props->unprotect();
    jsiContext = nullptr;
}


void finalizeWrapper(void *finalizeData, void *finalizeHint) {
    auto *baseObject = static_cast<F4NObject *>(finalizeData);
    baseObject->onJsiFinalize(finalizeData, finalizeHint);
}


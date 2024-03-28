//
// Created by didi on 2023/12/3.
//

#include "falcon/F4NObject.h"
#include "falcon/Component.h"


F4NObject::F4NObject() {
    //TODO not use this
}

F4NObject::F4NObject(JsiContext *context) {
    jsiContext = context;
    object = context->createObject("Object");

}


void F4NObject::onCreate(string tag, JsiValue *props) {
    this->tag = tag;
    this->props = props;

    finalize = jsiContext->createExternal(this, finalizeWrapper, getFinalizeHint());
    object->setProperty("__finalize__", finalize);

    //需要主动释放引用，释放引用才能触发回收资源
    finalize->release();
}

void F4NObject::onJsiFinalize(void *finalizeData, void *finalizeHint) {
    delete this;
}

void *F4NObject::getFinalizeHint() {
    return object;
}

JsiObjectEx *F4NObject::getJsObject() {
    return nullptr;
}

void F4NObject::onDestroy() {
    //TODO  处理组件销毁的操作
}

void F4NObject::release() {
    onDestroy();
}

F4NObject::~F4NObject() {
    release();
    delete object;
    delete finalize;
    delete props;
    jsiContext = nullptr;
}


void finalizeWrapper(void *finalizeData, void *finalizeHint) {
    auto *baseObject = static_cast<F4NObject *>(finalizeData);
    baseObject->onJsiFinalize(finalizeData, finalizeHint);
}


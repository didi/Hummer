//
// Created by didi on 2024/4/19.
//

#include "falcon/falcon.h"
#include "falcon/F4NContext.h"
#include "falcon/F4NUtil.h"

//********************************************************
//               F4NFunction
//********************************************************


F4NFunction::F4NFunction(F4NContext *context, JsiFunction *jsiFunction) {
    this->context = context;
    this->id = jsiFunction->id;
    this->jsiFunction = jsiFunction;
    this->jsiFunction->protect();
    if (FALCON_LOG_ENABLE) {
        debug("F4NFunction::F4NFunction() id=%ld", id);
    }
    F4NContextUtils::addFunction(context, this);
}

F4NFunction::F4NFunction(F4NContext *context, JsiFunction *jsiFunction, bool autoRelease) {
    this->context = context;
    this->id = jsiFunction->id;
    this->jsiFunction = jsiFunction;
    this->jsiFunction->protect();
    this->autoRelease = autoRelease;
    if (FALCON_LOG_ENABLE) {
        debug("F4NFunction::F4NFunction() id=%ld", id);
    }
    F4NContextUtils::addFunction(context, this);
}

string F4NFunction::toString() const {
    if (released) {
        return string("{\"type\":\"").append("----").append(+"\"}");
    }
    return jsiFunction->toString();
}


JsiValue *F4NFunction::call(size_t argc, JsiValue **argv) {
    if (released) {
        warn("F4NFunction::call() is released params=%s", JsiUtils::buildArrayString(argc, argv).c_str());
        return nullptr;
    }

    JsiValue *result = nullptr;
    if (!F4NUtil::isMainThread()) {
        result = jsiFunction->call(argc, argv);
        JsiUtils::releaseJsiValue(argc, argv);
    } else {
        JsiValue **params = new JsiValue *[argc];
        JsiUtils::copyJsiValue(argv, params, argc);
        context->submitJsTask([&, argc, params]() {
            JsiValue *result = jsiFunction->call(argc, params);
            JsiUtils::releaseJsiValue(argc, params);
            delete[] params;
            if (result != nullptr) {
                result->unprotect();
            }
            if (autoRelease) {
                unprotect();
            }
        });
    }
    if (autoRelease) {
        released = true;
    }
    return result;
}

F4NFunction::~F4NFunction() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NFunction::~F4NFunction() id=%ld", id);
    }
    jsiFunction->unprotect();
    F4NContextUtils::removeFunction(context, this);
}


//********************************************************
//               JsiFunctionBinder
//********************************************************


JsiFunctionBinder::JsiFunctionBinder(F4NContext *context, JsiFunction *function) {
    this->context = context;
    this->function = function;
}

JsiFunctionBinder::~JsiFunctionBinder() {
    this->context = nullptr;
    this->function = nullptr;
}



//********************************************************
//               F4NContextUtils
//********************************************************

unordered_map<long, JsiFunctionBinder *> F4NContextUtils::functionBinders;

JsiValue *F4NContextUtils::call(long id, long contextId, size_t argc, JsiValue **argv) {
    auto it = functionBinders.find(id);
    if (it != functionBinders.end()) {
        it->second->function->call(argc, argv);
    }
    return nullptr;
}

void F4NContextUtils::addFunction(F4NContext *context, JsiFunction *function) {
    functionBinders.insert(make_pair(function->id, new JsiFunctionBinder(context, function)));
}

void F4NContextUtils::removeFunction(F4NContext *context, JsiFunction *function) {
    auto it = functionBinders.find(function->id);
    if (it != functionBinders.end()) {
        delete it->second;
        functionBinders.erase(it);
    }
}

void F4NContextUtils::clearFunction(F4NContext *context) {
    auto it = functionBinders.begin();
    while (it != functionBinders.end()) {
        if (it->second->context->id == context->id) {
            delete it->second; // 释放动态分配的内存
            it = functionBinders.erase(it); // erase 返回指向下一个元素的迭代器
        } else {
            ++it; // 只有当没有删除元素时才增加迭代器
        }
    }
}



//
// Created by didi on 2023/12/14.
//


#include "falcon/F4NContextMT.h"
#include "falcon/F4NRuntime.h"
#include "falcon/F4NPage.h"
#include "falcon/F4NScriptHandler.h"

static F4NLoopHandler *loopHandler = nullptr;

F4NContextMT::F4NContextMT() : F4NContextBase() {

}


void F4NContextMT::init(F4NConfigOptions *configOptions, F4NRenderInvoker *componentFactory) {
    if (loopHandler == nullptr) {
        loopHandler = new F4NLoopHandler();
        loopHandler->start();
    }

    jsThreadHandler_ = new F4NScriptHandler(loopHandler);
    layoutThreadHandler_ = jsThreadHandler_;
    renderThreadHandler_ = jsThreadHandler_;

    F4NContextBase::init(configOptions, componentFactory);
    onCreate();
}


void F4NContextMT::onCreate() {
    F4NContextBase::onCreate();
}


void F4NContextMT::onJsThreadStart(F4NHandler *threadHandler) {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextMT::onJsThreadStart()");
    }

    //开始创建JS上下文及初始化基础环境
    onStart();
}


void F4NContextMT::onJsThreadStop(F4NHandler *threadHandler) {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextMT::onJsThreadStop()");
    }
    //停止js引擎，销毁JS资源
    onStop();
}

void F4NContextMT::onThreadLoopEnd(F4NHandler *threadHandler) {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextMT::onThreadLoopEnd()");
    }
    bool render = _elementRender_->commitRenderElementCall();
    if (render) {
        F4NMessage message = F4NMessage("loop render");
        message.function = [&](int id, const string &msg, void *data) {
            _elementRender_->applyRenderElementCall();
        };
        _mainThreadHandler_->sendMessage(message);
    }
}


JsiValue *F4NContextMT::evaluateJavaScript(string script, string scriptId, F4NJSCallback *callback) {
    if (prepared) {
        F4NMessage message = F4NMessage("evaluateJavaScript");
        auto *errorCatch = new F4NJsiErrorCatch(this);
        message.function = [&, script, scriptId, callback, errorCatch](int id, const string &msg, void *data) {
            JsiObjectRef *result = _jsiContext_->evaluateJavaScript(script, scriptId, errorCatch);
            int status = 0;
            string message;
            if (errorCatch->isCatchJsiError()) {
                status = errorCatch->status;
                message = errorCatch->message;
            }
            JsiValue *jsiValue = nullptr;
            if (result != nullptr) {
                jsiValue = result->toJsiValue();
                delete result;
            }
            if (callback != nullptr) {
                callback->onJavaScriptResult(status, message, jsiValue);
                delete callback;
            }
            delete errorCatch;
            info("F4NContextMT::evaluateJavaScript() scriptId=%s, result=%s", scriptId.c_str(), jsiValue == nullptr ? "" : jsiValue->toString().c_str());
        };
        jsThreadHandler_->sendMessage(message);
    } else {
        info("F4NContextMT::evaluateJavaScript() scriptId=%s, not prepared.", scriptId.c_str());
    }
    return nullptr;
}

JsiValue *F4NContextMT::evaluateBytecode(const uint8_t *byteArray, size_t length, string scriptId, F4NJSCallback *callback) {
    if (prepared) {
        F4NMessage message = F4NMessage("evaluateBytecode");
        F4NJsiErrorCatch *errorCatch = new F4NJsiErrorCatch(this);
        message.function = [&, byteArray, length, scriptId, callback, errorCatch](int id, const string &msg, void *data) {
            JsiObjectRef *result = _jsiContext_->evaluateBytecode(byteArray, length, scriptId.c_str(), errorCatch);
            int status = 0;
            string message;
            if (errorCatch->isCatchJsiError()) {
                status = errorCatch->status;
                message = errorCatch->message;
            }
            JsiValue *jsiValue = nullptr;
            if (result != nullptr) {
                jsiValue = result->toJsiValue();
                delete result;
            }
            if (callback != nullptr) {
                callback->onJavaScriptResult(status, message, jsiValue);
                delete callback;
            }
            delete errorCatch;
            info("F4NContextMT::evaluateBytecode() scriptId=%s, result=%s", scriptId.c_str(), jsiValue == nullptr ? "" : jsiValue->toString().c_str());
        };
        jsThreadHandler_->sendMessage(message);
    } else {
        info("F4NContextMT::evaluateBytecode() scriptId=%s, not prepared.", scriptId.c_str());
    }
    return nullptr;
}


long F4NContextMT::submitJsTask(function<void()> task) {
    F4NMessage message = F4NMessage("js");
    message.function = [&, task](int id, const string &msg, void *data) {
        F4NContextBase::submitJsTask(task);
    };
    jsThreadHandler_->sendMessage(message);
    return message.messageId;
}


long F4NContextMT::submitJsTask(function<void()> task, time_t delay) {
    F4NMessage message = F4NMessage("js-delay", delay);
    message.function = [&, task, delay](int id, const string &msg, void *data) {
        F4NContextBase::submitJsTask(task, delay);
    };
    jsThreadHandler_->sendMessage(message);
    return message.messageId;
}

long F4NContextMT::submitJsTask(function<void()> task, time_t delay, time_t interval) {
    F4NMessage message = F4NMessage("js-interval", delay, interval);
    message.function = [&, task, delay, interval](int id, const string &msg, void *data) {
        F4NContextBase::submitJsTask(task, delay, interval);
    };
    jsThreadHandler_->sendMessage(message);
    return message.messageId;
}

void F4NContextMT::cancelJsTask(long id) {
    jsThreadHandler_->removeMessage(id);
}

long F4NContextMT::submitUITask(function<void()> task) {
    F4NMessage message = F4NMessage("ui");
    message.function = [&, task](int id, const string &msg, void *data) {
        F4NContextBase::submitUITask(task);
    };
    _mainThreadHandler_->sendMessage(message);
    return message.messageId;
}


void F4NContextMT::cancelUITask(long id) {

}

JsiValue *F4NContextMT::render(F4NElement *rootElement) {
    _elementRender_->applyRenderTag(rootElement);
//    info("F4NContextMT::render() apply.");
    F4NMessage message = F4NMessage("render");
    message.function = [&, rootElement](int id, const string &msg, void *data) {
        info("F4NContextMT::render() start.");
        F4NContextBase::render(rootElement);
        info("F4NContextMT::render() stop.");
    };
    _mainThreadHandler_->sendMessage(message);
    return nullptr;
}

void F4NContextMT::start() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextMT::start()");
    }
    jsThreadHandler_->setOnThreadStart([&](F4NHandler *thread) {
        onJsThreadStart(thread);
    });
    jsThreadHandler_->setOnThreadLoopEnd([&](F4NHandler *thread) {
        onThreadLoopEnd(thread);
    });

    jsThreadHandler_->start();
    prepared = true;
}

void F4NContextMT::onStart() {
    //F4NContextMT创建完成
    _contextListener_->onContextCreate();
    F4NContextBase::onStart();
    //F4NContextMT开始运行
    _contextListener_->onContextStart();
}


void F4NContextMT::stop() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextMT::stop()");
    }
    F4NContextBase::stop();

    jsThreadHandler_->setOnThreadStart(nullptr);
    jsThreadHandler_->setOnThreadLoopEnd(nullptr);

    submitJsTask([&]() {
        onJsThreadStop(nullptr);
    });

}


void F4NContextMT::onStop() {
    _contextListener_->onContextStop();
    F4NContextBase::onStop();

    onDestroy();

    jsThreadHandler_->stop();


//    if (F4NRuntime::instance()->empty()) {
//        error("F4NRuntime::instance()->empty()");
//        _jsiContext_->releaseRuntime();
//    }
//    error("F4NRuntime::instance()->empty()  value::size=%d",JsiValuePools::getPoolSize());
    delete this;
}

void F4NContextMT::onDestroy() {
    _contextListener_->onContextDestroy();
    F4NContextBase::onDestroy();
}

F4NContextMT::~F4NContextMT() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextMT::~F4NContextMT()");
    }

    delete jsThreadHandler_;

    jsThreadHandler_ = nullptr;
    layoutThreadHandler_ = nullptr;
    renderThreadHandler_ = nullptr;

}





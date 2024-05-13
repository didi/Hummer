//
// Created by didi on 2023/12/14.
//


#include "falcon/F4NContextMT.h"
#include "falcon/F4NPage.h"
#include "falcon/F4NScriptHandler.h"

static F4NLoopHandler *loopHandler = nullptr;

F4NContextMT::F4NContextMT() : F4NContext() {

}



void F4NContextMT::init(F4NConfigOptions *configOptions, F4NRenderInvoker *componentFactory) {
    if (loopHandler == nullptr) {
        loopHandler = new F4NLoopHandler();
        loopHandler->start();
    }

    jsThreadHandler_ = new F4NScriptHandler(loopHandler);
    layoutThreadHandler_ = jsThreadHandler_;
    renderThreadHandler_ = jsThreadHandler_;

    F4NContext::init(configOptions, componentFactory);
}


void F4NContextMT::onCreate() {
    F4NContext::onCreate();
}


void F4NContextMT::onJsThreadStart(F4NHandler *threadHandler) {
    F4NContext::start();
}

void F4NContextMT::onThreadLoopEnd(F4NHandler *threadHandler) {
    info("F4NContextMT::commitRenderElementCall()");
    bool render = _elementRender_->commitRenderElementCall();
    if (render) {
        F4NMessage message = F4NMessage("loop render");
        message.function = [&](int id, const string &msg, void *data) {
            info("F4NContextMT::applyRenderElementCall()");
            _elementRender_->applyRenderElementCall();
        };
        _mainThreadHandler_->sendMessage(message);
    }
}


void F4NContextMT::start() {
    info("F4NContextMT::start()");

    jsThreadHandler_->onThreadStart = [&](F4NHandler *thread) {
        info("F4NContextMT::start onThreadStart()");
        onJsThreadStart(thread);
        prepared = true;
    };
    jsThreadHandler_->onThreadLoopEnd = [&](F4NHandler *thread) {
        info("F4NContextMT::loop onThreadLoopEnd()");
        onThreadLoopEnd(thread);
    };

    jsThreadHandler_->start();
}


void F4NContextMT::onStart() {
    F4NContext::onStart();
}

JsiValue *F4NContextMT::evaluateJavaScript(string script, string scriptId) {
    if (prepared) {
        F4NMessage message = F4NMessage("run");
        message.function = [&, script, scriptId](int id, const string &msg, void *data) {
            info("F4NContextMT::evaluateJavaScript()  scriptId=%s", scriptId.c_str());
            JsiObjectEx *result = _jsiContext_->evaluateJavaScript(script, scriptId);
            if (result != nullptr) {
                info("F4NContextMT::evaluateJavaScript()  result=%s", result->toJsiValue()->toCString());
                delete result;
            } else {
                info("F4NContextMT::evaluateJavaScript()  result=null");
            }
        };
        jsThreadHandler_->sendMessage(message);
    } else {
        info("F4NContextMT::evaluateJavaScript() not prepared.");
    }
    return nullptr;
}

JsiValue *F4NContextMT::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId) {
    return F4NContext::evaluateBytecode(byteArray, length, scriptId);
}


long F4NContextMT::submitJsTask(function<void()> task) {
    F4NMessage message = F4NMessage("js");
    message.function = [&, task](int id, const string &msg, void *data) {
        F4NContext::submitJsTask(task);
    };
    jsThreadHandler_->sendMessage(message);
    return message.messageId;
}


long F4NContextMT::submitJsTask(function<void()> task, time_t delay) {
    F4NMessage message = F4NMessage("js-delay", delay);
    message.function = [&, task, delay](int id, const string &msg, void *data) {
        F4NContext::submitJsTask(task, delay);
    };
    jsThreadHandler_->sendMessage(message);
    return message.messageId;
}

long F4NContextMT::submitJsTask(function<void()> task, time_t delay, time_t interval) {
    F4NMessage message = F4NMessage("js-interval", delay, interval);
    message.function = [&, task, delay, interval](int id, const string &msg, void *data) {
        F4NContext::submitJsTask(task, delay, interval);
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
        F4NContext::submitUITask(task);
    };
    _mainThreadHandler_->sendMessage(message);
    return message.messageId;
}


void F4NContextMT::cancelUITask(long id) {

}

JsiValue *F4NContextMT::render(F4NElement *rootElement) {
    _elementRender_->applyRenderTag(rootElement);

    F4NMessage message = F4NMessage("render");
    message.function = [&, rootElement](int id, const string &msg, void *data) {
        info("VDOMContextMT::render()");
        F4NContext::render(rootElement);
    };
    _mainThreadHandler_->sendMessage(message);
    return nullptr;
}

void F4NContextMT::stop() {
    jsThreadHandler_->stop();
    F4NContext::stop();
}

void F4NContextMT::onStop() {
    F4NContext::onStop();
}

void F4NContextMT::onDestroy() {
    F4NContext::onDestroy();
}

F4NContextMT::~F4NContextMT() {

}




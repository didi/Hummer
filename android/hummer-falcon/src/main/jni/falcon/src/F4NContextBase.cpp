//
// Created by didi on 2023/11/29.
//

#include "falcon/F4NContextBase.h"
#include <falcon/F4NRuntime.h>
#include <falcon/F4NDocument.h>
#include <falcon/F4NElement.h>
#include <falcon/F4NPage.h>
#include <falcon/F4NUtil.h>


F4NContextBase::F4NContextBase() {

}

void F4NContextBase::init(F4NConfigOptions *options, F4NRenderInvoker *factory) {
    _configOptions_ = options;
    _renderInvoker_ = factory;

}


void F4NContextBase::onCreate() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextBase::onCreate()");
    }
    _page_ = new F4NPage(this);
    _jsiContext_ = new JsiContext();
    _elementRender_ = new F4NRender();
    _elementRender_->init(_renderInvoker_, nullptr, nullptr);
}


void F4NContextBase::setMainThreadHandler(F4NHandler *threadHandler) {
    _mainThreadHandler_ = threadHandler;
}

void F4NContextBase::setLogHandler(LogHandler *logHandler) {
    _logHandler_ = logHandler;
}

void F4NContextBase::setConsoleHandler(ConsoleHandler *consoleHandler) {
    _consoleHandler_ = consoleHandler;
}

void F4NContextBase::setExceptionHandler(ExceptionHandler *exceptionHandler) {
    _exceptionHandler_ = exceptionHandler;
}

void F4NContextBase::setEventTraceHandler(EventTraceHandler *eventTraceHandler) {
    _eventTraceHandler_ = eventTraceHandler;
}


JsiValue *F4NContextBase::loadScript(string script, string scriptId) {
    JsiObjectRef *object = _jsiContext_->evaluateJavaScript(script, scriptId, nullptr);
    if (object != nullptr) {
        JsiValue *result = object->toJsiValue();
        delete object;
        return result;
    }
    return nullptr;
}

JsiValue *F4NContextBase::evaluateJavaScript(string script, string scriptId, F4NJSCallback *callback) {
    JsiObjectRef *object = _jsiContext_->evaluateJavaScript(script, scriptId, nullptr);
    if (object != nullptr) {
        JsiValue *jsiValue = object->toJsiValue();
        delete object;
        return jsiValue;
    }
    return nullptr;
}

JsiValue *F4NContextBase::evaluateBytecode(const uint8_t *byteArray, size_t length, string scriptId, F4NJSCallback *callback) {
    JsiObjectRef *object = _jsiContext_->evaluateBytecode(byteArray, length, scriptId.c_str(), nullptr);
    if (object != nullptr) {
        JsiValue *jsiValue = object->toJsiValue();
        delete object;
        return jsiValue;
    }
    return nullptr;
}

JsiValue *F4NContextBase::render(F4NElement *rootElement) {
    _page_->setRootElement(rootElement);
    _elementRender_->renderRoot(rootElement);
    return nullptr;
}


void F4NContextBase::buildElementParams(size_t size, JsiValue **params) {
    if (size > 0) {
        for (int i = 0; i < size; i++) {
            params[i] = _elementRender_->convertElementParams(nullptr, params[i]);
        }
    }
}


void F4NContextBase::applyElementRender(size_t size, JsiValue **params) {
    if (size > 0) {
        for (int i = 0; i < size; i++) {
            F4NElement *element = F4NUtil::convert2Element(params[i]);
            if (element != nullptr) {
                _elementRender_->applyRenderTag(element);
            }
        }
    }
}


F4NRenderInvoker *F4NContextBase::getRenderInvoker() {
    return _renderInvoker_;
}


F4NConfigOptions *F4NContextBase::getConfigOptions() {
    return _configOptions_;
}

JsiContext *F4NContextBase::getJsiContext() {
    return _jsiContext_;
}

LogHandler *F4NContextBase::getLogHandler() {
    return _logHandler_;
}


F4NLogger *F4NContextBase::getLogger() {
    return _logger_;
}


ConsoleHandler *F4NContextBase::getConsoleHandler() {
    return _consoleHandler_;
}

ExceptionHandler *F4NContextBase::getExceptionHandler() {
    return _exceptionHandler_;
}

long F4NContextBase::submitJsTask(function<void()> task) {
    task();
    return 0;
}

long F4NContextBase::submitJsTask(function<void()> task, time_t delay) {
    task();
    return 0;
}

long F4NContextBase::submitJsTask(function<void()> task, time_t delay, time_t interval) {
    task();
    return 0;
}

void F4NContextBase::cancelJsTask(long id) {

}

long F4NContextBase::submitUITask(function<void()> task) {
    task();
    return 0;
}

void F4NContextBase::cancelUITask(long id) {

}

void F4NContextBase::dispatchEvent(string eventName, size_t size, JsiValue **params) {
    _page_->dispatchEvent(eventName, size, params);
}


void F4NContextBase::setPageLifeCycle(PageLifeCycle *pageLifeCycle) {
    _pageLifeCycle_ = pageLifeCycle;
    _page_->setPageLifeCycle(pageLifeCycle);
}

void F4NContextBase::setContextStateListener(F4NContextStateListener *contextStateListener) {
    _contextListener_ = contextStateListener;

}

void F4NContextBase::start() {

}

void F4NContextBase::onStart() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextBase::onStart()");
    }
    //开启JS上下文环境
    _jsiContext_->start();

    F4NTimer *f4NTimer = new F4NTimer(this, _jsiContext_);
    f4NTimer->onCreate();
    _timer_ = f4NTimer;

    F4NConsole *jsConsole = new F4NConsole(_jsiContext_, _consoleHandler_);
    jsConsole->onCreate();
    _jsConsole_ = jsConsole;

    F4NDocument *document = new F4NDocument(_jsiContext_);
    document->fnContext = this;
    document->componentFactory = _renderInvoker_;
    document->onCreate();
    _document_ = document;
}

void F4NContextBase::stop() {

}

void F4NContextBase::onStop() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextBase::onStop()");
    }
}

void F4NContextBase::onDestroy() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextBase::onDestroy()");
    }
    //停止事件队列
    _timer_->onDestroy();
    //释放当前页面节点数据
    _page_->onReleasePageElement();
    //释放悬空的组件，关闭组件创建能力
    _document_->onDestroy();
    //停止渲染任务
    _elementRender_->onDestroy();
    //停止日志输出
    _jsConsole_->onDestroy();
    //关闭JS引擎
    _jsiContext_->stop();
    //关闭渲染线程
    _mainThreadHandler_->stop();
}

F4NContextBase::~F4NContextBase() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContextBase::~F4NContextBase()");
    }

    delete _configOptions_;
    _configOptions_ = nullptr;

    delete _mainThreadHandler_;
    _mainThreadHandler_ = nullptr;

    delete _elementRender_;
    _elementRender_ = nullptr;


    delete _pageLifeCycle_;
    _pageLifeCycle_ = nullptr;


    delete _page_;
    _page_ = nullptr;

    delete _document_;
    _document_ = nullptr;

    delete _jsConsole_;
    _jsConsole_ = nullptr;

    delete _timer_;
    _timer_ = nullptr;

    delete _renderInvoker_;
    _renderInvoker_ = nullptr;

    delete _jsiContext_;
    _jsiContext_ = nullptr;
}












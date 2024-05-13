//
// Created by didi on 2024/4/30.
//


#include "falcon/F4NPage.h"
#include "falcon/F4NContext.h"
#include "falcon/logger.h"


F4NPage::F4NPage(F4NContext *context) {
    this->context = context;
}

void F4NPage::setRootElement(F4NElement *rootElement) {
    _rootElement_ = rootElement;
}

void F4NPage::setPageLifeCycle(PageLifeCycle *pageLifeCycle) {
    this->pageLifeCycle = pageLifeCycle;
}

void F4NPage::dispatchEvent(string eventName, size_t size, JsiValue **params) {
    debug("F4NPage::dispatchEvent() eventName=%s", eventName.c_str());
    if (eventName == "__onCreate__") {
        onCreate();
    } else if (eventName == "__onAppear__") {
        onAppear();
    } else if (eventName == "__onDisappear__") {
        onDisappear();
    } else if (eventName == "__onDestroy__") {
        onDestroy();
    } else if (eventName == "__onBack__") {
        onBack();
    }
}

void F4NPage::onCreate() {
    context->submitJsTask([&]() {
        if (_rootElement_ != nullptr) {
            JsiObject *event = new JsiObject();
            event->setValue("type", new JsiString("__onCreate__"));
            _rootElement_->eventTarget->onEvent("__onCreate__", event);
        }
        context->submitUITask([&]() {
            pageLifeCycle->onCreate();
        });
    });
}

void F4NPage::onAppear() {
    context->submitJsTask([&]() {
        if (_rootElement_ != nullptr) {
            JsiObject *event = new JsiObject();
            event->setValue("type", new JsiString("__onAppear__"));
            _rootElement_->eventTarget->onEvent("__onAppear__", event);
        }
        context->submitUITask([&]() {
            pageLifeCycle->onAppear();
        });
    });

}

void F4NPage::onDisappear() {
    context->submitJsTask([&]() {
        if (_rootElement_ != nullptr) {
            JsiObject *event = new JsiObject();
            event->setValue("type", new JsiString("__onDisappear__"));
            _rootElement_->eventTarget->onEvent("__onDisappear__", event);
        }
        context->submitUITask([&]() {
            pageLifeCycle->onDisappear();
        });
    });
}

void F4NPage::onDestroy() {
    context->submitJsTask([&]() {
        if (_rootElement_ != nullptr) {
            JsiObject *event = new JsiObject();
            event->setValue("type", new JsiString("__onDestroy__"));
            _rootElement_->eventTarget->onEvent("__onDestroy__", event);
        }
        context->submitJsTask([&]() {
            context->submitUITask([&]() {
                pageLifeCycle->onDestroy();
            });
        });
    });
}

void F4NPage::onBack() {
    context->submitJsTask([&]() {
        if (_rootElement_ != nullptr) {
            JsiObject *event = new JsiObject();
            event->setValue("type", new JsiString("__onBack__"));
            _rootElement_->eventTarget->onEvent("__onBack__", event);
        }
        context->submitUITask([&]() {
            pageLifeCycle->onBack();
        });
    });
}

F4NPage::~F4NPage() {
    this->context = nullptr;
    this->_rootElement_ = nullptr;
}

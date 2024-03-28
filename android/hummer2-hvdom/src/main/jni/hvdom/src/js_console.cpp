//
// Created by didi on 2023/11/29.
//

#include "falcon/js_console.h"


JSConsole::JSConsole(JsiContext *jsiContext, ConsoleHandler *consoleHandler) {
    this->jsiContext = jsiContext;
    this->consoleHandler = consoleHandler;

}

void JSConsole::onCreate() {
    this->console = jsiContext->createGlobalObject("Object", "console");

    this->console->registerFunction(MethodId_log, "log", consoleFuncWrapper, this);
    this->console->registerFunction(MethodId_debug, "debug", consoleFuncWrapper, this);
    this->console->registerFunction(MethodId_info, "info", consoleFuncWrapper, this);
    this->console->registerFunction(MethodId_warn, "warn", consoleFuncWrapper, this);
    this->console->registerFunction(MethodId_error, "error", consoleFuncWrapper, this);

}

JsiValue *JSConsole::log(size_t size, JsiValue **params) {
    this->print(LOG_LEVEL_LOG, size, params);
}

JsiValue *JSConsole::debug(size_t size, JsiValue **params) {
    this->print(LOG_LEVEL_DEBUG, size, params);
}

JsiValue *JSConsole::info(size_t size, JsiValue **params) {
    this->print(LOG_LEVEL_INFO, size, params);
}

JsiValue *JSConsole::warn(size_t size, JsiValue **params) {
    this->print(LOG_LEVEL_WARN, size, params);
}

JsiValue *JSConsole::error(size_t size, JsiValue **params) {
    this->print(LOG_LEVEL_ERROR, size, params);
}

JsiValue *JSConsole::print(int level, size_t size, JsiValue **params) {
    if (consoleHandler != nullptr && size > 0) {
        JsiValue *jsiValue = params[0];
        const char *message;
        if (jsiValue->getType() == TYPE_STRING) {
            auto *text = dynamic_cast<JsiString *>(jsiValue);
            message = text->value_.c_str();
        } else {
            message = jsiValue->toString().c_str();
        }
        consoleHandler->log(level, message);
    }
    return nullptr;
}

void JSConsole::onDestroy() {

}

JSConsole::~JSConsole() {
    jsiContext = nullptr;
    consoleHandler = nullptr;
    if (console != nullptr) {
        delete console;
        console = nullptr;
    }
}


JsiValue *consoleFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
    auto *bridge = static_cast<JSConsole *>(data);
    switch (methodId) {
        case JSConsole::MethodId_log:
            return bridge->log(size, params);
        case JSConsole::MethodId_debug:
            return bridge->debug(size, params);
        case JSConsole::MethodId_info:
            return bridge->info(size, params);
        case JSConsole::MethodId_warn:
            return bridge->warn(size, params);
        case JSConsole::MethodId_error:
            return bridge->error(size, params);
    }
    return nullptr;
}





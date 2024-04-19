//
// Created by didi on 2023/11/29.
//

#include "falcon/F4NConsole.h"


F4NConsole::F4NConsole(JsiContext *jsiContext, ConsoleHandler *consoleHandler) {
    this->jsiContext = jsiContext;
    this->consoleHandler = consoleHandler;

}

void F4NConsole::onCreate() {
    this->console = jsiContext->createGlobalObject("Object", "console");

    this->console->registerFunction(MethodId_log, "log", consoleFuncWrapper, this);
    this->console->registerFunction(MethodId_debug, "debug", consoleFuncWrapper, this);
    this->console->registerFunction(MethodId_info, "info", consoleFuncWrapper, this);
    this->console->registerFunction(MethodId_warn, "warn", consoleFuncWrapper, this);
    this->console->registerFunction(MethodId_error, "error", consoleFuncWrapper, this);

}

JsiValue *F4NConsole::log(size_t size, JsiValue **params) {
    return this->print(LOG_LEVEL_LOG, size, params);
}

JsiValue *F4NConsole::debug(size_t size, JsiValue **params) {
    return this->print(LOG_LEVEL_DEBUG, size, params);
}

JsiValue *F4NConsole::info(size_t size, JsiValue **params) {
    return this->print(LOG_LEVEL_INFO, size, params);
}

JsiValue *F4NConsole::warn(size_t size, JsiValue **params) {
    return this->print(LOG_LEVEL_WARN, size, params);
}

JsiValue *F4NConsole::error(size_t size, JsiValue **params) {
    return this->print(LOG_LEVEL_ERROR, size, params);
}

JsiValue *F4NConsole::print(int level, size_t size, JsiValue **params) {
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

void F4NConsole::onDestroy() {

}

F4NConsole::~F4NConsole() {
    jsiContext = nullptr;
    consoleHandler = nullptr;
    if (console != nullptr) {
        delete console;
        console = nullptr;
    }
}


JsiValue *consoleFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
    auto *bridge = static_cast<F4NConsole *>(data);
    switch (methodId) {
        case F4NConsole::MethodId_log:
            return bridge->log(size, params);
        case F4NConsole::MethodId_debug:
            return bridge->debug(size, params);
        case F4NConsole::MethodId_info:
            return bridge->info(size, params);
        case F4NConsole::MethodId_warn:
            return bridge->warn(size, params);
        case F4NConsole::MethodId_error:
            return bridge->error(size, params);
    }
    return nullptr;
}





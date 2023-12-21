//
// Created by didi on 2023/11/29.
//

#include "hvdom/js_console.h"

static const int LOG_TYPE_LOG = 1;
static const int LOG_TYPE_DEBUG = 2;
static const int LOG_TYPE_INFO = 3;
static const int LOG_TYPE_WARN = 4;
static const int LOG_TYPE_ERROR = 5;


void JSConsole::init(NAPIEnv *env) {
    NAPIExceptionStatus status;
    NAPIValue console;

    NAPIHandleScope  handleScope;
    JSUtils::openHandleScope(env,&handleScope);

    status = JSUtils::createObject(env, "Object", 0, nullptr, &console);
    if (status != NAPIExceptionOK) {
        error("JSConsole::createObject() error. %d", status);
    }

    //log
    NAPIValue logFunction;
    status = napi_create_function(*env, "log", logWrapper, (void *) &LOG_TYPE_LOG, &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::napi_create_function() log error. %d", status);
    }
    status = JSUtils::setProperty(env, &console, "log", &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::setProperty() log error. %d", status);
    }

    //debug
    status = napi_create_function(*env, "debug", logWrapper, (void *) &LOG_TYPE_DEBUG, &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::napi_create_function() debug error. %d", status);
    }
    status = JSUtils::setProperty(env, &console, "debug", &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::setProperty() debug error. %d", status);
    }
    //info
    status = napi_create_function(*env, "info", logWrapper, (void *) &LOG_TYPE_INFO, &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::napi_create_function() info error. %d", status);
    }
    status = JSUtils::setProperty(env, &console, "info", &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::setProperty() info error. %d", status);
    }
    //warn
    status = napi_create_function(*env, "warn", logWrapper, (void *) &LOG_TYPE_WARN, &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::napi_create_function() warn error. %d", status);
    }
    status = JSUtils::setProperty(env, &console, "warn", &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::setProperty() warn error. %d", status);
    }
    //error
    status = napi_create_function(*env, "error", logWrapper, (void *) &LOG_TYPE_ERROR, &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::napi_create_function() error error. %d", status);
    }
    status = JSUtils::setProperty(env, &console, "error", &logFunction);
    if (status != NAPIExceptionOK) {
        error("JSConsole::setProperty() error error. %d", status);
    }

    status = JSUtils::setGlobalProperty(env, "console", &console);
    if (status != NAPIExceptionOK) {
        error("JSConsole::setGlobalProperty() console error. %d", status);
    }
    JSUtils::closeHandleScope(env,&handleScope);
}

void JSConsole::log_print(const char *message) {
    native_Log(LEVEL_INFO, message);
}

void JSConsole::debug_print(const char *message) {
    native_Log(LEVEL_DEBUG, message);
}

void JSConsole::info_print(const char *message) {
    native_Log(LEVEL_INFO, message);
}

void JSConsole::warn_print(const char *message) {
    native_Log(LEVEL_WARN, message);
}

void JSConsole::error_print(const char *message) {
    native_Log(LEVEL_ERROR, message);
}

NAPIValue logWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    size_t argc = 1;
    NAPIValue argv[1];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
    const char *messageT = JSUtils::getJsCString(&env, &argv[0]);
    string result = string("[console]");
    result.append(messageT);
    const char *message = result.c_str();
    int *type = static_cast<int *>(data);
    switch (*type) {
        case LOG_TYPE_LOG:
            JSConsole::log_print(message);
            break;
        case LOG_TYPE_DEBUG:
            JSConsole::debug_print(message);
            break;
        case LOG_TYPE_INFO:
            JSConsole::info_print(message);
            break;
        case LOG_TYPE_WARN:
            JSConsole::warn_print(message);
            break;
        case LOG_TYPE_ERROR:
            JSConsole::error_print(message);
            break;
    }
    return nullptr;
}





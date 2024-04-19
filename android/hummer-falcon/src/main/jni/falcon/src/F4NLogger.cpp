//
// Created by didi on 2024/3/18.
//


#include "falcon/falcon.h"


F4NLogger::F4NLogger(LogHandler *logHandler) {
    this->logHandler = logHandler;
}


void F4NLogger::concatenateLogMessage(char *msg, const char *fmt, va_list args) {
    vsnprintf(msg, MAX_LOG_MSG_LENGTH, fmt, args);
}


void F4NLogger::log(int level, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[MAX_LOG_MSG_LENGTH];
    concatenateLogMessage(msg, fmt, args);
    printLog(level, msg);
    va_end(args);
}

void F4NLogger::debug(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[MAX_LOG_MSG_LENGTH];
    concatenateLogMessage(msg, fmt, args);
    printLog(LOG_LEVEL_DEBUG, msg);
    va_end(args);
}

void F4NLogger::info(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[MAX_LOG_MSG_LENGTH];
    concatenateLogMessage(msg, fmt, args);
    printLog(LOG_LEVEL_INFO, msg);
    va_end(args);
}

void F4NLogger::warn(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[MAX_LOG_MSG_LENGTH];
    concatenateLogMessage(msg, fmt, args);
    printLog(LOG_LEVEL_WARN, msg);
    va_end(args);
}

void F4NLogger::error(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[MAX_LOG_MSG_LENGTH];
    concatenateLogMessage(msg, fmt, args);
    printLog(LOG_LEVEL_ERROR, msg);
    va_end(args);
}

void F4NLogger::printLog(int level, const char *msg) {
    if (logHandler != nullptr) {
        logHandler->log(level, msg);
    }
}


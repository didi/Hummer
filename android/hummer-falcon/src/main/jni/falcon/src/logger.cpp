//
// Created by didi on 2023/11/22.
//

#include "falcon/logger.h"
#include <cstdio>
#include <cstdarg>

static LoggerWriter loggerFunction;

void setLogger(LoggerWriter loggerWriter) {
    loggerFunction = loggerWriter;
}

void concatenateMessage(char *msg, const char *fmt, va_list args) {
    vsnprintf(msg, LOG_MAX_MSG_LENGTH, fmt, args);
}

void log(int level, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[LOG_MAX_MSG_LENGTH];
    concatenateMessage(msg, fmt, args);
    native_Log(level, msg);
    va_end(args);
}

void debug(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[LOG_MAX_MSG_LENGTH];
    concatenateMessage(msg, fmt, args);
    native_Log(LOG_LEVEL_DEBUG, msg);
    va_end(args);
}

void info(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[LOG_MAX_MSG_LENGTH];
    concatenateMessage(msg, fmt, args);
    native_Log(LOG_LEVEL_INFO, msg);
    va_end(args);
}

void warn(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[LOG_MAX_MSG_LENGTH];
    concatenateMessage(msg, fmt, args);
    native_Log(LOG_LEVEL_WARN, msg);
    va_end(args);
}

void error(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    char msg[LOG_MAX_MSG_LENGTH];
    concatenateMessage(msg, fmt, args);
    native_Log(LOG_LEVEL_ERROR, msg);
    va_end(args);
}

void native_Log(int level, const char *msg) {
    loggerFunction(level, msg);
}

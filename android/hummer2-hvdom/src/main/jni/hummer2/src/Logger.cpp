//
// Created by didi on 2023/11/28.
//

#include <Logger.h>


// 定义一个用于在Android上输出日志的函数
void androidLog(int level, const char *msg) {
    switch (level) {
        case LEVEL_DEBUG:
            LOG_PRINT(ANDROID_LOG_DEBUG, "Hummer2", msg);
            break;
        case LEVEL_INFO:
            LOG_PRINT(ANDROID_LOG_INFO, "Hummer2", msg);
            break;
        case LEVEL_WARN:
            LOG_PRINT(ANDROID_LOG_WARN, "Hummer2", msg);
            break;
        case LEVEL_ERROR:
            LOG_PRINT(ANDROID_LOG_ERROR, "Hummer2", msg);
            break;
    }

}


void VdomLogger::init() {
    LOGI("VdomLogger::init() OK");
    // 绑定日志组件实现
    setLogger(androidLog);
}
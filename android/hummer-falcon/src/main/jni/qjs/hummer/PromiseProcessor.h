//
// Created by XiaoFeng on 2020-02-19.
//

#ifndef NATIVE_JS_ANDROID_PROMISEPROCESSOR_H
#define NATIVE_JS_ANDROID_PROMISEPROCESSOR_H


#include <quickjs.h>

// 处理Promise等异步任务的消息队列
void processJsAsyncTasksLoop(JSContext *context);


#endif //NATIVE_JS_ANDROID_PROMISEPROCESSOR_H

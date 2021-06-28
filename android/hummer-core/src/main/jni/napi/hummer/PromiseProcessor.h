//
// Created by XiaoFeng on 2021/6/22.
//

#ifndef ANDROID_PROMISEPROCESSOR_H
#define ANDROID_PROMISEPROCESSOR_H


#include <js_native_api.h>

// 处理Promise等异步任务的消息队列
void processJsAsyncTasksLoop(NAPIEnv env);


#endif //ANDROID_PROMISEPROCESSOR_H

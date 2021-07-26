//
// Created by XiaoFeng on 2021/6/22.
//

#ifndef ANDROID_JSEXCEPTION_H
#define ANDROID_JSEXCEPTION_H

#include <js_native_api.h>

extern "C"
void reportExceptionIfNeed(NAPIEnv globalEnv);

#endif //ANDROID_JSEXCEPTION_H
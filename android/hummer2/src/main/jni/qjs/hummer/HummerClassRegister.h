//
// Created by XiaoFeng on 2020/6/17.
//

#ifndef NATIVE_JS_ANDROID_HUMMERCLASSREGISTER_H
#define NATIVE_JS_ANDROID_HUMMERCLASSREGISTER_H

#include <quickjs.h>

class HummerClassRegister {
public:
    static void init(JSRuntime *rt, JSContext *ctx);
};


#endif //NATIVE_JS_ANDROID_HUMMERCLASSREGISTER_H

//
// Created by XiaoFeng on 2021/1/24.
//

#ifndef ANDROID_JSCCACHE_H
#define ANDROID_JSCCACHE_H

#include "../JavaScriptCore/include/JavaScript.h"
#include <list>

class JSCCache {

public:
    static void addJsContextRef(JSContextRef jsContextRef);
    static void removeJsContextRef(JSContextRef jsContextRef);
    static bool findJSContextRef(JSContextRef jsContextRef);

private:
    static std::list<JSContextRef> jsContextRefList;
};


#endif //ANDROID_JSCCACHE_H

//
// Created by XiaoFeng on 2021/1/24.
//

#include "JSCCache.h"


std::list<JSContextRef> JSCCache::jsContextRefList;

void JSCCache::addJsContextRef(JSContextRef jsContextRef) {
    jsContextRefList.push_back(jsContextRef);
}

void JSCCache::removeJsContextRef(JSContextRef jsContextRef) {
    jsContextRefList.remove(jsContextRef);
}

bool JSCCache::findJSContextRef(JSContextRef jsContextRef) {
    auto it = std::find(jsContextRefList.begin(), jsContextRefList.end(), jsContextRef);
    return it != jsContextRefList.end();
}

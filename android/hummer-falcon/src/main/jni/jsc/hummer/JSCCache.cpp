//
// Created by XiaoFeng on 2021/1/24.
//

#include <mutex>
#include "JSCCache.h"

std::mutex mtx;

std::list<JSContextRef> JSCCache::jsContextRefList;

void JSCCache::addJsContextRef(JSContextRef jsContextRef) {
    std::lock_guard<std::mutex> locker(mtx);
    jsContextRefList.push_back(jsContextRef);
}

void JSCCache::removeJsContextRef(JSContextRef jsContextRef) {
    std::lock_guard<std::mutex> locker(mtx);
    jsContextRefList.remove(jsContextRef);
}

bool JSCCache::findJSContextRef(JSContextRef jsContextRef) {
    std::lock_guard<std::mutex> locker(mtx);
    auto it = std::find(jsContextRefList.begin(), jsContextRefList.end(), jsContextRef);
    return it != jsContextRefList.end();
}

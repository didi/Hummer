//
// Created by maxiee on 2019-11-20.
//

#include <mutex>
#include "QuickJSCache.h"
#include "HummerJNI.h"

std::mutex mtx;

std::map<long, JSContext*> QuickJSCache::cachedJSContext;
long QuickJSCache::idCachedContext = 0;

long QuickJSCache::getJSContextId(JSContext *context) {
    std::lock_guard<std::mutex> locker(mtx);
    std::map<long, JSContext*>::iterator it;
    for (it = cachedJSContext.begin(); it != cachedJSContext.end(); it++) {
        if (context == it->second) {
            return it->first;
        }
    }
    long newId = ++idCachedContext;
    cachedJSContext.insert(std::make_pair(newId, context));
    return newId;
}

JSContext* QuickJSCache::getJSContext(long contextId) {
    std::lock_guard<std::mutex> locker(mtx);
    auto iter = cachedJSContext.find(contextId);
    if (iter != cachedJSContext.end()) {
        return iter->second;
    }
    return nullptr;
}

void QuickJSCache::removeJSContext(long contextId) {
    std::lock_guard<std::mutex> locker(mtx);
    cachedJSContext.erase(contextId);
}
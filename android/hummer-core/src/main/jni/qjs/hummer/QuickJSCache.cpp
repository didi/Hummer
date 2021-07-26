//
// Created by maxiee on 2019-11-20.
//

#include <QuickJSCache.h>
#include <HummerJNI.h>

std::map<long, JSContext*> QuickJSCache::cachedJSContext;

long QuickJSCache::idCachedContext = 0;

long QuickJSCache::getJSContextId(JSContext *context) {
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
    auto iter = cachedJSContext.find(contextId);
    if (iter != cachedJSContext.end()) {
        return iter->second;
    }
    return nullptr;
}

void QuickJSCache::removeJSContext(long contextId) {
    cachedJSContext.erase(contextId);
}
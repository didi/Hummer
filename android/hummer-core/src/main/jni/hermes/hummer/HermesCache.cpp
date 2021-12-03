//
// Created by XiaoFeng on 2020-08-20.
//

#include <mutex>
#include "HermesCache.h"
#include "HummerJNI.h"

std::mutex mtx1;
std::mutex mtx2;

std::map<long, std::shared_ptr<HermesRuntime>> HermesCache::cachedRuntime;
std::map<long, Value> HermesCache::cachedJSValue;

long HermesCache::idCachedValue = 0;

long HermesCache::getRuntimeId(std::shared_ptr<HermesRuntime> runtime) {
    std::lock_guard<std::mutex> locker(mtx1);
    std::map<long, std::shared_ptr<HermesRuntime>>::iterator it;
    for (it = cachedRuntime.begin(); it != cachedRuntime.end(); it++) {
        if (runtime == it->second) {
            return it->first;
        }
    }
    long runtimeId = reinterpret_cast<long>(runtime.get());
    cachedRuntime.insert(std::make_pair(runtimeId, runtime));
    return runtimeId;
}

std::shared_ptr<HermesRuntime> HermesCache::getRuntime(long contextId) {
    std::lock_guard<std::mutex> locker(mtx1);
    auto iter = cachedRuntime.find(contextId);
    if (iter != cachedRuntime.end()) {
        return iter->second;
    }
    return nullptr;
}

void HermesCache::removeRuntime(long contextId) {
    std::lock_guard<std::mutex> locker(mtx1);
    cachedRuntime.erase(contextId);
}

long HermesCache::getJSValueId(Value& value) {
    std::lock_guard<std::mutex> locker(mtx2);
    std::map<long, Value>::iterator it;
    for (it = cachedJSValue.begin(); it != cachedJSValue.end(); it++) {
        if (&value == &it->second) {
            return it->first;
        }
    }
    long newId = ++idCachedValue;
    cachedJSValue.insert(std::make_pair(newId, std::move(value)));
    return newId;
}

Value HermesCache::getJSValue(Runtime& runtime, long valueId) {
    std::lock_guard<std::mutex> locker(mtx2);
    if (valueId == -1) {
        return Value();
    }
    auto iter = cachedJSValue.find(valueId);
    if (iter != cachedJSValue.end()) {
        return Value(runtime, iter->second);
    }
    return Value();
}
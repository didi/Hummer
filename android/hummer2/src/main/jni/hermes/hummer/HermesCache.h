//
// Created by XiaoFeng on 2020-08-20.
//

#ifndef NATIVE_JS_ANDROID_QUICKJSCACHE_H
#define NATIVE_JS_ANDROID_QUICKJSCACHE_H

#include <hermes.h>
#include <jsi.h>
#include <map>

#define RUNTIME_ID(ctx) HermesCache::getRuntimeId(ctx)
#define RUNTIME(ctxId) HermesCache::getRuntime(ctxId)
#define RUNTIME_REMOVE(ctxId) HermesCache::removeRuntime(ctxId)

#define VALUE(rt, valueId) HermesCache::getJSValue(rt, valueId)
#define VALUE_ID(jsValue) HermesCache::getJSValueId(jsValue)

using namespace facebook::hermes;
using namespace facebook::jsi;

class HermesCache {
public:
    static long getRuntimeId(std::shared_ptr<HermesRuntime> runtime);
    static std::shared_ptr<HermesRuntime> getRuntime(long contextId);
    static void removeRuntime(long contextId);
    static long getJSValueId(Value& value);
    static Value getJSValue(Runtime& runtime, long valueId);
private:
    static long idCachedValue;
    static std::map<long, std::shared_ptr<HermesRuntime>> cachedRuntime;
    static std::map<long, Value> cachedJSValue;

};


#endif //NATIVE_JS_ANDROID_QUICKJSCACHE_H

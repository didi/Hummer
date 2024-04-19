//
// Created by maxiee on 2019-11-20.
//

#ifndef NATIVE_JS_ANDROID_QUICKJSCACHE_H
#define NATIVE_JS_ANDROID_QUICKJSCACHE_H

#include <quickjs.h>
#include <map>

#define QJS_CONTEXT_ID(ctx) QuickJSCache::getJSContextId(ctx)
#define QJS_CONTEXT(ctxId) QuickJSCache::getJSContext(ctxId)
#define QJS_CONTEXT_REMOVE(ctxId) QuickJSCache::removeJSContext(ctxId)

#ifdef JS_NAN_BOXING
// 32位使用值方式
#define QJS_VALUE(valueId) valueId == -1 ? JS_UNDEFINED : static_cast<JSValue>(valueId)
#define QJS_VALUE_PTR(jsValue) static_cast<uint64_t>(jsValue)
#else /* !JS_NAN_BOXING */
// 64位使用指针方式
// ** struct本身是和基本类型一样是在栈中分配内存的，直接拿栈中的内存地址，
// ** 会被后续的值覆盖掉内容，需要在堆中new一块新内存存放，但是会消耗一定内存。
// ** JSValue在64位下的结构体大小是16个字节，也就是两个long型的值，基本可以不考虑消耗。
#define QJS_VALUE(valueId) valueId == -1 ? JS_UNDEFINED : *reinterpret_cast<JSValue*>(valueId)
#define QJS_VALUE_PTR(jsValue) reinterpret_cast<long>(new JSValue(jsValue))
#endif /* !JS_NAN_BOXING */

class QuickJSCache {
public:
    static long getJSContextId(JSContext *context);
    static JSContext* getJSContext(long contextId);
    static void removeJSContext(long contextId);
private:
    static long idCachedContext;
    static std::map<long, JSContext*> cachedJSContext;
};


#endif //NATIVE_JS_ANDROID_QUICKJSCACHE_H

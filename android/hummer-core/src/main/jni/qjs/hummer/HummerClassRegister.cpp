//
// Created by XiaoFeng on 2020/6/17.
//

#include <HummerJNI.h>
#include <QuickJSCache.h>
#include <HummerClassRegister.h>
#include <HummerRecycler.h>

namespace Recycler {
    typedef struct {
        long ctxId;
        int64_t objId;
    } Recycler;

    JSClassID class_id = 0;
    const char *class_name = "Recycler";

    void class_finalizer(JSRuntime *rt, JSValue val) {
        Recycler *s = static_cast<Recycler *>(JS_GetOpaque(val, class_id));
        if (!s) {
            return;
        }

        HummerRecycler::recycle(s->ctxId, s->objId);

        js_free_rt(rt, s);
    }

    JSClassDef class_def = {
            class_name,
            .finalizer = class_finalizer,
    };

    JSValue class_constructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
        Recycler *s;
        JSValue obj = JS_UNDEFINED;
        JSValue proto;

        s = static_cast<Recycler *>(js_mallocz(ctx, sizeof(*s)));
        if (!s)
            return JS_EXCEPTION;
        s->ctxId = QJS_CONTEXT_ID(ctx);
        if (JS_ToInt64(ctx, &s->objId, argv[0]))
            goto fail;
        /* using new_target to get the prototype is necessary when the class is extended. */
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
        obj = JS_NewObjectProtoClass(ctx, proto, class_id);
        JS_FreeValue(ctx, proto);
        if (JS_IsException(obj))
            goto fail;
        JS_SetOpaque(obj, s);

        return obj;
    fail:
        js_free(ctx, s);
        JS_FreeValue(ctx, obj);
        return JS_EXCEPTION;
    }
}

void HummerClassRegister::init(JSRuntime *rt, JSContext *ctx) {
    JS_NewClassID(&Recycler::class_id);
    if (Recycler::class_id > 0) {
        JS_NewClass(rt, Recycler::class_id, &Recycler::class_def);
        JSValue proto = JS_NewObject(ctx);
        JS_SetClassProto(ctx, Recycler::class_id, proto);
        JSValue ctorClass = JS_NewCFunction2(ctx, Recycler::class_constructor, Recycler::class_name, 1, JS_CFUNC_constructor, 0);
        /* set proto.constructor and ctor.prototype */
        JS_SetConstructor(ctx, ctorClass, proto);

        // 这一步是关键
        JS_SetPropertyStr(ctx, JS_GetGlobalObject(ctx), Recycler::class_name, ctorClass);
    }
}
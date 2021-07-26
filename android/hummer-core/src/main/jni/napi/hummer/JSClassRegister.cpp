//
// Created by XiaoFeng on 2021/6/29.
//

#include <HummerJNI.h>
#include <JSClassRegister.h>
#include <JSRecycler.h>
#include <JSUtils.h>

namespace Recycler {
    typedef struct {
        int64_t ctxId;
        int64_t objId;
    } Recycler;

    const char *class_name = "Recycler";

    void class_finalizer(NAPIEnv env, void *finalizeData, void *finalizeHint) {
        auto s = static_cast<Recycler *>(finalizeData);
        if (!s) {
            return;
        }

        JSRecycler::recycle(s->ctxId, s->objId);

        free(s);
    }

    NAPIValue class_constructor(NAPIEnv env, NAPICallbackInfo info) {
        NAPIValue _this;
        napi_get_cb_info(env, info, nullptr, nullptr, &_this, nullptr);

        size_t argc;
        napi_get_cb_info(env, info, &argc, nullptr, nullptr, nullptr);
        NAPIValue argv[argc];
        napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);

        auto s = static_cast<Recycler *>(malloc(sizeof(Recycler)));
        if (!s) {
            return _this;
        }

        s->ctxId = JSUtils::toJsContextPtr(env);
        double objId;
        napi_get_value_double(env, argv[0], &objId);
        s->objId = objId;

        NAPIValue result;
        napi_create_external(env, s, class_finalizer, nullptr, &result);
        return result;
    }
}

void JSClassRegister::init(NAPIEnv env) {
    NAPIValue result;
    NAPIStatus status = NAPIDefineClass(env, Recycler::class_name, Recycler::class_constructor, nullptr, &result);
    if (status != NAPIOK) {
        return;
    }

    NAPIValue global = JSUtils::createJsGlobal(env);
    napi_set_named_property(env, global, Recycler::class_name, result);
}
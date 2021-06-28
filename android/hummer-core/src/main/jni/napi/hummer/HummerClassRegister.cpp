//
// Created by XiaoFeng on 2021/6/22.
//

#include <HummerJNI.h>
#include <HummerClassRegister.h>
#include <HummerRecycler.h>
#include <JSUtils.h>

namespace Recycler {
    typedef struct {
        long ctxId;
        int64_t objId;
    } Recycler;

    const char *class_name = "Recycler";

    void class_finalizer(NAPIEnv env, void *finalizeData, void *finalizeHint) {
        auto s = static_cast<Recycler *>(finalizeData);
        if (!s) {
            return;
        }

        HummerRecycler::recycle(s->ctxId, s->objId);

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
        s->objId = JSUtils::toJsValuePtr(env, argv[0]);

        NAPIValue result;
        napi_create_external(env, s, class_finalizer, nullptr, &result);
        return result;
    }
}

void HummerClassRegister::init(NAPIEnv env) {
    NAPIValue result;
    NAPIDefineClass(env, Recycler::class_name, NAPI_AUTO_LENGTH, Recycler::class_constructor, nullptr, &result);

    NAPIValue global = JSUtils::createJsGlobal(env);
    napi_set_named_property(env, global, Recycler::class_name, result);
}
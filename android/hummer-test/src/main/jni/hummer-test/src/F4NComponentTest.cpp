//
// Created by didi on 2024/6/17.
//

#include "F4NComponentTest.h"
#include "falcon/F4NContextMulti.h"


void F4NComponentTest::test(string script) {


    jsiContext = new JsiContext();
    //创建引擎
    jsiContext->start();

    //全局挂载方法
    JsiObjectRef *global = jsiContext->getGlobalObject();
    global->registerFunction(1, "createObject", test2FuncWrapper, this);
    global->registerFunction(2, "invoke", test2FuncWrapper, this);
    global->release();


    jsiContext->evaluateJavaScript(script, "test.js", nullptr);

    jsiContext->stop();
    jsiContext->runGC();
}

JsiValue *F4NComponentTest::createObject(size_t size, JsiValue **params) {
    info("F4NComponentTest::createObject()");
    F4NComponent *f4NObject = new F4NComponent(0, jsiContext, nullptr);

    string tag = static_cast<JsiString *>(params[0])->value_;
    JsiValue *props = static_cast<JsiValue *>(params[1]);
    f4NObject->onCreate(tag, props);
    if (tag == "Test-2") {
//        f4NObject->protect();
    }


    JsiValueExt *valueExt = new JsiValueExt(f4NObject->getJsObject());
    return valueExt;
}

JsiValue *F4NComponentTest::invoke(size_t size, JsiValue **params) {
    info("F4NObjectTest::invoke()");
    return nullptr;
}


JsiValue *test2FuncWrapper(JsiObjectRef *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
    auto *bridge = static_cast<F4NComponentTest *>(data);
    if (methodId == 1) {
        return bridge->createObject(size, params);
    }
    if (methodId == 2) {
        return bridge->invoke(size, params);
    }
    return nullptr;
}

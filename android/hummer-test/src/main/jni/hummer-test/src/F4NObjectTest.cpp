//
// Created by didi on 2024/6/17.
//

#include "F4NObjectTest.h"
#include "falcon/F4NContextMulti.h"
#include "falcon/F4NConsole.h"
#include "TestConsoleHandler.h"






void F4NObjectTest::test(string script) {

    jsiContext = new JsiContext();
    //创建引擎
    jsiContext->start();

    ConsoleHandler* consoleHandler = new TestConsoleHandler();
    F4NConsole *f4NConsole = new F4NConsole(jsiContext,consoleHandler);
    f4NConsole->onCreate();

    //全局挂载方法
    JsiObjectRef *global = jsiContext->getGlobalObject();
    global->registerFunction(1, "createObject", test1FuncWrapper, this);
    global->registerFunction(2, "invoke", test1FuncWrapper, this);
    global->release();

    jsiContext->evaluateJavaScript(script, "test.js", nullptr);

    jsiContext->stop();
//    jsiContext->releaseRuntime();

    delete jsiContext;
    delete f4NConsole;
}

JsiValue *F4NObjectTest::createObject(size_t size, JsiValue **params) {
    info("F4NObjectTest::createObject()");
    F4NObject *f4NObject = new F4NObject(jsiContext);

    string tag = static_cast<JsiString *>(params[0])->value_;
    JsiValue *props = static_cast<JsiValue *>(params[1]);
    f4NObject->onCreate(tag, props);
    if (tag == "Test-2") {
//        f4NObject->protect();
    }


    JsiValueExt *valueExt = new JsiValueExt(f4NObject->getJsObject());

//    f4NObject->getJsObject()->release();

    return valueExt;
}

JsiValue *F4NObjectTest::invoke(size_t size, JsiValue **params) {
    info("F4NObjectTest::invoke()");
    return nullptr;
}


JsiValue *test1FuncWrapper(JsiObjectRef *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
    auto *bridge = static_cast<F4NObjectTest *>(data);
    if (methodId == 1) {
        return bridge->createObject(size, params);
    }
    if (methodId == 2) {
        return bridge->invoke(size, params);
    }
    return nullptr;
}

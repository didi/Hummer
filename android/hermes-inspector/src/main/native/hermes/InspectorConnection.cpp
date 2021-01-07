//
// Created by XiaoFeng on 2020/8/28.
//

#include <hermes/inspector/chrome/Registration.h>

#include "InspectorConnection.h"

using namespace facebook::jsi;
using namespace facebook::hermes;
using namespace facebook::hermes::inspector::chrome;

class HermesExecutorRuntimeAdapter
        : public facebook::hermes::inspector::RuntimeAdapter {
public:
    HermesExecutorRuntimeAdapter(
            std::shared_ptr<Runtime> runtime,
            HermesRuntime &hermesRuntime/*,
            std::shared_ptr<MessageQueueThread> thread*/)
            : runtime_(runtime),
              hermesRuntime_(hermesRuntime)/*,
              thread_(std::move(thread))*/ {}

    virtual ~HermesExecutorRuntimeAdapter() = default;

    Runtime &getRuntime() override {
        return *runtime_;
    }

    debugger::Debugger &getDebugger() override {
        return hermesRuntime_.getDebugger();
    }

    void tickleJs() override {
        // The queue will ensure that runtime_ is still valid when this
        // gets invoked.
//        thread_->runOnQueue([&runtime = runtime_]() {
//            auto func =
//                    runtime->global().getPropertyAsFunction(*runtime, "__tickleJs");
//            func.call(*runtime);
//        });
    }

private:
    std::shared_ptr<Runtime> runtime_;
    HermesRuntime &hermesRuntime_;

//    std::shared_ptr<MessageQueueThread> thread_;
};

void InspectorConnection::enableDebugging(std::shared_ptr<HermesRuntime> hermesRuntime, std::string pageTitle) {
    HermesRuntime &hermesRuntimeRef = *hermesRuntime;
    auto adapter = std::make_unique<HermesExecutorRuntimeAdapter>(hermesRuntime, hermesRuntimeRef);
    facebook::hermes::inspector::chrome::enableDebugging(std::move(adapter), "Hummer - " + pageTitle);
}

void InspectorConnection::disableDebugging(HermesRuntime& runtime) {
    facebook::hermes::inspector::chrome::disableDebugging(runtime);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_hermes_inspector_Inspector_enableDebugging(JNIEnv *env, jclass clazz, jlong runtimeId, jstring pageTitle) {
    const char* charTitle = env->GetStringUTFChars(pageTitle, nullptr);

    // 这里由于使用原始指针创建了一个独立的shared_ptr，原始的shared_ptr可能会先释放，等这个独立shared_ptr再次释放的时候，不做任何事情，所以这里传了一个空的删除器
    std::shared_ptr<HermesRuntime> runtime(reinterpret_cast<HermesRuntime*>(runtimeId), [](HermesRuntime* rt){});
    InspectorConnection::enableDebugging(runtime, std::string(charTitle));

    env->ReleaseStringUTFChars(pageTitle, charTitle);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_hermes_inspector_Inspector_disableDebugging(JNIEnv *env, jclass clazz, jlong runtimeId) {
    auto* runtime = reinterpret_cast<HermesRuntime*>(runtimeId);
    InspectorConnection::disableDebugging(*runtime);
}
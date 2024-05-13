/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include <jni.h>
#include <memory>
#include <js_native_api.h>
#include <js_native_api_debugger.h>
#include <js_native_api_debugger_hermes_types.h>
#include "JInspector.h"
#include "JNativeRunnable.h"
#include "JSUtils.h"

#ifdef WITH_INSPECTOR

namespace facebook {
namespace react {

namespace {

class RemoteConnection : public IRemoteConnection {
 public:
  RemoteConnection(jni::alias_ref<JRemoteConnection::javaobject> connection)
      : connection_(jni::make_global(connection)) {}

  virtual void onMessage(std::string message) override {
    connection_->onMessage(message);
  }

  virtual void onDisconnect() override {
    connection_->onDisconnect();
  }

 private:
  jni::global_ref<JRemoteConnection::javaobject> connection_;
};

} // namespace

jni::local_ref<JPage::javaobject>
JPage::create(int id, const std::string &title, const std::string &vm) {
  static auto constructor = javaClassStatic()
                                ->getConstructor<JPage::javaobject(
                                    jint,
                                    jni::local_ref<jni::JString>,
                                    jni::local_ref<jni::JString>)>();
  return javaClassStatic()->newObject(
      constructor, id, jni::make_jstring(title), jni::make_jstring(vm));
}

void JRemoteConnection::onMessage(const std::string &message) const {
  static auto method =
      javaClassStatic()->getMethod<void(jni::local_ref<jstring>)>("onMessage");
  method(self(), jni::make_jstring(message));
}

void JRemoteConnection::onDisconnect() const {
  static auto method = javaClassStatic()->getMethod<void()>("onDisconnect");
  method(self());
}

JLocalConnection::JLocalConnection(std::unique_ptr<ILocalConnection> connection)
    : connection_(std::move(connection)) {}

void JLocalConnection::sendMessage(std::string message) {
  if (connection_ == nullptr) return;
  connection_->sendMessage(std::move(message));
}

void JLocalConnection::disconnect() {
  if (connection_ == nullptr) return;
  connection_->disconnect();
}

void JLocalConnection::registerNatives() {
  javaClassStatic()->registerNatives({
      makeNativeMethod("sendMessage", JLocalConnection::sendMessage),
      makeNativeMethod("disconnect", JLocalConnection::disconnect),
  });
}

void JInspector::enableDebugging(jni::alias_ref<jclass>, jlong ctx_ptr, const std::string &page_title, jni::alias_ref<JavaMessageQueueThread::javaobject> jsQueue, bool waitForDebugger) {
  auto globalEnv = JSUtils::toJsContext(ctx_ptr);
  auto pageTitle = page_title.c_str();

  struct OpaqueMessageQueueThreadWrapper {
      std::shared_ptr<facebook::react::MessageQueueThread> thread_;
  } s;
  s.thread_ = std::make_shared<facebook::react::JMessageQueueThread>(jsQueue);
  NAPISetMessageQueueThread(globalEnv, (MessageQueueThreadWrapper) &s);

  NAPIEnableDebugger(globalEnv, pageTitle, waitForDebugger);
}

void JInspector::disableDebugging(jni::alias_ref<jclass>, jlong ctx_ptr) {
  auto globalEnv = JSUtils::toJsContext(ctx_ptr);
  NAPIDisableDebugger(globalEnv);
}

jni::global_ref<JInspector::javaobject> JInspector::instance(
    jni::alias_ref<jclass>) {
  static auto instance =
      jni::make_global(newObjectCxxArgs(&getInspectorInstance()));
  return instance;
}

jni::local_ref<jni::JArrayClass<JPage::javaobject>> JInspector::getPages() {
  std::vector<InspectorPage> pages = inspector_->getPages();
  auto array = jni::JArrayClass<JPage::javaobject>::newArray(pages.size());
  for (size_t i = 0; i < pages.size(); i++) {
    (*array)[i] = JPage::create(pages[i].id, pages[i].title, pages[i].vm);
  }
  return array;
}

jni::local_ref<JLocalConnection::javaobject> JInspector::connect(
    int pageId,
    jni::alias_ref<JRemoteConnection::javaobject> remote) {
  auto localConnection = inspector_->connect(
      pageId, std::make_unique<RemoteConnection>(std::move(remote)));
  return JLocalConnection::newObjectCxxArgs(std::move(localConnection));
}

void JInspector::registerNatives() {
  JLocalConnection::registerNatives();
  javaClassStatic()->registerNatives({
      makeNativeMethod("enableDebugging", JInspector::enableDebugging),
      makeNativeMethod("disableDebugging", JInspector::disableDebugging),
      makeNativeMethod("instance", JInspector::instance),
      makeNativeMethod("getPagesNative", JInspector::getPages),
      makeNativeMethod("connectNative", JInspector::connect),
  });
  JNativeRunnable::registerNatives();
}

} // namespace react
} // namespace facebook

#endif

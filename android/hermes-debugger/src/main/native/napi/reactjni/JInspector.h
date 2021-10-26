/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#pragma once

#ifdef WITH_INSPECTOR

#include <jsinspector/InspectorInterfaces.h>
#include <JMessageQueueThread.h>

#include <fbjni/fbjni.h>

#include <memory>

namespace facebook {
namespace react {

class JPage : public jni::JavaClass<JPage> {
 public:
  static constexpr auto kJavaDescriptor =
      "Lcom/didi/hummer/hermes/inspector/Inspector$Page;";

  static jni::local_ref<JPage::javaobject>
  create(int id, const std::string &title, const std::string &vm);
};

class JRemoteConnection : public jni::JavaClass<JRemoteConnection> {
 public:
  static constexpr auto kJavaDescriptor =
      "Lcom/didi/hummer/hermes/inspector/Inspector$RemoteConnection;";

  void onMessage(const std::string &message) const;
  void onDisconnect() const;
};

class JLocalConnection : public jni::HybridClass<JLocalConnection> {
 public:
  static constexpr auto kJavaDescriptor =
      "Lcom/didi/hummer/hermes/inspector/Inspector$LocalConnection;";

  JLocalConnection(std::unique_ptr<ILocalConnection> connection);

  void sendMessage(std::string message);
  void disconnect();

  static void registerNatives();

 private:
  std::unique_ptr<ILocalConnection> connection_;
};

class JInspector : public jni::HybridClass<JInspector> {
 public:
  static constexpr auto kJavaDescriptor =
      "Lcom/didi/hummer/hermes/inspector/Inspector;";

  static void enableDebugging(jni::alias_ref<jclass>, jlong ctx_ptr, const std::string &page_title, jni::alias_ref<JavaMessageQueueThread::javaobject> jsQueue, bool waitForDebugger);
  static void disableDebugging(jni::alias_ref<jclass>, jlong ctx_ptr);

  static jni::global_ref<JInspector::javaobject> instance(
      jni::alias_ref<jclass>);

  jni::local_ref<jni::JArrayClass<JPage::javaobject>> getPages();
  jni::local_ref<JLocalConnection::javaobject> connect(
      int pageId,
      jni::alias_ref<JRemoteConnection::javaobject> remote);

  static void registerNatives();

 private:
  friend HybridBase;

  JInspector(IInspector *inspector) : inspector_(inspector) {}

  IInspector *inspector_;
};

} // namespace react
} // namespace facebook

#endif

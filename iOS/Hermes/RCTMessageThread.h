/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


#import <Foundation/Foundation.h>

#include <condition_variable>
#include <functional>
#include <mutex>
#import <napi/MessageQueueThread.h>

typedef void (^RCTJavaScriptCompleteBlock)(NSError *error);

namespace facebook {
namespace react {

class RCTMessageThread : public MessageQueueThread {
 public:
  RCTMessageThread(NSRunLoop *runLoop, RCTJavaScriptCompleteBlock errorBlock);
  ~RCTMessageThread() override;
  void runOnQueue(std::function<void()> &&) override;
  void runOnQueueSync(std::function<void()> &&) override;
  void quitSynchronous() override;
  void setRunLoop(NSRunLoop *runLoop);

 private:
  void tryFunc(const std::function<void()> &func);
  void runAsync(std::function<void()> func);
  void runSync(std::function<void()> func);

  CFRunLoopRef m_cfRunLoop;
  RCTJavaScriptCompleteBlock m_errorBlock;
  std::atomic_bool m_shutdown;
};

} // namespace react
} // namespace facebook

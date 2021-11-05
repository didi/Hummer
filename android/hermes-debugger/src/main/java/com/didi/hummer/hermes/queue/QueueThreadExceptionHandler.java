/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.didi.hummer.hermes.queue;

/**
 * Interface for a class that knows how to handle an Exception thrown while executing a Runnable
 * submitted via {@link MessageQueueThread#runOnQueue}.
 */
public interface QueueThreadExceptionHandler {

  void handleException(Exception e);
}

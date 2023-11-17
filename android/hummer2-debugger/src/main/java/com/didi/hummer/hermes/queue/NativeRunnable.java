/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.didi.hummer.hermes.queue;

import com.facebook.jni.HybridData;
import com.facebook.jni.annotations.DoNotStrip;

/** A Runnable that has a native run implementation. */
@DoNotStrip
public class NativeRunnable implements Runnable {

  private final HybridData mHybridData;

  @DoNotStrip
  private NativeRunnable(HybridData hybridData) {
    mHybridData = hybridData;
  }

  public native void run();
}

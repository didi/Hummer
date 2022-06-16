//
//  HMThreadManager.m
//  Hummer
//
//  Created by didi on 2022/6/8.
//

#import "HMThreadManager.h"

@implementation HMThreadManager


+ (dispatch_queue_t)getJSQueue {
    static dispatch_queue_t js_queue;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        js_queue = dispatch_queue_create("com.hummer.js.queue", DISPATCH_QUEUE_SERIAL);
    });
    return js_queue;
}
static CFRunLoopRef __jsThread;
static NSMutableArray *__task;


+ (void)setupJSThread:(dispatch_block_t)task {
    dispatch_async([self getJSQueue], ^{
       
        __jsThread = [NSRunLoop currentRunLoop].getCFRunLoop;
        // Set up a dummy runloop source to avoid spinning
        CFRunLoopSourceContext noSpinCtx = {0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL};
        CFRunLoopSourceRef noSpinSource = CFRunLoopSourceCreate(NULL, 0, &noSpinCtx);
        CFRunLoopAddSource(CFRunLoopGetCurrent(), noSpinSource, kCFRunLoopDefaultMode);
        CFRelease(noSpinSource);
        task();
        CFRunLoopRun();
    });
}
+ (void)runOnJSThread:(dispatch_block_t)task {
    CFRunLoopPerformBlock(__jsThread, kCFRunLoopCommonModes, ^{
      // Create an autorelease pool each run loop to prevent memory footprint from growing too large, which can lead to
      // performance problems.
      @autoreleasepool {
          task();
      }
    });
    CFRunLoopWakeUp(__jsThread);
}
@end

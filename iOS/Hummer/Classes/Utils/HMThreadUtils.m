//
//  HMThreadUtils.m
//  Hummer
//
//  Created by GY on 2024/10/29.
//

#import "HMThreadUtils.h"
#import "HMAssertDefine.h"

void HMAssertMainQueue(void) {
    HMAssert(NSThread.isMainThread, @"This function must be called on the main queue");
}

void HMSafeMainThread(dispatch_block_t block) {
    if (!block) {
        return;
    }
    if (NSThread.isMainThread) {
        block();
    } else {
        dispatch_async(dispatch_get_main_queue(), block);
    }
}

void HMSafeMainThreadNextTick(dispatch_block_t block) {
    if (!block) {
        return;
    }
    dispatch_async(dispatch_get_main_queue(), block);
}

@implementation HMThreadUtils

@end

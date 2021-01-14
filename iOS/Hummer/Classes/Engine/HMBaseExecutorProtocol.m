//
//  HMBaseExecutorProtocol.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import "HMBaseExecutorProtocol.h"
#import "HMUtility.h"

NSArray<HMBaseValue *> *_Nullable HMOtherArguments = nil;

id <HMBaseExecutorProtocol> _Nullable HMCurrentExecutor = nil;

NSMapTable<NSValue *, id <HMBaseExecutorProtocol>> *HMExecutorMap = nil;

void HMAssertMainQueue(void) {
    HMAssert(NSThread.isMainThread, @"This function must be called on the main queue");
}

void HMSafeMainThread(dispatch_block_t block) {
    if (NSThread.isMainThread) {
        block ? block() : nil;
    } else {
        dispatch_async(dispatch_get_main_queue(), block);
    }
}

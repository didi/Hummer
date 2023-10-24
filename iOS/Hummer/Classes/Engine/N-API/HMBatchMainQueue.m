//
//  HMBatchMainQueue.m
//  Hummer
//
//  Created by didi on 2023/4/6.
//

#import "HMBatchMainQueue.h"

@interface HMBatchMainQueue()

@end
static BOOL __HMBatchMainQueue_inQueue;
static NSMutableArray<dispatch_block_t> *__HMBatchMainQueue_blocks;
@implementation HMBatchMainQueue

+ (void)initialize {
    __HMBatchMainQueue_inQueue = NO;
    __HMBatchMainQueue_blocks = [NSMutableArray new];
}
+ (void)run:(dispatch_block_t)block {
    
    [__HMBatchMainQueue_blocks addObject:block];
    if(__HMBatchMainQueue_inQueue){
        return;
    }
    __HMBatchMainQueue_inQueue = YES;
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [__HMBatchMainQueue_blocks enumerateObjectsUsingBlock:^(dispatch_block_t  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            obj();
        }];
        [__HMBatchMainQueue_blocks removeAllObjects];
        __HMBatchMainQueue_inQueue = NO;
    });
}
@end

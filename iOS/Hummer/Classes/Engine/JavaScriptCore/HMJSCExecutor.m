//
//  HMJSCExecutor.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import "HMJSCExecutor+Private.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCExecutor ()

@property (nonatomic, assign) JSGlobalContextRef contextRef;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSCExecutor

- (instancetype)init {
    HMAssertMainQueue();
    self = [super init];
    if (!HMExecutorMap) {
        HMExecutorMap = NSMapTable.strongToWeakObjectsMapTable;
    }

    return self;
}


@end

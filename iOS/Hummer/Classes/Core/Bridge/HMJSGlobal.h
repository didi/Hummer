//
//  HMJSGlobal.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSContext.h"
#import <Hummer/HMNotifyCenter.h>
#import <Hummer/HMJSCExecutor.h>

NS_ASSUME_NONNULL_BEGIN
@interface HMJSGlobal : NSObject

@property (nonatomic, copy, nullable) NSDictionary<NSString *, NSObject *> *pageInfo;

@property (nonatomic, copy, nullable) HMFunctionType setTitle;

+ (instancetype)globalObject;

- (nullable HMJSContext *)currentContext:(id <HMBaseExecutorProtocol>)context;

- (void)weakReference:(HMJSContext *)context;

- (void)addGlobalEnviroment:(NSDictionary<NSString *, NSObject *> *)params;

- (NSDictionary<NSString *, NSObject *> *)getEnvironmentInfo;

@end

NS_ASSUME_NONNULL_END

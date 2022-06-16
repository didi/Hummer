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

@property (nonatomic, copy, nullable) NSDictionary<NSString *, NSObject *> *pageInfo DEPRECATED_MSG_ATTRIBUTE("HMJSGlobal 为单例，pageInfo 为单页面状态，因此请使用 HMJSContext.pageInfo 代替");
;

@property (nonatomic, copy, nullable) HMFunctionType setTitle;

+ (instancetype)globalObject;

- (nullable HMJSContext *)currentContext:(id <HMBaseExecutorProtocol>)context;

- (void)weakReference:(HMJSContext *)context;

- (void)addGlobalEnviroment:(NSDictionary<NSString *, NSObject *> *)params;

- (NSDictionary<NSString *, NSObject *> *)getEnvironmentInfo;

- (NSDictionary<NSString *, NSObject *> *)pageInfo;
@end

NS_ASSUME_NONNULL_END

//
//  NSObject+Hummer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSObject.h"
#import "HMExportManager.h"

@protocol HMBaseExecutorProtocol;
@class HMBaseValue;
@protocol HMBaseWeakValueProtocol;

NS_ASSUME_NONNULL_BEGIN

@interface NSObject (Hummer) <HMJSObject>

/// @brief JavaScript value 强引用，未来将会变为 readonly，引擎层应当使用 -hm_setWeakValue: 设置
@property (nullable) HMBaseValue *hmValue;

@property (nullable, readonly) id <HMBaseExecutorProtocol> hmContext;

/// @brief 新版 N-API 引擎使用该接口设置弱引用
- (void)hm_setWeakValue:(nullable id <HMBaseWeakValueProtocol>)weakValue;

@end

NS_ASSUME_NONNULL_END

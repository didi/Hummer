//
//  NSObject+Hummer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSObject.h"
#import "HMExportManager.h"

@protocol HMBaseExecutorProtocol;

NS_ASSUME_NONNULL_BEGIN

@interface NSObject (Hummer) <HMJSObject>

/**
 * 原生导出对象或者闭包才有，这个 property 限制了原生对象和闭包只能在一个 JSContext 中
 */
@property (nonatomic, strong, nullable) HMBaseValue *hmValue;

@property (nonatomic, weak, nullable) id <HMBaseExecutorProtocol> hmContext;

@end

NS_ASSUME_NONNULL_END
